import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomDto } from './create-chatroom.dto';
import { ChatroomUser } from '../../chatroomuser/entities/chatroomuser.entity'
import { chatRoomState } from '@prisma/client';

export class UpdateChatroomDto extends PartialType(CreateChatroomDto) {
    state: chatRoomState;
    picture: string;
    password?: String;
    users?: ChatroomUser;
    bannedUsers?: string[];
}
