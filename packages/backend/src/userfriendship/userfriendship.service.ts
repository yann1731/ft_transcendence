import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserfriendshipService {
  constructor(private prisma: PrismaService) {}

  async create(createUserfriendshipDto: CreateUserfriendshipDto) { //creates a friendship relationship between a pair of users
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

  async findAll() { //returns all friendship pairs
    const userfriendship = await this.prisma.userFriendship.findMany();
    if (!userfriendship)
      throw new BadRequestException;
    else
      return userfriendship;
  }

  async findAllUF(id: string) {
    const userfriendships = await this.prisma.userFriendship.findMany({where: 
    {
      
    }})
  }

  async findOne(id: string) { //returns a friendship pair by id
    const userfriendship = await this.prisma.userFriendship.findUnique({where: { id }});
    if (!userfriendship)
      throw new BadRequestException;
    else
      return userfriendship;
  }

  async remove(id: string) { //removes a friendship pair from the database
    return await this.prisma.userFriendship.delete({where: { id }});
  }
}
