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
import { UserfriendshipService } from 'src/userfriendship/userfriendship.service';
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
    private readonly userfriendshipService: UserfriendshipService,
    private readonly userService: UserService) {};

  @WebSocketServer()
  server: Server;

  findIDBySocket(socketID: string) {
    for (let [key, value] of this.users.entries()) {
      if (value === socketID) {
        return (key);
      }
    }
    // console.log();
    return ("null");
  }

  @SubscribeMessage("refused")
  handleRefused(client: Socket) {
    this.server.to(client.id).emit("refused")
  }

  @SubscribeMessage("inviteToPlay")
  async inviteToPlay(client: Socket, data: any) {
    // this socket call invites another user to play pong
    // it receives the client making the request
    const _inviter = await this.userService.findBySocketID(client.id);
    const _invitedUser = await this.userService.findUsername(data.username);
    console.log("try to send invite")
    if (_inviter) {
      if (_inviter.id === _invitedUser.id) {
        this.server.to(client.id).emit("displayFailure", {msg: "You can't invite yourself to play, dummy!"});
        return ;
      }
      this.server.timeout(15000).to(_invitedUser.socketID).emit("invitedToPlay", { inviterID: _inviter.id }, (err, response) => {
          if (err) {
            console.log("here")
            this.server.to(client.id).emit("displayFailure", {msg: "Invitation timed out or user declined."});
          } else {
            console.log("Invitation was succesfull");
          }
        });
    }
    else 
      console.log("inviter id is null")
  }

  async handleConnection(client: Socket) {
  }

  @SubscribeMessage("connectMe")
  async makeConnection(client: Socket, data: any) {
    console.log("Connecting: " + client.id + " " + data.id);
    await this.userService.updateSocketID(client.id, data.id);
    await this.userService.updateStatus("online", data.id);
    this.server.emit("reloadFriends");
    // console.log();
  }

  async handleDisconnect(client: Socket) {
    console.log("Handling disconnect for: " + client.id);
    const user = await this.userService.findBySocketID(client.id);
    if (user) {
      await this.userService.updateStatus("offline", user.id);
      this.server.emit("reloadFriends");
    } else {
      console.log("Could not find user from socket: " + client.id);
    }
	}

  @SubscribeMessage("getFriends")
  async sendFriends(client: Socket, data: any) {
    if (data.id === undefined) {
      console.log("ID is undefined when fetching friends...");
      return ;
    }
    try {
      const friends = await this.userfriendshipService.findAllUF(data.id);
      this.server.to(client.id).emit("updateFriends", { friends: friends});
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage("getChannels")
  async sendChannels(client: Socket, data: any) {
    const channels = await this.chatroomUserService.findAllChatroomsByUserID(data.id);
    console.log("Channels: " + channels);
    this.server.to(client.id).emit("updateChannels", {channels: channels});
  }

  @SubscribeMessage("friendUpdate")
  async updateFriendList(client: Socket, data: any) {
    const _user = await this.userService.findOne(data.id);
    this.server.to(_user.socketID).emit("reloadFriends");
  }

  @SubscribeMessage("channelUpdate")
  async updateChannelList(client: Socket, data: any) {
    const _user = await this.userService.findOne(data.id);
    this.server.to(_user.socketID).emit("reloadChannels");
  }

  @SubscribeMessage("getChatroomUsers")
  async getChatroomUsers(client: Socket, data: any) {
    console.log("Getting chatroom users!");
    const _chatUsers = await this.chatroomUserService.findAllChatroomUsersByChatroomId(data.channelID);
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
      nickname: _user.nickname,
      username: _user.username,
      avatar: _user.avatar,
      type: "friend",
      recipient: _recipient.username,
      // channelID: createPrivateMessageDto.chatroomId
    };
    this.server.to(_user.socketID).emit("messageResponse", _msgInfo);
    this.server.to(_recipient.socketID).emit("messageResponse", _msgInfo);
  }

  @SubscribeMessage("clearHistory")
  async clearHistory(client: Socket) {
    this.server.to(client.id).emit("clearHistory");
  }

  @SubscribeMessage("clearOtherHistory")
  async clearOtherHistory(client: Socket, data: any) {
    const otherSocket = this.users.get(data.otherID);
    this.server.to(otherSocket).emit("clearHistory");
  }

  formatDate(date: Date): string {
    date.setHours(date.getHours() - 4);
    const time = date.toLocaleTimeString("en-CA", {hour12: false});
    return (time);
  }

  @SubscribeMessage("sendMessage")
  async SendChatMessage(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto) {
    console.log("Attempting to send message.");
    const _chatUsers = await this.chatroomUserService.findAllChatroomUsersByChatroomId(createChatroomMessageDto.chatroomId);
    const _chatUser = _chatUsers.find(element => element.userId === createChatroomMessageDto.senderId);
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
      nickname: _user.nickname,
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

  @SubscribeMessage("getHistory")
  async getChatHistory(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto) {
    const channelID: string = createChatroomMessageDto.chatroomId;
    console.log("Getting Chat History for: " + channelID);
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
      //console.log(chatHistory);
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

  @SubscribeMessage("inGame")
  async setInGame(client: Socket, data: any) {
    await this.userService.updateStatus("inGame", data.username);
    this.server.emit("refresh");
  }

  @SubscribeMessage("outGame")
  async setOutGame(client: Socket, data: any) {
    await this.userService.updateStatus("online", data.username);
    this.server.emit("refresh");
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
  async handleBlocked(client: Socket, data: any){
    const friends = await this.userfriendshipService.findAllUF(data.blocked);
    this.server.to(this.users.get(data.blocked)).emit("blocked", data.id);
    this.server.to(this.users.get(data.blocked)).emit("clearOtherHistory", { chat: data.id});
    this.server.to(this.users.get(data.blocked)).emit("updateFriends", { friends: friends});
  }

  @SubscribeMessage("user left")
  handleLeaving(client: Socket){
    client.broadcast.emit("user left");
  }

  @SubscribeMessage("allo")
  handleAllo(client: Socket){
    console.log("marche salope")
  }
}
