import {userPermission} from '@prisma/client'
import {User} from '../../user/entities/user.entity'
import {Chatroom} from '../../chatroom/entities/chatroom.entity'

export class ChatroomUser {
	id: string;
	userId: string ;
	user?: User ;
	chatroomId: string ;
	chatroom?: Chatroom ;
	permission: userPermission ;
	muteStatus: boolean ;
	muteUntil: number | null ;
}