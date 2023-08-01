import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { CreateChatroomDto } from 'src/chatroom/dto/create-chatroom.dto';
import { UpdateChatroomDto } from 'src/chatroom/dto/update-chatroom.dto';
import { CreatePasswordChatroomDto } from 'src/chatroom/dto/create-passwordChatroom.dto';
import { CreateChatroomuserDto } from 'src/chatroomuser/dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from 'src/chatroomuser/dto/update-chatroomuser.dto';
import { ChatroomuserService } from 'src/chatroomuser/chatroomuser.service';
import { Chatroom, ChatroomUser } from '@prisma/client';

@WebSocketGateway({ cors: true, namespace: 'chatsocket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService, private chatroomService: ChatroomService, private chatroomUserService: ChatroomuserService) {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // console.log("New client connected to chatSocket");
    this.server.to(client.id).emit("connected");
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
    createChatroom(client: Socket, data: any) {
    client.broadcast.emit("chatroom created", data);
    this.server.to(client.id).emit("chat created", data);
  }
  
  @SubscribeMessage("delete chatroom")
  deleteChatroom(client: Socket, data: any) {
    this.server.emit("chatroom deleted", data);
  }
  
  @SubscribeMessage("update chatroom")
  updateChatroom(client: Socket, data: any) {
    this.server.emit("chatroom updated", data);
  }
  
  @SubscribeMessage("join chatroom")
  createChatroomUser(client: Socket, data: any) {
    client.broadcast.emit("user joined", data);
  }
  
  @SubscribeMessage("delete chatroomuser")
  removeChatroomUser(client: Socket, data: any) {
    client.broadcast.emit("user removed", data);
  }

  @SubscribeMessage("quit chatroom")
  quitChatroom(client: Socket, data: any) {
    this.server.to(client.id).emit("chatroom quit", data);
  }

  @SubscribeMessage("refresh")
  refreshPage(client: Socket, data: any) {
    this.server.emit("refresh");
  }
}
