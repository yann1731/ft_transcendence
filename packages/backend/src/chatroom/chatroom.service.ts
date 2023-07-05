import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2'
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';

@Injectable()
export class ChatroomService { //specifically to create a password protected chatroom
  constructor(private prisma: PrismaService) { }

  async createWithPass(createPasswordChatroomDto: CreatePasswordChatroomDto) {
    const hashedPass = await argon2.hash(createPasswordChatroomDto.password);
    const chatroom = await this.prisma.chatroom.create({
      data: {
        chatroomOwner: {connect: { id: createPasswordChatroomDto.userId}},
        name: createPasswordChatroomDto.name,
        picture: createPasswordChatroomDto.picture !== null ? createPasswordChatroomDto.picture : undefined,
        state: createPasswordChatroomDto.state,
        password: hashedPass,
      }
    });
    if (!chatroom)
    throw new BadRequestException;
    else
    return chatroom;
  }
  
  async create(createChatroomDto: CreateChatroomDto) { //creates either a public or private chatroom. Associates ownerId to the user who created it
    const chatroom = await this.prisma.chatroom.create({
      data: {
        chatroomOwner: {connect: { id: createChatroomDto.userId}},
        name: createChatroomDto.name,
        picture: createChatroomDto.picture !== null ? createChatroomDto.picture : undefined,
        state: createChatroomDto.state,
      }
    });
    if (!chatroom)
      throw new BadRequestException;
    else
      return chatroom ;
  }

  async findAll() { //returns all currently created chatrooms
    return await this.prisma.chatroom.findMany();
  }

  async findOne(name: string) { //returns a single chatroom using id
    const chatroom = await this.prisma.chatroom.findUnique({where: { name }});
    if (!chatroom)
      throw new BadRequestException;
    else
      return chatroom;
  }

  async findAllUsers(id: string) { //returns all chatroomusers associated to a chatroom by id
    const users = await this.prisma.chatroomUser.findMany({where: { chatroomId: id }});

    if (!users)
      throw new BadRequestException;
    else
      return users;
  }

  async update(name: string, updateChatroomDto: UpdateChatroomDto) { 
    const { state, picture, password } = updateChatroomDto; 
    let updatedPicture = picture; 
    if (updatedPicture === "") {
      updatedPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg'; 
  }
    if (password)
    {
      const hashedPass = await argon2.hash(updateChatroomDto.password.toString());
      const chatroom = await this.prisma.chatroom.update({where: {
        name
      },
      data: {
        state,
        picture: updatedPicture,
        password: hashedPass,
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
      const chatroom = await this.prisma.chatroom.update({where: {
        name
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
  }

  async remove(name: string) { //deletes a chatroom. Will also need to delete all users associated with this chatroom
    const chatroom = await this.prisma.chatroom.delete({where: { name }});
    if (!chatroom)
      throw new BadRequestException;
    else
      return chatroom;
  }
}
