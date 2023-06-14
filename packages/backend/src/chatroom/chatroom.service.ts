import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Chatroom } from './entities/chatroom.entity';
import { CreateChatDto } from 'src/chat/dto/create-chat.dto';
import * as argon2 from 'argon2'
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';
import { emitKeypressEvents } from 'readline';

@Injectable()
export class ChatroomService {
  constructor(private prisma: PrismaService) { }

  async createWithPass(createPasswordChatroomDto: CreatePasswordChatroomDto) {
    const hashedPass = await argon2.hash(createPasswordChatroomDto.password);
    const chatroom = await this.prisma.chatroom.create({
      data: {
        chatroomOwner: {connect: { id: createPasswordChatroomDto.userId}},
        state: createPasswordChatroomDto.state,
        password: hashedPass
      }
    });
    if (!chatroom)
      throw new BadRequestException;
    else
      return chatroom;
  }

  async create(createChatroomDto: CreateChatroomDto) {
    const chatroom = await this.prisma.chatroom.create({
      data: {
        chatroomOwner: {connect: { id: createChatroomDto.userId}},
        state: createChatroomDto.state
      }
    });
    if (!chatroom)
      throw new BadRequestException;
    else
      return chatroom ;
  }

  async findAll() {
    return await this.prisma.chatroom.findMany();
  }

  async findOne(id: string) {
    const chatroom = await this.prisma.chatroom.findUnique({where: { id }});
    if (!chatroom)
      throw new BadRequestException;
    else
      return chatroom;
  }

  async update(id: string, updateChatroomDto: UpdateChatroomDto) {
    const chatroom = await this.prisma.chatroom.update({where: {
      id
    },
    data: {
      messages: {
        create: [updateChatroomDto.messages]
      },
      users: {
        create: [updateChatroomDto.users]
      }
    }});
    if (!chatroom)
      throw new BadRequestException;
    else
      return chatroom;
  }

  async remove(id: string) {
    const chatroom = await this.prisma.chatroom.delete({where: { id }});

    return chatroom;
  }
}
