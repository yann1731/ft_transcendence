import { User } from '../../user/entities/user.entity';
import { Chatroom } from '../../chatroom/entities/chatroom.entity';
export declare class ChatroomMessage {
    id: string;
    content: string;
    createdAt: Date;
    senderId: string;
    sender?: User;
    chatroomId: string;
    chatroom?: Chatroom;
}
