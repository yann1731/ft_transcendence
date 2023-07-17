// Interfaces.tsx
export{};
// User
interface User {
    avatar: string,
    username: string,
    email: string,
    win: number,
    loss: number,
    gamesPlayed: number,
    userStatus: string,
    twoFaEnabled: boolean,
    friendListA?: UserFriendship[],
    friendListB?: UserFriendship[],
    blockedUsers?: UserBlocks[],
    blockedBy?: UserBlocks[],
    chatrooms?: ChatroomUser[],
    sentMessages?: PrivateMessage[],
    receivedMessages?: PrivateMessage[],
    sentChatroomMessages?: ChatroomMessage[],
    Chatroom?: Chatroom[],
    id: string ;
}

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
    nickname: string | undefined;
    UserAvatar: string | undefined;
  }

// Variables user utiles pour chatRoom
export interface ChatroomUser {
	id: string;
	userId: string ;
	user?: User ;
	chatroomId: string ;
	chatroom?: Chatroom ;
	permission: boolean ;
	banStatus: boolean ;
	banUntil: Date  | null;
	muteStatus: boolean ;
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
    Chat: Chatroom;
}

export enum userPermission {
    owner = "owner",
    admin = "admin",
    regular = "regular"
  }
