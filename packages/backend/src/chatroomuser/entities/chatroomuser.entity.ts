import {userPermission} from '@prisma/client'
import {User} from '../../user/entities/user.entity'
import {Chatroom} from '../../chatroom/entities/chatroom.entity'

export class ChatroomUser {
	userId: string ;
	user?: User ;
	chatroomId: string ;
	chatroom?: Chatroom ;
	permission: userPermission ;
	banStatus: boolean ;
	banUntil: Date  | null;
	muteStatus: boolean ;
}