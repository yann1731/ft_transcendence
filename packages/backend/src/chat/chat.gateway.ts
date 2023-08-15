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
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserblocksService } from 'src/userblocks/userblocks.service';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { subscribe } from 'diagnostics_channel';



@WebSocketGateway({ cors: true, namespace: 'chatsocket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  users: Map<string, string> = new Map<string, string>();

  constructor(private readonly chatService: ChatService,
    private prisma: PrismaService,
    private readonly chatroomMessageService: ChatroommessageService,
    private readonly chatroomService: ChatroomService,
    private readonly privateMessageService: PrivatemessageService,
    private readonly chatroomUserService: ChatroomuserService,
    private readonly userblocksService: UserblocksService,
    private readonly userService: UserService) {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // console.log("New client connected to chatSocket");
    this.server.to(client.id).emit("connected");
    this.server.emit("refresh2")
  }

  @SubscribeMessage("connected")
  handleConnected(client: Socket, id: string){
    this.users.set(id, client.id)
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected from chatSocket');
    console.log("ClientDisconn: " + client.id);
    this.server.to(client.id).emit("disconnected");
	}

  @SubscribeMessage("registerDisconnect")
  async registerDisconnect(client: Socket, data: any) {
    await this.userService.updateStatus("offline", data.username);
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
    const _recipient = await this.userService.findUsername(createPrivateMessageDto.recipientId);
    // emits back so that the frontend can catch. Basic usage working.
    const time = this.formatDate(new Date(_msg.createdAt));
    const _msgInfo = {
      text: createPrivateMessageDto.content,
      timestamp: time,
      nickname: _user.username,
      avatar: _user.avatar,
      type: "friend",
      recipient: _recipient.username,
      // channelID: createPrivateMessageDto.chatroomId
    };
    this.server.emit("messageResponse", _msgInfo);
  }

  @SubscribeMessage("clearHistory")
  async clearHistory(client: Socket) {
    this.server.to(client.id).emit("clearHistory");
  }

  formatDate(date: Date): string {
    date.setHours(date.getHours() - 4);
    const time = date.toLocaleTimeString("en-CA", {hour12: false});
    return (time);
  }

  @SubscribeMessage("sendMessage")
  async SendChatMessage(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto) {
    const _chatUsers = await this.chatroomUserService.findAllChatroomUsersByChatroomId(createChatroomMessageDto.chatroomId);
    const _chatUser = _chatUsers.find(element => element.userId === createChatroomMessageDto.senderId);
    console.log("muteStatus: " + _chatUser.muteStatus);
    if (_chatUser.muteStatus === true) {
      const _now = new Date();
      if (_now.getMinutes() - _chatUser.mutedAt.getMinutes() >= 5) {
        // if time > muteTime; unMute; continue;
        const _updatedUser = await this.chatroomUserService.updateMuteStatus(_chatUser.id, false);
        console.log("muteStatus: " + _updatedUser.muteStatus);
      } else {
        return ;
      }
    }
    const _chat = await this.chatroomService.findOne(createChatroomMessageDto.chatroomId);
    const _msg = await this.chatroomMessageService.createChatroomMessage(createChatroomMessageDto);
    const _user = await this.userService.findOne(createChatroomMessageDto.senderId);
    const time = this.formatDate(new Date(_msg.createdAt));
    const _msgInfo = {
      text: createChatroomMessageDto.content,
      timestamp: time,
      nickname: _user.username,
      avatar: _user.avatar,
      channelID: createChatroomMessageDto.chatroomId,
      chatName: _chat.name,
      type: "channel",
      senderID: _user.id,
    };
    for (const user of _chat.users) {
      if (await this.blockExists(_user.id, user.user.id) === false) {
        this.server.to(user.user.socketID).emit("messageResponse", _msgInfo);
      }
    }
  }

  async blockExists(userID: string, senderID: string) {
    const _user = await this.prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        blockedUsers: true,
        blockedBy: true
      }
    });
    for (const b of _user.blockedUsers) {
      if (b.blockedUserId === senderID) {
        return (true);
      }
    }
    for (const b of _user.blockedBy) {
      if (b.blockerId === senderID) {
        return (true);
      }
    }
    return (false);
  }

  @SubscribeMessage("muteUser")
  async muteUser(client: Socket, data: any) {
    console.log(data);
    const _updatedUser = await this.chatroomUserService.updateMuteStatus(data.mute.id, true);
  }

  @SubscribeMessage("unmuteUser")
  async unmuteUser(client: Socket, data: any) {
    const _updatedUser = await this.chatroomUserService.updateMuteStatus(data.mute.id, false);
  }

  @SubscribeMessage("getUserBlocks")
  async getUserBlocks(client: Socket, data: any) {
    // userID, senderID
    const _users = await this.userblocksService.findAll();
    const _blocks: any[] = [];
    for (const element of _users) {
      const _block: any = {
        id: element.id,
        blockerID: element.blockerId,
        blockedUserID: element.blockedUserId
      };
      _blocks.push(_block);
    };
    this.server.emit("receiveBlocks", {blocks: _blocks});
  }

  @SubscribeMessage("getHistory")
  async getChatHistory(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto) {
    const channelID: string = createChatroomMessageDto.chatroomId;
    console.log("Getting Chat History");
    const userID: string = createChatroomMessageDto.senderId;

    // senderID is actually the userID
    try {
      let msgHistory: any[] = [];
      const chatHistory = await this.chatroomMessageService.findAll(channelID);
      for (const element of chatHistory ) {
        const time = this.formatDate(new Date(element.createdAt));
        const _sender = await this.userService.findOne(element.senderId);
        const msg: any = {
          text: element.content,
          timestamp: time,
          nickname: _sender.nickname,
          avatar: _sender.avatar,
          senderID: _sender.id,
          channelID: channelID,
        };
        // if User has blocked, or is blocked, by senderID, don't push the msg
        if (await this.blockExists(userID, msg.senderID) === true) {
          console.log("Block Exists: " + userID, msg.senderID);
          continue ;
        } else {
          msgHistory.push(msg);
        }
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
    // console.log("" + _user.socketID);
    console.log("Getting Private History!");
    try {
      let msgHistory: any[] = [];
      const chatHistory = await this.privateMessageService.findAll(_user.id, _recipient.id);
      for (const element of chatHistory ){
        const time = this.formatDate(new Date(element.createdAt));
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

  @SubscribeMessage("deleteHistory")
  async deleteHistory(client: Socket, data: any) {
    this.server.emit("clearOtherHistory", { chat: data.channel});
  }

  @SubscribeMessage("registerUser")
  async registerUser(client: Socket, data: any) {
    console.log("Registering: " + data.username + " (" + client.id + ")");
    await this.userService.updateSocketID(client.id, data.username);
    // await this.userService.updateStatus("online", data.username);
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
    console.log("allo");
    this.server.emit("refresh2");
  }
  
  @SubscribeMessage("user added")
  handleAdded(client: Socket, data: any){
    this.server.to(this.users.get(data.id)).emit("added")
  }

  @SubscribeMessage("blocked")
  handleBlocked(client: Socket, data: any){
    console.log(data.id, data.blocked, this.users.get(data.blocked));
    this.server.to(this.users.get(data.blocked)).emit("blocked", data.id);
    this.server.to(this.users.get(data.blocked)).emit("clearOtherHistory", { chat: data.id});
  }

  @SubscribeMessage("user left")
  handleLeaving(client: Socket){
    client.broadcast.emit("user left");
  }
}
