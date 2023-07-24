import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor (private prisma: PrismaService) {};

  async createChatroomMessage(message: any) {
    if (message.content && message.chatroomId && message.id) {
      const chatroomMessage = await this.prisma.chatroomMessage.create({ data: {
        content: message.content,
        chatroomId: message.chatroomId,
        senderId: message.id
      }});
      if (chatroomMessage) {
        return chatroomMessage;
      }
    }
  }

  createPrivateMessage(message: any) {
    return `This action returns all chat`;
  }
}
