import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserblockDto } from './dto/create-userblock.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserblocksService {
  constructor(private prisma: PrismaService) {}

  async create(createUserblockDto: CreateUserblockDto) {
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

  async findAll() {
    return await this.prisma.userBlocks.findMany();
  }

  async findOne(id: string) {
    const userblocks = await this.prisma.userBlocks.findUnique({where:
      { id }
    });
    if (!userblocks)
      throw new BadRequestException;
    else
      return userblocks;
  }

  async remove(id: string) {
    const userblocks = await this.prisma.userBlocks.delete({where:
      { id }
    });
    if (!userblocks)
      throw new BadRequestException;
    else
      return userblocks;
  }
}
