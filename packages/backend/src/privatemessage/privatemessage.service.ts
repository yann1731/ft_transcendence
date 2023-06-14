import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrivatemessageService {
  constructor(private prisma: PrismaService) {}

  async findAll(senderId: string, recipientId: string) {
    const messages = await this.prisma.privateMessage.findMany({ 
      where: {
          OR: [
            { senderId: senderId, recipientId: recipientId},
            { senderId: recipientId, recipientId: senderId}
          ],
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    if (!messages)
      throw new BadRequestException;
    else
      return messages;
  }
}
