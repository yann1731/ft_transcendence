import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatroomMessageDto } from './dto/createmessage.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatroommessageService {
  constructor(private prisma: PrismaService) {}

  async findAll(chatroomId: string) {
	try {
		const chatroommessages = await this.prisma.chatroomMessage.findMany({
			where: {
		  		chatroomId
			},
			orderBy: {
				createdAt: 'asc'
		}
	  	});
	  	if (!chatroommessages)
			throw new BadRequestException('Could not fetch chatroom messages');
		return chatroommessages; 
	} catch (error) {
		throw error;
	}
  }

  async createChatroomMessage(createChatroomMessageDto: CreateChatroomMessageDto) {
	try {
		const _msg = await this.prisma.chatroomMessage.create({data: {
			content: createChatroomMessageDto.content,
			sender: {
				connect: {
					id: createChatroomMessageDto.senderId
				}
			},
			chatroom: {
				connect: {
					id: createChatroomMessageDto.chatroomId
				}
			}
		}});
		if (!_msg)
			throw new BadRequestException('Could not create chatroom message');
		return _msg;
	} catch (error) {
		throw error;
	}
  }
}
