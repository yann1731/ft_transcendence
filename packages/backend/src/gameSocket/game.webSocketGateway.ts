import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true, namespace: 'game'})
export class gameSocket implements OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server: Server;

	numberOfGame: number = 1;
	x: number;
	y: number;

	oneHost!: [Socket, string, boolean, boolean, boolean, boolean][]
	oneWaiting!: Socket[];
	twoHost!: [Socket, string, boolean, boolean, boolean, boolean][]
	twoWaiting!: Socket[];
	threeHost!: [Socket, string, boolean, boolean, boolean, boolean][]
	threeWaiting!: Socket[];

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
	handlePoint(client: Socket){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("point");
	}

	@SubscribeMessage("collision")
	handleCollision(client: Socket, data: any){
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("collision", {ballX: data.ballX, ballY: data.ballY, x: data.x, y: data.y});
	}

	@SubscribeMessage("1v1")
	async handle1v1(client: Socket, data: any){
		if (data.start){
			client.join(data.name);
			const room = Array.from(client.rooms).filter(room => room !== client.id)
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
				this.server.in(room[0]).emit("start", {ballX: this.x, ballY: this.y});
			}
			else {
				this.oneHost.push([client, data.name, data.wall, data.random, data.power, data.face])
			}
		}
		else{
			if (this.oneHost.length >= 1){
				
			}
			else
				this.oneWaiting.push(client);
		}
	}
}