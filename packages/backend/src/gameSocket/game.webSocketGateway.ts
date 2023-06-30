import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { SocketConnectOpts } from "net";
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
	twoHost: [string, boolean, boolean, boolean, boolean][] = []
	twoWaiting: Socket[] = []
	threeHost: [string, boolean, boolean, boolean, boolean][] = []
	threeWaiting: Socket[] = []

	XVelocityMin1: number = 350;
    XVelocityMax1: number = 400;
    XVelocityMin2: number = -350;
    XVelocityMax2: number = -400;
    YvelocityMin: number = 125;
    YvelocityMax: number = 225;

	handleConnection() {
		console.log('New client connected');
	}
	 
	handleDisconnect() {
		console.log('Client disconnected');
	}

	@SubscribeMessage("movement")
	handleMovement(client: Socket, newpos: number) {
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("movement", newpos);
	}

	@SubscribeMessage("point")
	handlePoint(client: Socket, which: number){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("point", which);
	}

	@SubscribeMessage("update")
	handleUpdate(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("update", {x: data.x, y: data.y});
	}
	
	@SubscribeMessage("multi")
	handleMulti(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("multi", data);
	}

	@SubscribeMessage("newPower")
	HandleNewPower(client: Socket, data: any){
		console.log("fuck");
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
	async handle1v1(client: Socket, data: any){
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
			console.log(this.oneHost.length);
			console.log(this.oneHost);
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
}