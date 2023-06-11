import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chatroom } from './entities/chatroom.entity';
import { CreateChatDto } from 'src/chat/dto/create-chat.dto';

@Injectable()
export class ChatroomService {
  constructor(private prisma: PrismaService) { }
  async create(createChatroomDto: CreateChatroomDto) {
    const chatroom = await this.prisma.chatroom.create({
      data: {
        chatroomOwner: {connect: { id: createChatroomDto.userId}},
        state: createChatroomDto.state,
        password: createChatroomDto.password
      }
    });
    return chatroom ;
  }

  async findAll() {
    return await this.prisma.chatroom.findMany();
  }

  async findOne(id: string) {
    const chatroom = await this.prisma.chatroom.findUnique({where: { id }});
    if (!chatroom)
      throw new ForbiddenException;
    else
      return chatroom;
  }

  async update(id: string, updateChatroomDto: UpdateChatroomDto) {
    const chatroom = this.prisma.chatroom.update({where: {
      id
    },
    data: {
      messages: updateChatroomDto.messages,
      users: updateChatroomDto.users
    }});
    return await `This action updates a #${id} chatroom`;
  }

  async remove(id: string) {
    return await `This action removes a #${id} chatroom`;
  }
}
