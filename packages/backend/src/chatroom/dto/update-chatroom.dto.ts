import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomDto } from './create-chatroom.dto';
import { ChatroomUser } from '../../chatroomuser/entities/chatroomuser.entity'

export class UpdateChatroomDto extends PartialType(CreateChatroomDto) {
    users?: ChatroomUser;
}
