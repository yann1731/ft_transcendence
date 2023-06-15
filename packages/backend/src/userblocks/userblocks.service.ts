import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserblockDto } from './dto/create-userblock.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserblocksService {
  constructor(private prisma: PrismaService) {}

  async create(createUserblockDto: CreateUserblockDto) { //creates a single block relationship between 2 users
    const userblocks = await this.prisma.userBlocks.create({data: {
      blocker: {
        connect: {
          id: createUserblockDto.blockerId
        }
      },
      blockedUser: {
        connect: {
          id: createUserblockDto.blockedUserId
        }
      }
    }});
    if (!userblocks)
      throw new BadRequestException;
    else
      return userblocks;
  }

  async findAll() { //returns all userblocks pairs
    return await this.prisma.userBlocks.findMany();
  }

  async findOne(id: string) { //returns a block relationship by id
    const userblocks = await this.prisma.userBlocks.findUnique({where:
      { id }
    });
    if (!userblocks)
      throw new BadRequestException;
    else
      return userblocks;
  }

  async remove(id: string) { //deletes a blocks relationship between 2 users
    const userblocks = await this.prisma.userBlocks.delete({where:
      { id }
    });
    if (!userblocks)
      throw new BadRequestException;
    else
      return userblocks;
  }
}
