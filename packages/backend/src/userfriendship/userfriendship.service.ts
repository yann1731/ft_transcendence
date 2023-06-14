import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (!userfriendship)
      throw new BadRequestException;
    else
      return userfriendship;
  }

  async findAll() {
    const userfriendship = await this.prisma.userFriendship.findMany();
    if (!userfriendship)
      throw new BadRequestException;
    else
      return userfriendship;
  }

  async findOne(id: string) {
    const userfriendship = await this.prisma.userFriendship.findUnique({where: { id }});
    if (!userfriendship)
      throw new BadRequestException;
    else
      return userfriendship;
  }

  async remove(id: string) {
    return await this.prisma.userFriendship.delete({where: { id }});
  }
}
