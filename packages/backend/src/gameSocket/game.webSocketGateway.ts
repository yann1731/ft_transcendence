import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true, namespace: 'game'})
export class gameSocket implements OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server: Server;
	numberOfGame: number = 1;


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

	@SubscribeMessage("1v1")
	handle1v1(client: Socket){
		client.join(String(this.numberOfGame));
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		console.log(room[0]);
		if (this.server.sockets.adapter){
			if (this.server.sockets.adapter.rooms){
			if (this.server.sockets.adapter.rooms.has(room[0])){
    			const numberOfUser = this.server.sockets.adapter.rooms[room[0]].length;
				console.log(numberOfUser)
			}
			else{
				console.log("fuck3");
			}
		}
		else{
			console.log("fuck2");
		}
	}
		else{
			console.log("fuck");
		}
	}
}