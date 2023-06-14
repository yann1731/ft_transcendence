import { chatRoomState } from '@prisma/client'
import { ChatroomMessage } from '../../chatroommessage/entities/chatroommessage.entity'
import { User } from '../../user/entities/user.entity'
import { ChatroomUser } from '../../chatroomuser/entities/chatroomuser.entity'

export class Chatroom {
	id: string ;
	messages?: ChatroomMessage[] ;
	state: chatRoomState ;
	chatroomOwner?: User ;
	userId: string ;
	password: string  | null;
	users?: ChatroomUser[] ;
}