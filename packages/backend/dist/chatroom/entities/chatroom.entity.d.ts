import { chatRoomState } from '@prisma/client';
import { ChatroomMessage } from '../../chatroommessage/entities/chatroommessage.entity';
import { User } from '../../user/entities/user.entity';
import { ChatroomUser } from '../../chatroomuser/entities/chatroomuser.entity';
export declare class Chatroom {
    name: string;
    id: string;
    picture: string;
    messages?: ChatroomMessage[];
    state: chatRoomState;
    chatroomOwner?: User;
    userId: string;
    password: string | null;
    users?: ChatroomUser[];
}
