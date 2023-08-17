import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2'
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';
import { Prisma } from '@prisma/client';
import {userPermission} from '@prisma/client'
const {validator } = Prisma;

@Injectable()
export class ChatroomService { //specifically to create a password protected chatroom
	constructor(private prisma: PrismaService) { }

	async createWithPass(createPasswordChatroomDto: CreatePasswordChatroomDto) {
	try {
		const hashedPass = await argon2.hash(createPasswordChatroomDto.password);
			const defaultPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg';
			const chatroom = await this.prisma.chatroom.create({
				data: {
					chatroomOwner: {connect: { id: createPasswordChatroomDto.userId}},
					name: createPasswordChatroomDto.name,
					picture: createPasswordChatroomDto.picture !== null ? createPasswordChatroomDto.picture : defaultPicture,
					state: createPasswordChatroomDto.state,
					password: hashedPass,
				}
			});
			const chatroomuser = await this.prisma.chatroomUser.create({data:
			{
				userId: createPasswordChatroomDto.userId,
				chatroomId: chatroom.id,
				permission: userPermission.owner
			}});
				return chatroom;
	} catch (error) {
		throw error;
	}
	}
	
	async create(createChatroomDto: CreateChatroomDto) { //creates either a public or private chatroom. Associates ownerId to the user who created it
		try {
			const defaultPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg';
				const { name } = createChatroomDto;
				const encodedName = encodeURIComponent(name);
				const chatroom = await this.prisma.chatroom.create({
					data: {
						chatroomOwner: {connect: { id: createChatroomDto.userId}},
						name: encodedName,
						picture: createChatroomDto.picture !== null ? createChatroomDto.picture : defaultPicture,
						state: createChatroomDto.state,
					}
				});
				const chatroomuser = await this.prisma.chatroomUser.create({data:
				{
					userId: createChatroomDto.userId,
					chatroomId: chatroom.id,
					permission: userPermission.owner
				}});
				return chatroom ;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async findAll() { //returns all currently created chatrooms
		try {
			return await this.prisma.chatroom.findMany();
		} catch (error) {
			throw new InternalServerErrorException('Could not fetch chatrooms');
		}
	}

	async findOne(id: string) { //returns a single chatroom using id
		try {
			const chatroom = await this.prisma.chatroom.findUnique({where: { id }});
			return chatroom;	
		} catch (error) {
			throw new BadRequestException('Could not fetch chatroom');
		}
	}

	async findAllUsers(chatroomId: string) {
		try {
			const users = await this.prisma.chatroom.findUnique({
			where: { id: chatroomId },
			include: { users: { include: { user: true } } },
			});
		return users;
	} catch (error) {
		throw new BadRequestException('Could not fetch chatrooms');
	}
	}


	async update(name: string, updateChatroomDto: UpdateChatroomDto) {
		const { state, picture, password } = updateChatroomDto;
		const encodedName = encodeURIComponent(name);
		let hashedPass: string;
		let updatedPicture = picture; 
		if (updatedPicture === null) {
			updatedPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg'; 
		}
		if (password)
		{
			try {
				hashedPass = await argon2.hash(updateChatroomDto.password.toString());
			} catch (error) {
				throw new InternalServerErrorException('Could not hash password');
			}
			const chatroom = await this.prisma.chatroom.update({where: {
				name : encodedName,
			},
			data: {
				state,
				picture: updatedPicture,
				password: hashedPass,
				users: {
					create: [updateChatroomDto.users]
				}
			}});
			if (!chatroom) {
				throw new BadRequestException('Could not fetch chatrooms');
			}
			else {
				console.log("updated " + name);
				return chatroom;
			}
		}
		else if (state !== "pwProtected")
		{
			const chatroom = await this.prisma.chatroom.update({where: {
				name: encodedName,
			},
			data: {
				state,
				picture: updatedPicture,
				password: null,
				users: {
					create: [updateChatroomDto.users]
				}
			}});
			if (!chatroom)
				throw new BadRequestException;
			else
				return chatroom;
		}
		else
		{
			let hashedPass: string | null = null;
		
			const existingChatroom = await this.prisma.chatroom.findUnique({ where: { name: encodedName } });

			if (existingChatroom && existingChatroom.password) {
				hashedPass = existingChatroom.password;
			} else if (password) {
				hashedPass = await argon2.hash(password.toString());
			}
			
			const chatroom = await this.prisma.chatroom.update({where: {
				name: encodedName,
			},
			data: {
				state,
				picture: updatedPicture,
				password: hashedPass,
				users: {
					create: [updateChatroomDto.users]
				},
				bannedUsers: { push: updateChatroomDto.bannedUsers }
			}});
			if (!chatroom)
				throw new BadRequestException;
			else
				return chatroom;
		}
	}

	async remove(name: string) { //deletes a chatroom. Will also need to delete all users associated with this chatroom
		const encodedName = encodeURIComponent(name)
		const chatroom = await this.prisma.chatroom.delete({where: { name: encodedName }});
		if (!chatroom)
			throw new BadRequestException;
		else 
			return chatroom;
	}
}
