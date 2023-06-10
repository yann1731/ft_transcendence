import { Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chatroom } from './entities/chatroom.entity';
import { CreateChatDto } from 'src/chat/dto/create-chat.dto';

@Injectable()
export class ChatroomService {
  constructor(private prisma: PrismaService) { }
  async create(createChatroomDto: CreateChatroomDto) {
    const chatroom = this.prisma.chatroom.create({
      data: {
        chatroomOwner: {connect: { id: createChatroomDto.userId}},
        
      }
    });
    return await ;
  }

  async findAll() {
    return await `This action returns all chatroom`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} chatroom`;
  }

  async update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return await `This action updates a #${id} chatroom`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} chatroom`;
  }
}
