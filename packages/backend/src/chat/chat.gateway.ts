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

@WebSocketGateway({ cors: true, namespace: 'chatsocket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService, private chatroomService: ChatroomService, private chatroomUserService: ChatroomuserService) {};
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
  async createChatroom(client: Socket, data: CreateChatroomDto) {
    const chatroom = await this.chatroomService.create(data);
    if (chatroom)
    {
      this.server.to(client.id).emit("creation success", chatroom);
      client.broadcast.emit("chatroom created", chatroom);
    }
    else
      this.server.to(client.id).emit("creation failure", chatroom);
  }
  
  @SubscribeMessage("create password chatroom")
  async createPasswordChatroom(client: Socket, data: CreatePasswordChatroomDto) {
    const chatroom = await this.chatroomService.createWithPass(data);
    if (chatroom)
    {
      this.server.to(client.id).emit("creation success", chatroom);
      client.broadcast.emit("chatroom created", chatroom);
    }
    else
    this.server.to(client.id).emit("creation failure", chatroom);
  }
  
  @SubscribeMessage("delete chatroom")
  async deleteChatroom(client: Socket, data: string) {
    const chatroom = await this.chatroomService.remove(data);
    if (chatroom)
    {
      this.server.to(client.id).emit("deletion success", chatroom);
      client.broadcast.emit("chatroom deleted", chatroom);
    }
    else
    this.server.to(client.id).emit("deletion failure", chatroom);
  }
  
  @SubscribeMessage("update chatroom")
  async updateChatroom(client: Socket, name: string, data: UpdateChatroomDto) {
    const chatroom = await this.chatroomService.update(name, data);
    if (chatroom)
    {
      this.server.to(client.id).emit("update success", chatroom);
      client.broadcast.emit("chatroom updated", chatroom);
    }
    else
    this.server.to(client.id).emit("update failure", chatroom);
  }
  
  @SubscribeMessage("create chatroomuser")
  async createChatroomUser(client: Socket, data: CreateChatroomuserDto) {
    const chatroomUser = await this.chatroomUserService.create(data);
    if (chatroomUser)
    {
      this.server.to(client.id).emit("chatroom joined", chatroomUser);
      client.broadcast.emit("user joined", chatroomUser);
    }
    else
      this.server.to(client.id).emit("joining failure", chatroomUser);
  }
}
