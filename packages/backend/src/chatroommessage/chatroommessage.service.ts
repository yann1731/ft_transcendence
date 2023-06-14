import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
