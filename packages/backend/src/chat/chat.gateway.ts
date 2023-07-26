import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { CreateChatroomDto } from 'src/chatroom/dto/create-chatroom.dto';
import { UpdateChatroomDto } from 'src/chatroom/dto/update-chatroom.dto';

@WebSocketGateway({ cors: true, namespace: 'chatsocket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService, private chatroomService: ChatroomService) {};
  @WebSocketServer()
  server: Server;

  handleConnection() {
    // console.log("New client connected to chatSocket");
  }

  handleDisconnect() {
		// console.log('Client disconnected from chatSocket');
	}

  @SubscribeMessage("test")
  handleTest(): void {
    // console.log("Routing Successful!");
  }

  @SubscribeMessage("chatroom")
  createChatroomMessage(@MessageBody() message: any): void {
    const result = this.chatService.createChatroomMessage(message);
    if (result) {
      this.server.emit("chatroom", result);
    }
  }

  @SubscribeMessage("privateMessage")
  createPrivateMessage(message: any): void {
    this.chatService.createPrivateMessage(message);
  }

  @SubscribeMessage("create chatroom")
  createChatroom(client: Socket, data: any): void {
    const chatroom = this.chatroomService.create(data);
    client.broadcast.emit("create chatroom", chatroom);
    if (chatroom)
      this.server.to(client.id).emit("creation success", chatroom);
    else
      this.server.to(client.id).emit("creation failure", chatroom);
  }
}