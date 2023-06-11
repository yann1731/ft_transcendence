import { PartialType } from '@nestjs/mapped-types';
import { chatRoomState } from '@prisma/client'
import { CreateChatroomDto } from './create-chatroom.dto';
import { ChatroomUser } from '../../chatroomuser/entities/chatroomuser.entity'
import { ChatroomMessage } from 'src/chatroommessage/entities/chatroommessage.entity';

export class UpdateChatroomDto extends PartialType(CreateChatroomDto) {
    messages: ChatroomMessage;
    users: ChatroomUser;
}
