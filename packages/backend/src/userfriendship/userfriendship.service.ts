import { Injectable } from '@nestjs/common';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserfriendshipService {
  constructor(private prisma: PrismaService) {}

  async create(createUserfriendshipDto: CreateUserfriendshipDto) {
    const userfriendship = await this.prisma.userFriendship.create({
      data: {
        userA: {
          connect: {
            id: createUserfriendshipDto.userAId
          }
        },
        userB: {
          connect: {
            id: createUserfriendshipDto.userBId
          }
        }
      }
    });
    return userfriendship;
  }

  async findAll() {
    return await this.prisma.userFriendship.findMany();
  }

  async findOne(id: string) {
    const userfriendship = await this.prisma.userFriendship
  }

  async remove(userAId: string, userBId: string) {
    
  }
}
