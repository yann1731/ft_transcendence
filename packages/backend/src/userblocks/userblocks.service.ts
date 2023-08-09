import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserblockDto } from './dto/create-userblock.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserblocksService {
  constructor(private prisma: PrismaService) {}

  async create(createUserblockDto: CreateUserblockDto) { //creates a single block relationship between 2 users
	try {
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
			throw new BadRequestException("Could not create user block");
		return userblocks; 
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  }

  async findAll() { //returns all userblocks pairs
	try {
		return await this.prisma.userBlocks.findMany();
	} catch (error) {
		console.log(error);
		throw new InternalServerErrorException(error);
	}
  }

  async findOne(id: string) { //returns a block relationship by id
	try {
		const userblocks = await this.prisma.userBlocks.findUnique({where:
			{ id }
		});
		if (!userblocks)
			throw new BadRequestException('Could not find specified user block');
		return userblocks;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async remove(id: string) { //deletes a blocks relationship between 2 users
	try {
		const userblocks = await this.prisma.userBlocks.delete({where:
			{ id }
		});
		if (!userblocks)
			throw new BadRequestException('Could not delete specified user block');
		return userblocks;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findBlocksByID(userID: string, senderID) {
    const userblocks = await this.prisma.userBlocks.findMany({
      where: {
        blockerId: userID,
        blockedUserId: senderID,
      }
    });
    const _userblocks = await this.prisma.userBlocks.findMany({
      where: {
        blockerId: senderID,
        blockedUserId: userID,
      }
    });

    const _ub = userblocks.concat(_userblocks);
    if (!userblocks)
      throw new BadRequestException;
    else
      return _ub;
  }
}
