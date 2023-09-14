import { User } from "Contexts/userContext";
// Interfaces.tsx
export{};

// Pour Dashboard
export interface userStats {
    win: number,
    loss: number,
    gamesPlayed: number,
    bestStreak: number
}

// POur login
export interface loginInfos {
    email: string,
    password: string
}

// Pour toolBar
export interface userAvatar {
    avatar: string,
    userStatus: string
}

// Pour profile page
export interface userProfile {
    win: number,
    loss: number,
    gamesPlayed: number,
    bestStreak: number,
    twoFaEnabled: boolean,
    username: string,
    password: string,
    avatar: string
}

// Variables user utiles pour chat box
export interface chatUser {
    username: string,
    avatar: string,
    userStatus: string
}

export interface limitedProfile {
	username: string,
	avatar: string,
}

export interface statsProps {
	userId: string,
	username?: string,
	nickname: string,
	win?: number,
	loss?: number,
	gamesPlayed?: number,
	avatar: string,
}

// Variables private message pour messages privés
export interface PrivateMessage {
    id: string ;
	content: string ;
	createdAt: Date ;
	senderId: string ;
	sender?: chatUser ;
	recipientId: string ;
	receiver?: chatUser ;
}

export interface Message {
    text: string;
    timestamp: string;
    nickname: string;
    UserAvatar: string;
	userId: string;
  }

// Variables user utiles pour chatRoom
export interface ChatroomUser {
	userName: string;
	id: string;
	userId: string ;
	user: User;
	chatroomId: string ;
	chatroom?: Chatroom ;
	permission: userPermission ;
	banStatus: boolean ;
	muteStatus: boolean ;
	muteUntil: number  | null;
}

// Variables utiles ChatRoom
export interface Chatroom {
	name: string;
    id: string ;
    picture?: string | null;
	messages?: ChatroomMessage[] ;
	state: string ;
	chatroomOwner?: User | null;
	userId: string | undefined;
	password: string  | null;
	users?: ChatroomUser[] ;
}

// Link between users
export interface UserFriendship {
	userAId: string ;
	userA?: User ;
	userBId: string ;
	userB?: User ;
	id: string ;
}

// Message chatroom
export interface ChatroomMessage {
	id: string ;
	content: string ;
	createdAt: Date ;
	senderId: string ;
	sender?: User ;
	chatroomId: string ;
	chatroom?: Chatroom ;
}

export interface UserBlocks {
	blockerId: string ;
	blocker?: User ;
	blockedUserId: string ;
	blockedUser?: User ;
	id: string ;
}

export interface HallOfFame {
    nickname: string;
    win: number;
    loss: number;
    gamesPlayed: number;
}

export interface ChatInUse {
    chat: Chatroom;
	type: chatroomType;
}

export enum userPermission {
    owner = "owner",
    admin = "admin",
    regular = "regular",
}

export enum chatroomType {
    friend = "friend",
    channel = "channel",
}

export enum chatRoomState {
	public = 'public',
	private = 'private',
	pwProtected = 'pwProtected'
};