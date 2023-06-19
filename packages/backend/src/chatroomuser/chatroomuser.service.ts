import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
      throw new BadRequestException;
    else
      return chatroomuser;
  }

  async findAll() { //returns all users regardless of chatroom they belong to
    return await this.prisma.chatroomUser.findMany();
  }

  async findOne(id: string) { //returns a specific chatroonuser by id
    const chatroomuser = await this.prisma.chatroomUser.findUnique({where:
      { id }
    });
    if (!chatroomuser)
      throw new BadRequestException;
    else
      return chatroomuser;
  }

  async update(id: string, updateChatroomuserDto: UpdateChatroomuserDto) { //updates a chatroomuser to change permission, ban, length of ban and mute. all those are optional
    const chatroomuser = await this.prisma.chatroomUser.update({where:
      { id },
      data: {
        permission: updateChatroomuserDto.permission,
        banStatus: updateChatroomuserDto.banStatus,
        banUntil: updateChatroomuserDto.banUntil,
        muteStatus: updateChatroomuserDto.muteStatus
      }
    });
    if (!chatroomuser)
      throw new BadRequestException;
    else
      return chatroomuser;
  }

  async remove(id: string) { //removes a particular chatroomuser by id
    const chatroomuser = await this.prisma.chatroomUser.delete({where:
      { id }
    });

    if (!chatroomuser)
      throw new BadRequestException;
    else
      return chatroomuser;
  }
}
