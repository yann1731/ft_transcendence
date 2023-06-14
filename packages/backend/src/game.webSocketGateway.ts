import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ cors: true })
export class gameSocket implements OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server: Server;


	handleConnection() {
		console.log('New client connected');
	  }
	
	  handleDisconnect() {
		console.log('Client disconnected');
	  }

	@SubscribeMessage("allo")
	handleallo(){
		console.log("test")
	}
}