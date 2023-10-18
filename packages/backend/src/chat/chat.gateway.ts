import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatroommessageService } from 'src/chatroommessage/chatroommessage.service';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatroomuserService } from 'src/chatroomuser/chatroomuser.service';
import { PrivatemessageService } from 'src/privatemessage/privatemessage.service';
import { CreateChatroomMessageDto } from 'src/chatroommessage/dto/createmessage.dto';
import { CreatePrivateMessageDto } from 'src/privatemessage/dto/createprivatemessage.dto';
import { ChatroomUser, User } from '@prisma/client';
import { UserblocksService } from 'src/userblocks/userblocks.service';
import { UserfriendshipService } from 'src/userfriendship/userfriendship.service';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { PrismaClient } from "@prisma/client";
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

interface userData {
  id: string,
  at: string
}

interface channelData {
  channelID: string,
  name: string,
}

const prisma = new PrismaClient();

@WebSocketGateway({ cors: true })
 export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly chatService: ChatService,
    private prisma: PrismaService,
    private readonly chatroomMessageService: ChatroommessageService,
    private readonly chatroomService: ChatroomService,
    private readonly privateMessageService: PrivatemessageService,
    private readonly chatroomUserService: ChatroomuserService,
    private readonly userfriendshipService: UserfriendshipService,
    private readonly userService: UserService,
	private jwt: JwtService) {};

  users: Map<string, string> = new Map<string, string>();
  users2: Map<string, Socket> = new Map<string, Socket>();
  users3: Map<string, NodeJS.Timeout> = new Map<string, NodeJS.Timeout>();
  users4: Map<string, Socket> = new Map<string, Socket>()
  users5: Map<string, boolean> = new Map<string, boolean>()
  
  x: number;
	y: number;

	oneHost: [string, boolean, boolean, boolean, boolean, Socket][] = []
	oneWaiting: Socket[] = []
	twoHost: [Socket, string, boolean, boolean, boolean, boolean][] = []
	twoWaiting: Socket[] = []
	threeHost: [Socket, string, boolean, number][] = []
	threeWaiting: Socket[] = []

	oneGame: [string, string, string][] = []
	twoGame: [string, string, string, string, string][] = []
	threeGame: [string, string, string, string, string][] = []

	XVelocityMin1: number = 350;
  XVelocityMax1: number = 400;
  XVelocityMin2: number = -350;
  XVelocityMax2: number = -400;
  YvelocityMin: number = 125;
  YvelocityMax: number = 225;  
  
  @WebSocketServer()
  server: Server;


  async handleConnection(client: Socket) {
  }

  async handleDisconnect(client: Socket): Promise<void> {
    const user = await this.userService.findBySocketID(client.id);
    if (user) {
      await this.userService.updateStatus("offline", user.id);
      this.server.emit("reloadFriends");
    }

    for (let i = 0; i < this.oneHost.length; i++)
			if (this.oneHost[i][5] === client) 
				this.oneHost.splice(i, 1);
		for (let i = 0; i < this.twoHost.length; i++)
			if (this.twoHost[i][0] === client)
				this.twoHost.splice(i, 1);
		for (let i = 0; i < this.threeHost.length; i++)
			if (this.threeHost[i][0] === client)
				this.threeHost.splice(i, 1);


		for (let i = 0; i < this.oneWaiting.length; i++)
			if (this.oneWaiting[i] === client)
				this.oneWaiting.splice(i, 1);
		for (let i = 0; i < this.twoWaiting.length; i++)
			if (this.twoWaiting[i] === client)
				this.twoWaiting.splice(i, 1);
		for (let i = 0; i < this.threeWaiting.length; i++)
			if (this.threeWaiting[i] === client)
				this.threeWaiting.splice(i, 1);

		for (let i = 0; i < this.oneGame.length; i++)
			for (let j = 1; j < 3; j++)
				if (this.oneGame[i][j] === client.id){
					this.server.to(this.oneGame[i][0]).emit("disconnected")
					this.users4.get(this.oneGame[i][1]).leave(this.oneGame[i][0])
					this.users4.get(this.oneGame[i][2]).leave(this.oneGame[i][0])
					this.oneGame.splice(i, 1);
					break;
				}
		for (let i = 0; i < this.twoGame.length; i++)
			for (let j = 1; j < 5; j++)
				if (this.twoGame[i][j] === client.id){
					this.server.to(this.twoGame[i][0]).emit("disconnected")
					this.users4.get(this.twoGame[i][1]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][2]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][3]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][4]).leave(this.twoGame[i][0])
					this.twoGame.splice(i, 1);
					break;
				}
		for (let i = 0; i < this.threeGame.length; i++)
			for (let j = 1; j < 5; j++)
				if (this.threeGame[i][j] === client.id){
					this.server.to(this.threeGame[i][0]).emit("disconnected")
					this.users4.get(this.threeGame[i][1]).leave(this.threeGame[i][0])
					this.users4.get(this.threeGame[i][2]).leave(this.threeGame[i][0])
					this.users4.get(this.threeGame[i][3]).leave(this.threeGame[i][0])
					this.users4.get(this.threeGame[i][4]).leave(this.threeGame[i][0])
					this.threeGame.splice(i, 1);
					break;
				}
		
		this.users.delete(client.id);
  }

  @SubscribeMessage("connectMe")
  async makeConnection(client: Socket, data: userData): Promise<void> {
	try {
		if (data.at === undefined || data.at === null){
			throw new UnauthorizedException("no token")
		}
		this.jwt.verify(data.at, {secret: process.env.SECRET })
    	await this.userService.updateSocketID(client.id, data.id);
    	await this.userService.updateStatus("online", data.id);
		console.log(data.id)
    	this.users.set(client.id, data.id);
    	this.users2.set(data.id, client);
    	this.users3.set(client.id, setTimeout(() => {}, 0));
		this.users4.set(client.id, client);
		this.users5.set(client.id, false)
    	this.server.emit("reloadFriends");
	} catch (error) {
		client.disconnect(true);
	}
  }

  @SubscribeMessage("disconnected")
	handledDisconnected(client: Socket){
		for (let i = 0; i < this.oneHost.length; i++)
			if (this.oneHost[i][5] === client)
				this.oneHost.splice(i, 1);
		for (let i = 0; i < this.twoHost.length; i++)
			if (this.twoHost[i][0] === client)
				this.twoHost.splice(i, 1);
		for (let i = 0; i < this.threeHost.length; i++)
			if (this.threeHost[i][0] === client)
				this.threeHost.splice(i, 1);


		for (let i = 0; i < this.oneWaiting.length; i++)
			if (this.oneWaiting[i] === client)
				this.oneWaiting.splice(i, 1);
		for (let i = 0; i < this.twoWaiting.length; i++)
			if (this.twoWaiting[i] === client)
				this.twoWaiting.splice(i, 1);
		for (let i = 0; i < this.threeWaiting.length; i++)
			if (this.threeWaiting[i] === client)
				this.threeWaiting.splice(i, 1);

		for (let i = 0; i < this.oneGame.length; i++)
			for (let j = 1; j < 3; j++)
				if (this.oneGame[i][j] === client.id){
					this.server.to(this.oneGame[i][0]).emit("disconnected")
					this.users4.get(this.oneGame[i][1]).leave(this.oneGame[i][0])
					this.users4.get(this.oneGame[i][2]).leave(this.oneGame[i][0])
					this.oneGame.splice(i, 1);
					break;
				}
		for (let i = 0; i < this.twoGame.length; i++)
			for (let j = 1; j < 5; j++)
				if (this.twoGame[i][j] === client.id){
					this.server.to(this.twoGame[i][0]).emit("disconnected")
					this.users4.get(this.twoGame[i][1]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][2]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][3]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][4]).leave(this.twoGame[i][0])
					this.twoGame.splice(i, 1);
					break;
				}
		for (let i = 0; i < this.threeGame.length; i++)
			for (let j = 1; j < 5; j++)
				if (this.threeGame[i][j] === client.id){
					this.server.to(this.threeGame[i][0]).emit("disconnected")
					this.users4.get(this.threeGame[i][1]).leave(this.threeGame[i][0])
					this.users4.get(this.threeGame[i][2]).leave(this.threeGame[i][0])
					this.users4.get(this.threeGame[i][3]).leave(this.threeGame[i][0])
					this.users4.get(this.threeGame[i][4]).leave(this.threeGame[i][0])
					this.threeGame.splice(i, 1);
					break;
				}	
	}

	@SubscribeMessage("ping")
	handlePing(client: Socket){
		clearTimeout(this.users3.get(client.id))
		this.users3.set(client.id, setTimeout(() => {
			const room = Array.from(client.rooms).filter(room => room !== client.id)
			this.handledDisconnected(client)
			this.server.to(String(room[0])).emit("disconnected");
		}, 1500));
	}

  //for chat

    findIDBySocket(socketID: string): string {
      for (let [key, value] of this.users.entries()) {
        if (value === socketID) {
          return (key);
        }
      }
      return ("null");
    }

    @SubscribeMessage("refused")
    handleRefused(client: Socket, other: string): void {
      this.server.to(this.users2.get(other).id).emit("refused")
	  this.users5.set(client.id,false)
    }

    @SubscribeMessage("inviteToPlay")
    async inviteToPlay(client: Socket, data: any): Promise<void> {
      // this socket call invites another user to play pong
      // it receives the client making the request
      const _inviter = this.users.get(client.id)
      const _invitedUser = await this.userService.findUsername(data.username);
      if (_inviter) {
        if (_inviter === _invitedUser.id) {
          this.server.to(client.id).emit("displayFailure", {msg: "You can't invite yourself to play, dummy!"});
          return ;
        }
		if (this.users5.get(_invitedUser.socketID) !== true){
			this.users5.set(_invitedUser.socketID, true)
        	this.server.timeout(15000).to(_invitedUser.socketID).emit("invitedToPlay", { inviterID: _inviter }, (err, response) => {
        	    if (err) {
        	      this.server.to(client.id).emit("displayFailure", {msg: "Invitation timed out or user declined."});
        	    }
        	  });
		}
		else
			this.server.to(client.id).emit("displayFailure", {msg: "user has already been invited"});
      }
    }


	@SubscribeMessage("reloadFriends")
	reloadfriend(){
		this.server.emit("reloadFriends")
	}

    @SubscribeMessage("logout")
    async logout(client: Socket){
      const user = await this.userService.findBySocketID(client.id);
      if (user) {
        await this.userService.updateStatus("offline", user.id);
        this.server.emit("reloadFriends");
      }
    }

    @SubscribeMessage("getFriends")
    async sendFriends(client: Socket, data: userData): Promise<void> {
      if (data.id === undefined) {
        return ;
      }
      try {
        const friends = await this.userfriendshipService.findAllUF(data.id);
        this.server.to(client.id).emit("updateFriends", { friends: friends});
      } catch (error) {
        console.error(error);
      }
    }

    @SubscribeMessage("getChannels")
    async sendChannels(client: Socket, data: any): Promise<void> {
      if (data.id === undefined) {
        return ;
      }
      try {
        const channels = await this.chatroomUserService.findAllChatroomsByUserID(data.id);
        this.server.to(client.id).emit("updateChannels", {channels: channels});
      } catch (error) {
        console.error("Failed getting channels: " + error);
      }
    }

    @SubscribeMessage("channelEdit")
    async editChannel(client: Socket, data: channelData): Promise<void> {
      const channelID = data.channelID;
      const channel = await this.chatroomService.findOne(channelID);
      for (const u of channel.users) {
        if (u.user.socketID !== client.id) {
          this.server.to(u.user.socketID).emit("reloadChannels");
        }
      }
    }

    @SubscribeMessage("friendUpdate")
    async updateFriendList(client: Socket, data: userData): Promise<void> {
      const _user = await this.userService.findOne(data.id);
      this.server.to(_user.socketID).emit("reloadFriends");
    }

    @SubscribeMessage("channelUpdate")
    async updateChannelList(client: Socket, data: userData): Promise<void> {
      const _user = await this.userService.findOne(data.id);
      const channels = await this.chatroomUserService.findAllChatroomsByUserID(_user.id);
      this.server.to(_user.socketID).emit("reloadChannels");
    }

    @SubscribeMessage("deleteChannel")
    async deleteChannel(client: Socket, data: channelData): Promise<void> {
      const channelID = data.channelID;
      // const channel = await this.chatroomService.findOne(channelID);
      const channel = await this.chatroomService.findByName(data.name);
      for (const u of channel.users) {
        // if (u.user.socketID !== client.id) {
          this.server.to(u.user.socketID).emit("clearOtherHistory", { chat: channel.name});
          this.server.to(u.user.socketID).emit("reloadChannels");
        // }
      }
    }

    @SubscribeMessage("getChatroomUsers")
    async getChatroomUsers(client: Socket, data: channelData): Promise<ChatroomUser[]> {
      const _chatUsers = await this.chatroomUserService.findAllChatroomUsersByChatroomId(data.channelID);
      return _chatUsers;
    }

    @SubscribeMessage("sendPrivateMessage")
    async SendPrivateMessage(client: Socket, createPrivateMessageDto: CreatePrivateMessageDto): Promise<void> {
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
      this.server.to(client.id).emit("messageResponse", _msgInfo);
      this.server.to(_recipient.socketID).emit("messageResponse", _msgInfo);
    }

    @SubscribeMessage("clearHistory")
    async clearHistory(client: Socket): Promise<void> {
      this.server.to(client.id).emit("clearHistory");
    }

    @SubscribeMessage("clearOtherHistory")
    async clearOtherHistory(client: Socket, data: any): Promise<void> {
      const otherUser = await this.userService.findOne(data.otherID);
      this.server.to(otherUser.socketID).emit("clearHistory");
    }

    formatDate(date: Date): string {
      date.setHours(date.getHours() - 4);
      const time = date.toLocaleTimeString("en-CA", {hour12: false});
      return (time);
    }

    @SubscribeMessage("sendMessage")
    async SendChatMessage(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto): Promise<void> {
      const _chatUsers = await this.chatroomUserService.findAllChatroomUsersByChatroomId(createChatroomMessageDto.chatroomId);
      const _chatUser = _chatUsers.find(element => element.userId === createChatroomMessageDto.senderId);
      if (_chatUser.muteStatus === true) {
        const _now = new Date();
        if (_now.getMinutes() - _chatUser.mutedAt.getMinutes() >= 5) {
          // if time > muteTime; unMute; continue;
          const _updatedUser = await this.chatroomUserService.updateMuteStatus(_chatUser.id, false);
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

    async blockExists(userID: string, senderID: string): Promise<boolean> {
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
    async muteUser(client: Socket, data: any): Promise<void> {
      await this.chatroomUserService.updateMuteStatus(data.mute.id, true);
    }

    @SubscribeMessage("unmuteUser")
    async unmuteUser(client: Socket, data: any): Promise<void> {
      await this.chatroomUserService.updateMuteStatus(data.mute.id, false);
    }

    @SubscribeMessage("getHistory")
    async getChatHistory(client: Socket, createChatroomMessageDto: CreateChatroomMessageDto): Promise<void> {
      const channelID: string = createChatroomMessageDto.chatroomId;
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
    async getPrivateHistory(client: Socket, createPrivateMessageDto: CreatePrivateMessageDto): Promise<void> {
      const _recipient = await this.userService.findUsername(createPrivateMessageDto.recipientId);
      const _user = await this.userService.findOne(createPrivateMessageDto.senderId);
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
    async deleteHistory(client: Socket, data: any): Promise<void> {
      this.server.emit("clearOtherHistory", { chat: data.channel});
    }

    @SubscribeMessage("inGame")
    async setInGame(client: Socket, data: any): Promise<void> {
      await this.userService.updateStatus("inGame", data.username);
      this.server.emit("refresh");
    }

    @SubscribeMessage("outGame")
    async setOutGame(client: Socket, data: any): Promise<void> {
      await this.userService.updateStatus("online", data.username);
      this.server.emit("reloadFriends");
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
    async handleBlocked(client: Socket, data: any): Promise<void> {
      const friends = await this.userfriendshipService.findAllUF(data.blocked);
      const blocked = await this.userService.findOne(data.blocked);
      this.server.to(this.users.get(data.blocked)).emit("blocked", data.id);
      this.server.to(this.users.get(data.blocked)).emit("clearOtherHistory", { chat: data.id});
      this.server.to(this.users.get(data.blocked)).emit("updateFriends", { friends: friends});
    }

    @SubscribeMessage("user left")
    handleLeaving(client: Socket){
      client.broadcast.emit("user left");
    }


  //for game
  @SubscribeMessage("movement")
	handleMovement(client: Socket, newpos: number): void {
		const room = Array.from(client.rooms).filter(room => room !== client.id)
		client.broadcast.to(String(room[0])).emit("movement", newpos);
	  }

	  @SubscribeMessage("movement2")
	  handleMovement2(client: Socket, data: any): void {
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	client.broadcast.to(String(room[0])).emit("movement2", data);
	  }

	  @SubscribeMessage("point")
	  handlePoint(client: Socket, which: number){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	client.broadcast.to(String(room[0])).emit("point", which);
	  }

	  @SubscribeMessage("end")
	  async handleEnd(client: Socket, data: any){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	if (data.which === 1){ 
	  		for (let i = 0; i < this.oneGame.length; i++)
				if (this.oneGame[i][0] === data.name || String(room[0]) === this.oneGame[i][0]){
					console.log(Array.from(client.rooms).filter(room => room !== client.id))
					await  this.userService.updateStatus('online', this.users.get(this.oneGame[i][1]))
					await this.userService.updateStatus('online', this.users.get(this.oneGame[i][2]))
					this.server.emit('reloadFriends')
					this.users4.get(this.oneGame[i][1]).leave(this.oneGame[i][0])
					this.users4.get(this.oneGame[i][2]).leave(this.oneGame[i][0])
					console.log(Array.from(client.rooms).filter(room => room !== client.id))

					try {
						await prisma.matchHistoryOne.create({
							data: {
								winnerId: data.player ? this.users.get((this.oneGame[i][2])) : this.users.get((this.oneGame[i][1])),
								loserId: data.player ? this.users.get((this.oneGame[i][1])) : this.users.get((this.oneGame[i][2])),
								winnerScore: (data.score1 > data.score2) ? data.score1 : data.score2,
								loserScore: (data.score1 > data.score2) ? data.score2 : data.score1
							}
						})
					}
					catch(error){
						console.error("Match history failed to create:", error)
					}

	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.oneGame[i][1])},
	  						data: {
	  							win: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							loss: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data:", error);
	  				}

	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.oneGame[i][2])},
	  						data: {
	  							win: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							loss: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data:", error);
	  				}
	  				
					this.oneGame.splice(i, 1);
	  				break;
	  			}
	  	}
	  	if (data.which === 2){
	  		for (let i = 0; i < this.twoGame.length; i++)
	  		if (this.twoGame[i][0] === data.name){ 
					await  this.userService.updateStatus('online', this.users.get(this.twoGame[i][1]))
					await this.userService.updateStatus('online', this.users.get(this.twoGame[i][2]))
					await  this.userService.updateStatus('online', this.users.get(this.twoGame[i][3]))
					await this.userService.updateStatus('online', this.users.get(this.twoGame[i][4]))
					this.users4.get(this.twoGame[i][1]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][2]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][3]).leave(this.twoGame[i][0])
					this.users4.get(this.twoGame[i][4]).leave(this.twoGame[i][0])
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.twoGame[i][1])},
	  						data: {
	  							win: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							loss: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.twoGame[i][2])},
	  						data: {
	  							win: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							loss: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.twoGame[i][3])},
	  						data: {
	  							win: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							loss: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.twoGame[i][4])},
	  						data: {
	  							win: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							loss: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}

	  				try {
	  					await prisma.matchHistoryTwo.create({
	  						data: {
	  							winnerId: data.player ? [this.users.get((this.twoGame[i][2])), this.users.get((this.twoGame[i][4]))] : [this.users.get((this.twoGame[i][1])), this.users.get((this.twoGame[i][3]))],
	  							loserId: data.player ? [this.users.get((this.twoGame[i][1])), this.users.get((this.twoGame[i][3]))] : [this.users.get((this.twoGame[i][2])), this.users.get((this.twoGame[i][4]))],
	  							winnerScore: (data.score1 > data.score2) ? data.score1 : data.score2,
	  							loserScore: (data.score1 > data.score2) ? data.score2 : data.score1
	  						}
	  					})
	  				}
	  				catch(error){
	  					console.error("Match history failed to create:", error)
	  				}
	  				this.twoGame.splice(i, 1);
					  this.server.emit('reloadFriends')
	  				break;
	  			}
	  	}	
	  	if (data.which === 3){
	  		for (let i = 0; i < this.threeGame.length; i++){
	  		if (this.threeGame[i][0] === data.name){
				await  this.userService.updateStatus('online', this.users.get(this.threeGame[i][1]))
				await this.userService.updateStatus('online', this.users.get(this.threeGame[i][2]))
				await  this.userService.updateStatus('online', this.users.get(this.threeGame[i][3]))
				await this.userService.updateStatus('online', this.users.get(this.threeGame[i][4]))
			   this.users4.get(this.threeGame[i][1]).leave(this.threeGame[i][0])
			   this.users4.get(this.threeGame[i][2]).leave(this.threeGame[i][0])
			   this.users4.get(this.threeGame[i][3]).leave(this.threeGame[i][0])
			   this.users4.get(this.threeGame[i][4]).leave(this.threeGame[i][0])
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.threeGame[i][1])},
	  						data: {
	  							win: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							loss: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.threeGame[i][2])},
	  						data: {
	  							win: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							loss: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.threeGame[i][3])},
	  						data: {
	  							win: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							loss: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}
	  				try {
	  						await prisma.user.update({
	  						where: {id: this.users.get(this.threeGame[i][4])},
	  						data: {
	  							win: {
	  								increment: data.player ? 1 : 0,
	  							},
	  							loss: {
	  								increment: data.player ? 0 : 1,
	  							},
	  							gamesPlayed: {
	  								increment: 1,
	  							}
	  						},
	  					})
	  				}
	  				catch (error){
	  					console.error("Error updating user data");
	  				}

	  				try {
	  					await prisma.matchHistoryThree.create({
	  						data: {
	  							winnerId: data.player ? [this.users.get((this.threeGame[i][2])), this.users.get((this.threeGame[i][3])), this.users.get((this.threeGame[i][4]))] : this.users.get((this.threeGame[i][1])),
	  							loserId: data.player ? this.users.get((this.threeGame[i][1])) : [this.users.get((this.threeGame[i][2])), this.users.get((this.threeGame[i][3])), this.users.get((this.threeGame[i][4]))],
	  							winnerScore: (data.score1 > data.score2) ? data.score1 : data.score2,
	  							loserScore: (data.score1 > data.score2) ? data.score2 : data.score1
	  						}
	  					})
	  				}
	  				catch(error){
	  					console.error("Match history failed to create:", error)
	  				}
					
	  				this.threeGame.splice(i, 1);
					  this.server.emit('reloadFriends')
	  				break;
	  			}
	  		}
	  	}
	  	this.server.emit("refresh");
	  }

	  @SubscribeMessage("update")
	  handleUpdate(client: Socket, data: any){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	client.broadcast.to(String(room[0])).emit("update", data);
	  }
  
	  @SubscribeMessage("multi")
	  handleMulti(client: Socket, data: any){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	client.broadcast.to(String(room[0])).emit("multi", data);
	  }

	  @SubscribeMessage("newPower")
	  HandleNewPower(client: Socket, data: any){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	client.broadcast.to(room[0]).emit("newPower", data);
	  }

	  @SubscribeMessage("random")
	  handleRandom(client: Socket, data: any){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	client.broadcast.to(room[0]).emit("random", data);
	  }

	  @SubscribeMessage("power")
	  handlePower(client: Socket, data: any){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	client.broadcast.to(room[0]).emit("power", data);
	  }

	  @SubscribeMessage("1v1")
	  async handle1v1(client: Socket, data: any){
	  	if (data.start){
	  		if (this.oneWaiting.length >= 1){
	  			let opponent : Socket = this.oneWaiting.shift()
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
				await this.userService.updateStatus("inGame", this.users.get(client.id))
				await this.userService.updateStatus("inGame", this.users.get(opponent.id))
				this.server.emit('reloadFriends')
				client.join(data.name);
				opponent.join(data.name);
				this.oneGame.push([data.name, client.id, opponent.id]);
	  			this.server.in(data.name).emit("start", {ballX: this.x, ballY: this.y, wall: data.wall, random: data.random, power: data.power, face: data.face});
	  		}
	  		else {
	  			this.oneHost.push([data.name, data.wall, data.random, data.power, data.face, client])
	  		}
	  	}
	  	else{
	  		if (this.oneHost.length >= 1){
	  			let host: [string, boolean, boolean, boolean, boolean, Socket] = this.oneHost.shift();
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
				await this.userService.updateStatus("inGame", this.users.get(client.id))
				await this.userService.updateStatus("inGame", this.users.get(host[5].id))
				this.server.emit('reloadFriends')
				client.join(host[0]);
				host[5].join(host[0])
				this.oneGame.push([host[0], host[5].id, client.id]);
	  			this.server.in(host[0]).emit("start", {ballX: this.x, ballY: this.y, wall: host[1], random: host[2], power: host[3], face: host[4]});
	  		}
	  		else
	  			this.oneWaiting.push(client);
	  	}
	  }

	  @SubscribeMessage("2v2")
	  async handle2v2(client: Socket, data: any){
	  	if (data.start){
			  if (this.twoWaiting.length >= 3){
				  let opponent1 : Socket = this.twoWaiting.shift()
	  				let opponent2 : Socket = this.twoWaiting.shift()
	  				let opponent3 : Socket = this.twoWaiting.shift()
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
					await this.userService.updateStatus("inGame", this.users.get(client.id))
					await this.userService.updateStatus("inGame", this.users.get(opponent1.id))
					await this.userService.updateStatus("inGame", this.users.get(opponent2.id))
					await this.userService.updateStatus("inGame", this.users.get(opponent3.id))
					this.server.emit('reloadFriends')
					this.server.to(client.id).emit("player", 1)
					this.server.to(opponent1.id).emit("player", 2)
					this.server.to(opponent2.id).emit("player", 3)
					this.server.to(opponent3.id).emit("player", 4)
					client.join(data.name);
					opponent1.join(data.name);
	  				opponent2.join(data.name);
	  				opponent3.join(data.name);
	  				this.twoGame.push([data.name, client.id, opponent1.id, opponent2.id, opponent3.id]);
	  				this.server.in(data.name).emit("start", {ballX: this.x, ballY: this.y, wall: data.wall, random: data.random, power: data.power, face: data.face});
	  		}
	  		else {
	  			this.twoHost.push([client, data.name, data.wall, data.random, data.power, data.face])
	  		}
	  	}
	  	else{
	  		if (this.twoHost.length >= 1 && this.twoWaiting.length >= 2){
	  			let host: [Socket, string, boolean, boolean, boolean, boolean] = this.twoHost.shift();
	  			let opponent1 : Socket = this.twoWaiting.shift()
	  			let opponent2 : Socket = this.twoWaiting.shift()
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
				await this.userService.updateStatus("inGame", this.users.get(client.id))
				await this.userService.updateStatus("inGame", this.users.get(host[0].id))
				await this.userService.updateStatus("inGame", this.users.get(opponent1.id))
				await this.userService.updateStatus("inGame", this.users.get(opponent2.id))
				this.server.emit('reloadFriends')
	  			this.server.to(host[0].id).emit("player", 1)
	  			this.server.to(client.id).emit("player", 2)
	  			this.server.to(opponent1.id).emit("player", 3)
	  			this.server.to(opponent2.id).emit("player", 4)
				opponent1.join(host[1]);
	  			opponent2.join(host[1]);
	  			client.join(host[1]);
				host[0].join(host[1])
	  			this.twoGame.push([host[1], host[0].id, client.id, opponent1.id, opponent2.id]);
	  			this.server.in(host[1]).emit("start", {ballX: this.x, ballY: this.y, wall: host[2], random: host[3], power: host[4], face: host[5]});
	  		}
	  		else
	  			this.twoWaiting.push(client);
	  	}
	  }

	  @SubscribeMessage("3v1")
	  async handle3v1(client: Socket, data: any){
	  	if (data.start){
	  		if (this.threeWaiting.length >= 3){
	  			let opponent1 : Socket = this.threeWaiting.shift()
	  			let opponent2 : Socket = this.threeWaiting.shift()
	  			let opponent3 : Socket = this.threeWaiting.shift()
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
				await this.userService.updateStatus("inGame", this.users.get(client.id))
				await this.userService.updateStatus("inGame", this.users.get(opponent1.id))
				await this.userService.updateStatus("inGame", this.users.get(opponent2.id))
				await this.userService.updateStatus("inGame", this.users.get(opponent3.id))
				this.server.emit('reloadFriends')
	  			this.server.to(client.id).emit("player", 1)
	  			this.server.to(opponent1.id).emit("player", 2)
	  			this.server.to(opponent2.id).emit("player", 3)
	  			this.server.to(opponent3.id).emit("player", 4)
				opponent1.join(data.name);
	  			opponent2.join(data.name);
	  			opponent3.join(data.name);
				client.join(data.name);
	  			this.threeGame.push([data.name, client.id, opponent1.id, opponent2.id, opponent3.id]);
	  			this.server.in(data.name).emit("start", {ballX: this.x, ballY: this.y, power: data.power, scale: data.scale});
	  		}
	  		else {
	  			this.threeHost.push([client, data.name, data.power, data.scale])
	  		}
	  	}
	  	else{
	  		if (this.threeHost.length >= 1 && this.threeWaiting.length >= 2){
	  			let host: [Socket, string, boolean, number] = this.threeHost.shift();
	  			let opponent1 : Socket = this.threeWaiting.shift()
	  			let opponent2 : Socket = this.threeWaiting.shift()
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
				await this.userService.updateStatus("inGame", this.users.get(client.id))
				await this.userService.updateStatus("inGame", this.users.get(host[0].id))
				await this.userService.updateStatus("inGame", this.users.get(opponent1.id))
				await this.userService.updateStatus("inGame", this.users.get(opponent2.id))
				this.server.emit('reloadFriends')
				this.server.to(host[0].id).emit("player", 1)
	  			this.server.to(client.id).emit("player", 2)
	  			this.server.to(opponent1.id).emit("player", 3)
	  			this.server.to(opponent2.id).emit("player", 4)
				opponent1.join(host[1]);
	  			opponent2.join(host[1]);
	  			client.join(host[1]);
				host[0].join(host[1])
	  			this.threeGame.push([host[1], host[0].id, client.id, opponent1.id, opponent2.id]);
	  			this.server.in(host[1]).emit("start", {ballX: this.x, ballY: this.y, power: host[2], scale: host[3]});
	  		}
	  		else
	  			this.threeWaiting.push(client);
	  	}
	  }

	  @SubscribeMessage("invite")
	  async handleInvitation(client: Socket, data: any) {
	  	const userA = this.users2.get(data.userA)
	  	const userB = this.users2.get(data.userB)
		await this.userService.updateStatus("inGame", this.users.get(userA.id))
		await this.userService.updateStatus("inGame", this.users.get(userB.id))
		this.server.emit('reloadFriends')
	  	userA.join(data.userA)
	  	userB.join(data.userA)
	  	this.server.to(userA.id).emit("invite")
	  	this.server.to(userB.id).emit("invite")
		this.users5.set(client.id, false)
	  	this.oneGame.push([data.userA, userA.id, userB.id])

	  }

	  @SubscribeMessage("finished")
	  handleFinished(client: Socket){
	  	this.server.to(client.id).emit("finished");
	  }

	  @SubscribeMessage("invite end")
	  handleInviteEnd(client: Socket){
	  	const room = Array.from(client.rooms).filter(room => room !== client.id)
	  	this.server.to(String(room[0])).emit("invite end");
	  }
} 