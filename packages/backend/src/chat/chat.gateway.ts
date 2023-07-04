import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway({ cors: true, namespace: 'chatsocket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log("New client connected to chatSocket");
  }

  handleDisconnect() {
		console.log('Client disconnected from chatSocket');
	}

  @SubscribeMessage("test")
  handleTest(client: Socket, data: any) {
    console.log("Sending from: " + client.id + " to: " + data.target);
  }
}
