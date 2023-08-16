import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
import { BanChatroomuserDto } from './dto/ban-chatroomuser.dto';
import { CreateChatroomuserPassDto } from './dto/create-chatroomuserpass.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import internal from 'stream';
import { ENTRY_PROVIDER_WATERMARK } from '@nestjs/common/constants';

@Injectable()
export class ChatroomuserService {
  constructor(private prisma: PrismaService) {}

  async create(createChatroomuserDto: CreateChatroomuserDto) { //creates a new chatroomuser. Associated to a chatroom by the id of the user
	try {
		const chatroom = await this.prisma.chatroom.findUnique({where: { id: createChatroomuserDto.chatroomId }});
		if (!chatroom) {
	  		throw new BadRequestException("Chatroom not found");
		}
		console.log("allo", chatroom.bannedUsers,  createChatroomuserDto.userId)
		chatroom.bannedUsers.forEach((user: string) => {
			console.log("here")
			if (user === createChatroomuserDto.userName){
				console.log("yesy")
				throw new BadRequestException("User is banned")
			}
		}) 
		try {
			const chatroomuser = await this.prisma.chatroomUser.create({data: {
			user: {
				connect: { 
					id: createChatroomuserDto.userId
				}
			},
			chatroom: {
				connect: {
					id: createChatroomuserDto.chatroomId
				}
			}
			}
			});
			if (!chatroomuser)
				throw new BadRequestException('Could not create chatroom user');
			return chatroomuser;
		} catch (error) {
			console.log(error);
			throw error;
		}
	} catch (error) {
		throw error;
	}
	
  }

  async createPass(createChatroomuserpass: CreateChatroomuserPassDto) {
	try {
		const chatroom = await this.prisma.chatroom.findUnique({where: { id: createChatroomuserpass.chatroomId }});
		if (!chatroom) {
	  		throw new BadRequestException("Chatroom not found");
		}
		const check = await argon.verify(chatroom.password, createChatroomuserpass.password);
		if (!check) {
	  		throw new BadRequestException('Invalid password');
		}
		const newUser = await this.prisma.chatroomUser.create({data: {
	  	user: {
			connect: {
		  		id: createChatroomuserpass.userId
			}
	  	},
	  	chatroom: {
			connect: {
		  		id: createChatroomuserpass.chatroomId
			}
	  	}
		}});
		if (!newUser) {
	  		throw new BadRequestException('Could not create chatroom user');
		}
		return newUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findAll() { //returns all users regardless of chatroom they belong to
	try {
		return await this.prisma.chatroomUser.findMany();
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findOne(id: string) { //returns a specific chatroomuser by id
	try {
		const chatroomuser = await this.prisma.chatroomUser.findUnique({where:
			{ id }
		  });
		  if (!chatroomuser)
			throw new BadRequestException('Could not find specified chatroom user');
		return chatroomuser;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findAllChatroomUsersByChatroomId(id: string) { //returns all chatroomusers associated with the particular chatroomid
	try {
		const chatroomusers = await this.prisma.chatroomUser.findMany({where: {
			chatroomId: id
		}});
		if (!chatroomusers)
			throw new BadRequestException('Failed to find users with that chatroom id');
		return chatroomusers;
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findAllChatroomUsersByUserId(id: string) { //returns all chatroomusers associated with the particular userId
	try {
		const chatroomusers = await this.prisma.chatroomUser.findMany({where: {
			userId: id
		}});
		if (!chatroomusers) {
			throw new BadRequestException('Failed to find users with that user id');
		}
		return chatroomusers;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async update(id: string, updateChatroomuserDto: UpdateChatroomuserDto) { //updates a chatroomuser to change permission, ban, length of ban and mute. all those are optional
	try {
		const chatroomuser = await this.prisma.chatroomUser.update({where:
			{ id },
			data: {
			  permission: updateChatroomuserDto.permission,
			  muteStatus: updateChatroomuserDto.muteStatus,
			  muteUntil: updateChatroomuserDto.muteUntil
		}
		});
		if (!chatroomuser)
			throw new BadRequestException('Could not update specified chatroom user');
		return chatroomuser;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async remove(id: string) { //removes a particular chatroomuser by id
	try {
		const chatroomuser = await this.prisma.chatroomUser.delete({where:
			{ id }
		});
		if (!chatroomuser)
			throw new BadRequestException('Could not remove specified chatroom user');
		return chatroomuser;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

	async ban(id: string, banChatroomuserDto: BanChatroomuserDto) {
    	try {
			
			const chatroom = await this.prisma.chatroom.findUnique({
				where: { id: banChatroomuserDto.chatroomId },
    	        select: { bannedUsers: true },
    	    });
			
			if (!chatroom) 
			throw new BadRequestException("Chatroom not found");
			
    	    const updatedBannedUsers = [...chatroom.bannedUsers, banChatroomuserDto.userName];
			
			console.log("hajksfhjkvbas", banChatroomuserDto.userName)
			//console.log("hehehehe", updatedBannedUsers)

    	    /* await this.prisma.chatroom.update({
				where: { id: banChatroomuserDto.chatroomId },
    	        data: {
					bannedUsers: {
						set: updatedBannedUsers,
    	            },
    	        },
    	    }); */
			const chatroomuser = await this.prisma.chatroomUser.delete({
				where: { id },
			});
			
    	    if (!chatroomuser)
    	        throw new BadRequestException('Could not ban user');
		
			//console.log("fuck yes");
    	} catch (error) {
    	    console.error(error);
    	    throw error;
    	}
	}
}
