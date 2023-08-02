import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
import { CreateChatroomuserPassDto } from './dto/create-chatroomuserpass.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'

@Injectable()
export class ChatroomuserService {
  constructor(private prisma: PrismaService) {}

  async create(createChatroomuserDto: CreateChatroomuserDto) { //creates a new chatroomuser. Associated to a chatroom by the id of the user
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
      throw new BadRequestException('Failed to create chatroom user');
    else
      return chatroomuser;
  }

  async createPass(createChatroomuserpass: CreateChatroomuserPassDto) {
    console.log(createChatroomuserpass.chatroomId)
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
      throw new BadRequestException('Failed to create chatroom user');
    }
    return newUser;
  }

  async findAll() { //returns all users regardless of chatroom they belong to
    return await this.prisma.chatroomUser.findMany();
  }

  async findOne(id: string) { //returns a specific chatroomuser by id
    const chatroomuser = await this.prisma.chatroomUser.findUnique({where:
      { id }
    });
    if (!chatroomuser)
      throw new BadRequestException('chatroom user does not exist');
    else
      return chatroomuser;
  }

  async findAllChatroomUsersByChatroomId(id: string) { //returns all chatroomusers associated with the particular chatroomid
    const chatroomusers = await this.prisma.chatroomUser.findMany({where: {
      chatroomId: id
    }});
    if (!chatroomusers)
      throw new BadRequestException('Failed to find users with that chatroom id');
    return chatroomusers;
  }

  async findAllChatroomUsersByUserId(id: string) { //returns all chatroomusers associated with the particular userId
    const chatroomusers = await this.prisma.chatroomUser.findMany({where: {
      userId: id
    }});
    if (!chatroomusers) {
      throw new BadRequestException('Failed to find users with that user id');
    }
    return chatroomusers;
  }

  async update(id: string, updateChatroomuserDto: UpdateChatroomuserDto) { //updates a chatroomuser to change permission, ban, length of ban and mute. all those are optional
    const chatroomuser = await this.prisma.chatroomUser.update({where:
      { id },
      data: {
        permission: updateChatroomuserDto.permission,
        banStatus: updateChatroomuserDto.banStatus,
        muteStatus: updateChatroomuserDto.muteStatus,
        muteUntil: updateChatroomuserDto.muteUntil
      }
    });
    if (!chatroomuser)
      throw new BadRequestException;
    return chatroomuser;
  }

  async remove(id: string) { //removes a particular chatroomuser by id
    const chatroomuser = await this.prisma.chatroomUser.delete({where:
      { id }
    });
    if (!chatroomuser)
      throw new BadRequestException;
    return chatroomuser;
  }
}
