import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrivateMessageDto } from './dto/createprivatemessage.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrivatemessageService {
  constructor(private prisma: PrismaService) {}

  async findAll(senderId: string, recipientId: string) { //returns all messages between 2 users
	try {
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
			throw new BadRequestException('Could not fetch messages');
		return messages; 
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }

  async createPrivateMessage(createPrivateMessageDto: CreatePrivateMessageDto) {
	try {
		const _recipient = await this.prisma.user.findUnique({
			where: {
			  username: createPrivateMessageDto.recipientId,
			}
		});
		console.log(_recipient.id);
		let messageData: Prisma.PrivateMessageCreateInput;
		messageData = {
		content: createPrivateMessageDto.content,
			sender: {
				connect: {
					id: createPrivateMessageDto.senderId,
				}
			},
			receiver: {
				connect: {
					id: _recipient.id,
				}
			}
		};
		const _msg = await this.prisma.privateMessage.create({ data: messageData });
		if (!_msg)
			throw new BadRequestException;
		else
			return _msg;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
