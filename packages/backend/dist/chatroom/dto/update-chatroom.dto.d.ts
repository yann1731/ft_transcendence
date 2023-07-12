import { CreateChatroomDto } from './create-chatroom.dto';
import { ChatroomUser } from '../../chatroomuser/entities/chatroomuser.entity';
import { chatRoomState } from '@prisma/client';
declare const UpdateChatroomDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateChatroomDto>>;
export declare class UpdateChatroomDto extends UpdateChatroomDto_base {
    state: chatRoomState;
    picture: string;
    password?: String;
    users?: ChatroomUser;
}
export {};
