import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatroommessageService } from 'src/chatroommessage/chatroommessage.service';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatroomuserService } from 'src/chatroomuser/chatroomuser.service';
import { PrivatemessageService } from 'src/privatemessage/privatemessage.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateChatroomMessageDto } from 'src/chatroommessage/dto/createmessage.dto';
import { CreatePrivateMessageDto } from 'src/privatemessage/dto/createprivatemessage.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserblocksService } from 'src/userblocks/userblocks.service';



@WebSocketGateway({ cors: true, namespace: 'chatsocket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  users: Map<string, string> = new Map<string, string>();

  constructor(private readonly chatService: ChatService,
    private readonly chatroomMessageService: ChatroommessageService,
    private readonly privateMessageService: PrivatemessageService,
    private readonly chatroomUserService: ChatroomuserService,
    private readonly userblocksService: UserblocksService,
    private readonly userService: UserService) {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // console.log("New client connected to chatSocket");
    this.server.to(client.id).emit("connected");
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected from chatSocket');
    console.log("ClientDisconn: " + client.id);
	}

  @SubscribeMessage("getUserBlocks")
  async getUser(client: Socket, data: any) {
    console.log("UserID: " + data.userID);
    console.log("Username: " + data.name);
    const _users = await this.userblocksService.findBlocksByID(data.userID);
    const _blocks: any[] = [];
    for (const element of _users) {
      const _block: any = {
        id: element.id,
        blockerID: element.blockerId,
        blockedUserID: element.blockedUserId
      };
      _blocks.push(_block);
    };
    this.server.to(client.id).emit("receiveBlocks", {blocks: _blocks});
  }
  
  @SubscribeMessage("getChatroomUsers")
  async getChatroomUsers(client: Socket, data: any) {
    console.log("Getting chatroom users!");
    const _chatUsers = await this.chatroomUserService.findAllChatroomUsersByChatroomId(data.channelID);
    console.log("Printing _chatUsers");
    console.log(_chatUsers);
    return _chatUsers;
  }

  @SubscribeMessage("sendPrivateMessage")
  async SendPrivateMessage(client: Socket, createPrivateMessageDto: CreatePrivateMessageDto) {
    const _msg = await this.privateMessageService.createPrivateMessage(createPrivateMessageDto);
    const _user = await this.userService.findOne(createPrivateMessageDto.senderId);
    // emits back so that the frontend can catch. Basic usage working.
    let date_time = new Date(_msg.createdAt);
    let time = date_time.getHours().toString() + ":" + date_time.getMinutes().toString() + ":" + date_time.getSeconds().toString();
    if (date_time.getHours() < 12) {
      time = time + " AM";
    } else {
      time = time + " PM";
    }
    const _msgInfo = {
      text: createPrivateMessageDto.content,
      timestamp: time,
      nickname: _user.username,
      avatar: _user.avatar,
      // channelID: createPrivateMessageDto.chatroomId
    };
    this.server.emit("messageResponse", _msgInfo);
  }

  formatDate(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let time = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
    if (hours < 12) {
      time = time + " AM";
    } else {
      time = time + " PM";
    }
    return (time);
  }

  @SubscribeMessage("sendMessage")
  async SendChatMessage(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto) {
    const _chatUsers = await this.chatroomUserService.findAllChatroomUsersByChatroomId(createChatroomMessageDto.chatroomId);
    const _chatUser = _chatUsers.find(element => element.userId === createChatroomMessageDto.senderId);
    if (_chatUser.muteStatus === true) {
      // if time > muteTime; unMute; continue;
      return ;
    }
    const _msg = await this.chatroomMessageService.createChatroomMessage(createChatroomMessageDto);
    const _user = await this.userService.findOne(createChatroomMessageDto.senderId);
    // emits back so that the frontend can catch. Basic usage working.
    const time = this.formatDate(new Date(_msg.createdAt));
    const _msgInfo = {
      text: createChatroomMessageDto.content,
      timestamp: time,
      nickname: _user.username,
      avatar: _user.avatar,
      channelID: createChatroomMessageDto.chatroomId,
    };
    this.server.emit("messageResponse", _msgInfo);
  }

  @SubscribeMessage("getHistory")
  async getChatHistory(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto) {
    const channelID = createChatroomMessageDto.chatroomId;
    try {
      let msgHistory: any[] = [];
      const chatHistory = await this.chatroomMessageService.findAll(channelID);
      for (const element of chatHistory ) {
        const time = this.formatDate(new Date(element.createdAt));
        const _user = await this.userService.findOne(element.senderId);
        const msg: any = {
          text: element.content,
          timestamp: time,
          nickname: _user.nickname,
          avatar: _user.avatar
        };
        msgHistory.push(msg);
      };
      this.server.to(client.id).emit("sendHistory", { history: msgHistory });
    } catch (error) {
      console.error("Error fetching chatroom history:", error);
      // Handle the error, emit an error event, or take appropriate action.
    }
  }

  @SubscribeMessage("getPrivateHistory")
  async getPrivateHistory(client: Socket, createPrivateMessageDto: CreatePrivateMessageDto) {
    const _recipient = await this.userService.findUsername(createPrivateMessageDto.recipientId);
    const _user = await this.userService.findOne(createPrivateMessageDto.senderId);
    console.log("Getting Private History!");
    try {
      let msgHistory: any[] = [];
      const chatHistory = await this.privateMessageService.findAll(_user.id, _recipient.id);
      console.log(chatHistory);
      for (const element of chatHistory ){
        let date_time = new Date(element.createdAt);
        let time = date_time.getHours().toString() + ":" + date_time.getMinutes().toString() + ":" + date_time.getSeconds().toString();
        if (date_time.getHours() < 12) {
          time = time + " AM";
        } else {
          time = time + " PM";
        }
        const _sender = await this.userService.findOne(element.senderId);
        const msg: any = {
          text: element.content,
          timestamp: time,
          nickname: _sender.nickname,
          avatar: _sender.avatar
        };
        msgHistory.push(msg);
      };
      this.server.to(client.id).emit("sendHistory", { history: msgHistory });
    } catch (error) {
      console.error("Error fetching chatroom history:", error);
      // Handle the error, emit an error event, or take appropriate action.
    }
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
    if (data.protectionStat !== "private")
    {
      client.broadcast.emit("chatroom created", data);
    }
    this.server.to(client.id).emit("chat created", data);
  }
  
  @SubscribeMessage("delete chatroom")
  deleteChatroom(client: Socket, data: any) {
    console.log(data.chanName)
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
    this.server.to(client.id).emit("refresh", data);
    client.broadcast.emit("user left");
  }

  @SubscribeMessage("refresh")
  refreshPage(client: Socket, data: any) {
    this.server.emit("refresh");
  }
  
  @SubscribeMessage("refresh2")
  refreshPage2(client: Socket, data: any) {
    this.server.emit("refresh2");
  }
  
  @SubscribeMessage("user added")
  handleAdded(client: Socket, data: any){
    this.server.to(this.users.get(data.id)).emit("added")
  }

  @SubscribeMessage("blocked")
  handleBlocked(client: Socket, data: any){
    this.server.to(this.users.get(data.blocked)).emit("blocked", data.id)
  }

  @SubscribeMessage("user left")
  handleLeaving(client: Socket){
    client.broadcast.emit("user left");
  }
}
