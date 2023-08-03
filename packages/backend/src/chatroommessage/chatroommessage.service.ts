import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatroomMessageDto } from './dto/createmessage.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatroommessageService {
  constructor(private prisma: PrismaService) {}

  async findAll(chatroomId: string) {
    const chatroommessages = await this.prisma.chatroomMessage.findMany({
      where: {
        chatroomId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    if (!chatroommessages)
      throw new BadRequestException;
    else
      return chatroommessages;
  }

  async createChatroomMessage(createChatroomMessageDto: CreateChatroomMessageDto) {
    let messageData: Prisma.ChatroomMessageCreateInput;
    messageData = {
      content: createChatroomMessageDto.content,
      sender: {
        connect: {
          id: createChatroomMessageDto.senderId,
        }
      },
      chatroom: {
        connect: {
          id: createChatroomMessageDto.chatroomId,
        }
      }
    }

    // this now actually fucking works thanks to the code above. 
    // Who the fuck knows why?
    const _msg = await this.prisma.chatroomMessage.create({ data: messageData });
    if (!_msg)
      throw new BadRequestException;
    else
      return _msg;
  }
}
