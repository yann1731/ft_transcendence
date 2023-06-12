import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatroomuserService {
  constructor(private prisma: PrismaService) {}

  async create(createChatroomuserDto: CreateChatroomuserDto) {
    const chatroomuser = await this.prisma.chatroomUser.create({data: {
      userId: createChatroomuserDto.userId,
      chatroomId: createChatroomuserDto.chatroomId,
      permission: createChatroomuserDto.permission
    }});

    if (!chatroomuser)
      throw new ForbiddenException;
    else
      return chatroomuser;
  }

  async findAll() {
    return await this.prisma.chatroomUser.findMany();
  }

  async findOne(userId: string, chatroomId: string) {
    const chatroomuser = await this.prisma.chatroomUser.findUnique({where: {
      userId_chatroomId: {
        userId: userId,
        chatroomId: chatroomId
      }
    }
    });
    if (!chatroomuser)
      throw new ForbiddenException;
    else
      return chatroomuser;
  }

  async update(userId: string, chatroomId: string, updateChatroomuserDto: UpdateChatroomuserDto) {
    const chatroomuser = await this.prisma.chatroomUser.update({where: {
      userId_chatroomId: {
        userId: userId,
        chatroomId: chatroomId
      }},
      data: {
        permission: updateChatroomuserDto.permission,
        banStatus: updateChatroomuserDto.banStatus,
        banUntil: updateChatroomuserDto.banUntil,
        muteStatus: updateChatroomuserDto.muteStatus
      }
    });
    if (!chatroomuser)
      throw new ForbiddenException;
    else
      return chatroomuser;
  }

  async remove(userId: string, chatroomId: string) {
    const chatroomuser = await this.prisma.chatroomUser.delete({where: {
      userId_chatroomId: {
        userId: userId,
        chatroomId: chatroomId
      }}
    });

    if (!chatroomuser)
      throw new ForbiddenException;
    else
      return chatroomuser;
  }
}
