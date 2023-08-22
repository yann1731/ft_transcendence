import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { PrismaClient } from "@prisma/client";
import { Server, Socket } from "socket.io";

const prisma = new PrismaClient();

@WebSocketGateway({ cors: true, namespace: 'game'})
export class gameSocket implements OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server: Server

	numberOfGame: number = 1;
	x: number;
	y: number;

	oneHost: [string, boolean, boolean, boolean, boolean, Socket][] = []
	oneWaiting: Socket[] = []
	twoHost: [Socket, string, boolean, boolean, boolean, boolean][] = []
	twoWaiting: Socket[] = []
	threeHost: [Socket, string, boolean, number][] = []
	threeWaiting: Socket[] = []

	users: Map<string, string> = new Map<string, string>();

	oneGame: [string, string, string][] = []
	twoGame: [string, string, string, string, string][] = []
	threeGame: [string, string, string, string, string][] = []

	XVelocityMin1: number = 350;
    XVelocityMax1: number = 400;
    XVelocityMin2: number = -350;
    XVelocityMax2: number = -400;
    YvelocityMin: number = 125;
    YvelocityMax: number = 225;

	handleConnection(client: Socket) {
		console.log('New client connected to gameSocket');
		this.server.to(client.id).emit("connected");
	}
	 
	handleDisconnect(client: Socket) {
		console.log('Client disconnected from gameSocket');

		for (let i = 0; i < this.oneHost.length; i++)
			if (this.oneHost[i][5] === client)
				this.oneHost.splice(i, 1);
		for (let i = 0; i < this.twoHost.length; i++)
			if (this.twoHost[i][0] === client)
				this.twoHost.splice(i, 1);
		for (let i = 0; i < this.threeHost.length; i++)
			if (this.threeHost[i][0] === client)
				this.threeHost.splice(i, 1);


		for (let i = 0; i < this.oneWaiting.length; i++)
			if (this.oneWaiting[i] === client)
				this.oneWaiting.splice(i, 1);
		for (let i = 0; i < this.twoWaiting.length; i++)
			if (this.twoWaiting[i] === client)
				this.twoWaiting.splice(i, 1);
		for (let i = 0; i < this.threeWaiting.length; i++)
			if (this.threeWaiting[i] === client)
				this.threeWaiting.splice(i, 1);

		for (let i = 0; i < this.oneGame.length; i++)
			for (let j = 1; j < 3; j++)
				if (this.oneGame[i][j] === client.id){
					this.server.to(this.oneGame[i][0]).emit("disconnected")
					this.oneGame.splice(i, 1);
					break;
				}
		for (let i = 0; i < this.twoGame.length; i++)
			for (let j = 1; j < 5; j++)
				if (this.twoGame[i][j] === client.id){
					this.server.to(this.twoGame[i][0]).emit("disconnected")
					this.twoGame.splice(i, 1);
					break;
				}
		for (let i = 0; i < this.threeGame.length; i++)
			for (let j = 1; j < 5; j++)
				if (this.threeGame[i][j] === client.id){
					this.server.to(this.threeGame[i][0]).emit("disconnected")
					this.threeGame.splice(i, 1);
					break;
				}
		
		this.users.delete(client.id);
	}

	@SubscribeMessage("disconnected")
	handledDisconnected(client: Socket){
		
	}

	@SubscribeMessage("connected")
	handledConnected(client: Socket, data: any){
		this.users.set(client.id, data.name);
	}

	@SubscribeMessage("movement")
	handleMovement(client: Socket, newpos: number) {
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("movement", newpos);
	}

	@SubscribeMessage("movement2")
	handleMovement2(client: Socket, data: any) {
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("movement2", data);
	}

	@SubscribeMessage("point")
	handlePoint(client: Socket, which: number){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("point", which);
	}

	@SubscribeMessage("end")
	async handleEnd(client: Socket, data: any){
		if (data.which === 1){
			for (let i = 0; i < this.oneGame.length; i++)
				if (this.oneGame[i][0] === data.name){
					try {
						console.log(this.users.get(this.oneGame[i][1]), data.name, this.oneGame[i][1])
							await prisma.user.update({
							where: {id: this.users.get(this.oneGame[i][1])},
							data: {
								win: {
									increment: data.player ? 0 : 1,
								},
								loss: {
									increment: data.player ? 1 : 0,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data:", error);
					}
					try {
							await prisma.user.update({
							where: {id: this.users.get(this.oneGame[i][2])},
							data: {
								win: {
									increment: data.player ? 1 : 0,
								},
								loss: {
									increment: data.player ? 0 : 1,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data:", error);
					}

					
					try {
						await prisma.matchHistoryOne.create({
							data: {
								winnerId: data.player ? this.users.get((this.oneGame[i][2])) : this.users.get((this.oneGame[i][1])),
								loserId: data.player ? this.users.get((this.oneGame[i][1])) : this.users.get((this.oneGame[i][2])),
								winnerScore: (data.score1 > data.score2) ? data.score1 : data.score2,
								loserScore: (data.score1 > data.score2) ? data.score2 : data.score1
							}
						})
					}
					catch(error){
						console.log("Match history failed to create:", error)
					}
					this.oneGame.splice(i, 1);
					break;
				}
		}
		if (data.which === 2){
			for (let i = 0; i < this.twoGame.length; i++)
				if (this.twoGame[i][0] === data.name){
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.twoGame[i][1])},
							data: {
								win: {
									increment: data.player ? 0 : 1,
								},
								loss: {
									increment: data.player ? 1 : 0,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.twoGame[i][2])},
							data: {
								win: {
									increment: data.player ? 1 : 0,
								},
								loss: {
									increment: data.player ? 0 : 1,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.twoGame[i][3])},
							data: {
								win: {
									increment: data.player ? 0 : 1,
								},
								loss: {
									increment: data.player ? 1 : 0,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.twoGame[i][4])},
							data: {
								win: {
									increment: data.player ? 1 : 0,
								},
								loss: {
									increment: data.player ? 0 : 1,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}

					try {
						await prisma.matchHistoryTwo.create({
							data: {
								winnerOneId: data.player ? this.users.get((this.twoGame[i][2])) : this.users.get((this.twoGame[i][1])),
								winnerTwoId: data.player ? this.users.get((this.twoGame[i][4])) : this.users.get((this.twoGame[i][3])),
								loserOneId: data.player ? this.users.get((this.twoGame[i][1])) : this.users.get((this.twoGame[i][2])),
								loserTwoId: data.player ? this.users.get((this.twoGame[i][3])) : this.users.get((this.twoGame[i][4])),
								winnerScore: (data.score1 > data.score2) ? data.score1 : data.score2,
								loserScore: (data.score1 > data.score2) ? data.score2 : data.score1
							}
						})
					}
					catch(error){
						console.log("Match history failed to create:", error)
					}

					this.twoGame.splice(i, 1);
					break;
				}
		}	
		if (data.which === 3){
			for (let i = 0; i < this.threeGame.length; i++)
				if (this.threeGame[i][0] === data.name){
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.threeGame[i][1])},
							data: {
								win: {
									increment: data.player ? 0 : 1,
								},
								loss: {
									increment: data.player ? 1 : 0,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.threeGame[i][2])},
							data: {
								win: {
									increment: data.player ? 1 : 0,
								},
								loss: {
									increment: data.player ? 0 : 1,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.threeGame[i][3])},
							data: {
								win: {
									increment: data.player ? 1 : 0,
								},
								loss: {
									increment: data.player ? 0 : 1,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}
					try {
							await prisma.user.update({
							where: {username: this.users.get(this.threeGame[i][4])},
							data: {
								win: {
									increment: data.player ? 1 : 0,
								},
								loss: {
									increment: data.player ? 0 : 1,
								},
								gamesPlayed: {
									increment: 1,
								}
							},
						})
					}
					catch (error){
						console.error("Error updating user data");
					}

					try {
						await prisma.matchHistoryThree.create({
							data: {
								winnerId: data.player ? [this.users.get((this.threeGame[i][2])), this.users.get((this.threeGame[i][3])), this.users.get((this.threeGame[i][4]))] : this.users.get((this.threeGame[i][1])),
								loserId: data.player ? this.users.get((this.threeGame[i][1])) : [this.users.get((this.threeGame[i][2])), this.users.get((this.threeGame[i][3])), this.users.get((this.threeGame[i][4]))],
								winnerScore: (data.score1 > data.score2) ? data.score1 : data.score2,
								loserScore: (data.score1 > data.score2) ? data.score2 : data.score1
							}
						})
					}
					catch(error){
						console.log("Match history failed to create:", error)
					}

					this.threeGame.splice(i, 1);
					break;
				}
		}
		this.server.emit("refresh");
	}

	@SubscribeMessage("update")
	handleUpdate(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("update", data);
	}
	
	@SubscribeMessage("multi")
	handleMulti(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("multi", data);
	}

	@SubscribeMessage("newPower")
	HandleNewPower(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(room[0]).emit("newPower", data);
	}

	@SubscribeMessage("random")
	handleRandom(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(room[0]).emit("random", data);
	}

	@SubscribeMessage("power")
	handlePower(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(room[0]).emit("power", data);
	}

	@SubscribeMessage("1v1")
	handle1v1(client: Socket, data: any){
		if (data.start){
			client.join(data.name);
			if (this.oneWaiting.length >= 1){
				let opponent : Socket = this.oneWaiting.shift()
				opponent.join(data.name);
				if (Math.floor(Math.random() * 2) === 0){
					this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;            
				} else{
					this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;
				}
				this.oneGame.push([data.name, client.id, opponent.id]);
				this.server.in(data.name).emit("start", {ballX: this.x, ballY: this.y, wall: data.wall, random: data.random, power: data.power, face: data.face});
			}
			else {
				this.oneHost.push([data.name, data.wall, data.random, data.power, data.face, client])
			}
		}
		else{
			if (this.oneHost.length >= 1){
				let host: [string, boolean, boolean, boolean, boolean, Socket] = this.oneHost.shift();
				client.join(host[0]);
				if (Math.floor(Math.random() * 2) === 0){
					this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
					this.y *= -1;            
				} else{
					this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
					this.y *= -1;
				}
				this.oneGame.push([host[0], host[5].id, client.id]);
				this.server.in(host[0]).emit("start", {ballX: this.x, ballY: this.y, wall: host[1], random: host[2], power: host[3], face: host[4]});
			}
			else
				this.oneWaiting.push(client);
		}
	}

	@SubscribeMessage("2v2")
	handle2v2(client: Socket, data: any){
		if (data.start){
			client.join(data.name);
			if (this.twoWaiting.length >= 3){
				let opponent1 : Socket = this.twoWaiting.shift()
				let opponent2 : Socket = this.twoWaiting.shift()
				let opponent3 : Socket = this.twoWaiting.shift()
				opponent1.join(data.name);
				opponent2.join(data.name);
				opponent3.join(data.name);
				if (Math.floor(Math.random() * 2) === 0){
					this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;            
				} else{
					this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;
				}
				this.server.to(client.id).emit("player", 1)
				this.server.to(opponent1.id).emit("player", 2)
				this.server.to(opponent2.id).emit("player", 3)
				this.server.to(opponent3.id).emit("player", 4)
				this.twoGame.push([data.name, client.id, opponent1.id, opponent2.id, opponent3.id]);
				this.server.in(data.name).emit("start", {ballX: this.x, ballY: this.y, wall: data.wall, random: data.random, power: data.power, face: data.face});
			}
			else {
				this.twoHost.push([client, data.name, data.wall, data.random, data.power, data.face])
			}
		}
		else{
			if (this.twoHost.length >= 1 && this.twoWaiting.length >= 2){
				let host: [Socket, string, boolean, boolean, boolean, boolean] = this.twoHost.shift();
				let opponent1 : Socket = this.twoWaiting.shift()
				let opponent2 : Socket = this.twoWaiting.shift()
				opponent1.join(host[1]);
				opponent2.join(host[1]);
				client.join(host[1]);
				if (Math.floor(Math.random() * 2) === 0){
					this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;            
				} else{
					this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;
				}
				this.server.to(host[0].id).emit("player", 1)
				this.server.to(client.id).emit("player", 2)
				this.server.to(opponent1.id).emit("player", 3)
				this.server.to(opponent2.id).emit("player", 4)
				this.twoGame.push([host[1], host[0].id, client.id, opponent1.id, opponent2.id]);
				this.server.in(host[1]).emit("start", {ballX: this.x, ballY: this.y, wall: host[2], random: host[3], power: host[4], face: host[5]});
			}
			else
				this.twoWaiting.push(client);
		}
	}

	@SubscribeMessage("3v1")
	handle3v1(client: Socket, data: any){
		if (data.start){
			client.join(data.name);
			if (this.threeWaiting.length >= 3){
				let opponent1 : Socket = this.threeWaiting.shift()
				let opponent2 : Socket = this.threeWaiting.shift()
				let opponent3 : Socket = this.threeWaiting.shift()
				opponent1.join(data.name);
				opponent2.join(data.name);
				opponent3.join(data.name);
				if (Math.floor(Math.random() * 2) === 0){
					this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;            
				} else{
					this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;
				}
				this.server.to(client.id).emit("player", 1)
				this.server.to(opponent1.id).emit("player", 2)
				this.server.to(opponent2.id).emit("player", 3)
				this.server.to(opponent3.id).emit("player", 4)
				this.twoGame.push([data.name, client.id, opponent1.id, opponent2.id, opponent3.id]);
				this.server.in(data.name).emit("start", {ballX: this.x, ballY: this.y, power: data.power, scale: data.scale});
			}
			else {
				this.threeHost.push([client, data.name, data.power, data.scale])
			}
		}
		else{
			if (this.threeHost.length >= 1 && this.threeWaiting.length >= 2){
				let host: [Socket, string, boolean, number] = this.threeHost.shift();
				let opponent1 : Socket = this.threeWaiting.shift()
				let opponent2 : Socket = this.threeWaiting.shift()
				opponent1.join(host[1]);
				opponent2.join(host[1]);
				client.join(host[1]);
				if (Math.floor(Math.random() * 2) === 0){
					this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;            
				} else{
					this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
					this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.y *= -1;
				}
				this.server.to(host[0].id).emit("player", 1)
				this.server.to(client.id).emit("player", 2)
				this.server.to(opponent1.id).emit("player", 3)
				this.server.to(opponent2.id).emit("player", 4)
				this.twoGame.push([host[1], host[0].id, client.id, opponent1.id, opponent2.id]);
				this.server.in(host[1]).emit("start", {ballX: this.x, ballY: this.y, power: host[2], scale: host[3]});
			}
			else
				this.threeWaiting.push(client);
		}
	}
}