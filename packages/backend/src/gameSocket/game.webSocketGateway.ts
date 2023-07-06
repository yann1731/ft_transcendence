import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true, namespace: 'game'})
export class gameSocket implements OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server: Server

	numberOfGame: number = 1;
	x: number;
	y: number;

	oneHost: [string, boolean, boolean, boolean, boolean][] = []
	oneWaiting: Socket[] = []
	twoHost: [Socket, string, boolean, boolean, boolean, boolean][] = []
	twoWaiting: Socket[] = []
	threeHost: [Socket, string, boolean, number][] = []
	threeWaiting: Socket[] = []

	XVelocityMin1: number = 350;
    XVelocityMax1: number = 400;
    XVelocityMin2: number = -350;
    XVelocityMax2: number = -400;
    YvelocityMin: number = 125;
    YvelocityMax: number = 225;

	handleConnection() {
		console.log('New client connected to gameSocket');
	}
	 
	handleDisconnect() {
		console.log('Client disconnected from gameSocket');
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
				this.server.in(data.name).emit("start", {ballX: this.x, ballY: this.y, wall: data.wall, random: data.random, power: data.power, face: data.face});
			}
			else {
				this.oneHost.push([data.name, data.wall, data.random, data.power, data.face])
			}
		}
		else{
			if (this.oneHost.length >= 1){
				let host: [string, boolean, boolean, boolean, boolean] = this.oneHost.shift();
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
				this.server.in(host[1]).emit("start", {ballX: this.x, ballY: this.y, power: host[2], scale: host[3]});
			}
			else
				this.threeWaiting.push(client);
		}
	}
}