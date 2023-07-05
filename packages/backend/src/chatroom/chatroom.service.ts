import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2'
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';
import { Prisma } from '@prisma/client';
const {validator } = Prisma;

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
    if (!chatroom)
      throw new BadRequestException('Failed to create chatroom');
    else {
      console.log("created " + createChatroomDto.name);
      console.log("it created " + name);
      return chatroom ;
    }
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
    console.log("name to edit = " + name);
    const encodedName = encodeURIComponent(name);
    const decodedName = decodeURIComponent(encodedName);
    let updatedPicture = picture; 
    if (updatedPicture === "") {
      updatedPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg'; 
  }
    if (password)
    {
      const hashedPass = await argon2.hash(updateChatroomDto.password.toString());
      const chatroom = await this.prisma.chatroom.update({where: {
        name : decodedName,
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
        console.log("edit " + name);
        throw new BadRequestException;
      }
      else {
        console.log("updated " + name);
        return chatroom;
      }
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
    console.log("Name to delete is " + name);
    const encodedName = encodeURIComponent(name)
    const chatroom = await this.prisma.chatroom.delete({where: { name: encodedName }});
    console.log("remove " + name);
    if (!chatroom)
      throw new BadRequestException;
    else {
      console.log('Deleted ' + name);
      return chatroom;
    }
  }
}
