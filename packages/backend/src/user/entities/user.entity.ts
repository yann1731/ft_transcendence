import {onlineStatus} from '@prisma/client'
import {UserFriendship} from '../../userfriendship/entities/userfriendship.entity'
import {UserBlocks} from '../../userblocks/entities/userblock.entity'
import {ChatroomUser} from '../../chatroomuser/entities/chatroomuser.entity'
import {PrivateMessage} from '../../privatemessage/entities/privatemessage.entity'
import {ChatroomMessage} from '../../chatroommessage/entities/chatroommessage.entity'
import {Chatroom} from '../../chatroom/entities/chatroom.entity'

export class User {
	avatar: string ;
	username: string ;
	password: string ;
	email: string ;
	win: number ;
	loss: number ;
	gamesPlayed: number ;
	userStatus: onlineStatus ;
	twoFaEnabled: boolean ;
	friendListA?: UserFriendship[] ;
	friendListB?: UserFriendship[] ;
	blockedUsers?: UserBlocks[] ;
	blockedBy?: UserBlocks[] ;
	chatrooms?: ChatroomUser[] ;
	sentMessages?: PrivateMessage[] ;
	receivedMessages?: PrivateMessage[] ;
	sentChatroomMessages?: ChatroomMessage[] ;
	Chatroom?: Chatroom[] ;
	id: string ;
}