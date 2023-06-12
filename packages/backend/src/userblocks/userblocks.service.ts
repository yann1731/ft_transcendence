import { Injectable } from '@nestjs/common';
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
      
  }

  async findAll() {
    return `This action returns all userblocks`;
  }

  async findOne(blockerId: string, blockedUserId: string) {
    return `This action returns a #${id} userblock`;
  }

  async remove(userId: string, blockedUserId: string) {
    return `This action removes a #${id} userblock`;
  }
}
