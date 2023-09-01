import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserfriendshipService {
  constructor(private prisma: PrismaService) {}

  async create(createUserfriendshipDto: CreateUserfriendshipDto) { //creates a friendship relationship between a pair of users
	try {
		const check = await this.prisma.userFriendship.findMany({
			where: {
				OR: [
				  {
					userAId: createUserfriendshipDto.userAId,
					userBId: createUserfriendshipDto.userBId
				  },
				  {
					userAId: createUserfriendshipDto.userBId,
					userBId: createUserfriendshipDto.userAId
				  }
				]
			  }});
	
		if (check)
			  throw new InternalServerErrorException('userfriendship already created');

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
			throw new BadRequestException('Could not create user friendship');
		return userfriendship;
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findAll() { //returns all friendship pairs
	try {
		return await this.prisma.userFriendship.findMany();	
	} catch (error) {
		console.log(error);
		throw new InternalServerErrorException('Something went wrong getting user friendships');
	}
  }

  async findAllUF(id: string) {
	try {
		const userfriendships = await this.prisma.userFriendship.findMany({
			where: {
			  OR: [
				{ userAId: id },
				{ userBId: id }
			  ]
			}
		});
		return userfriendships;	
	} catch (error) {
		console.log(error);
		throw new InternalServerErrorException('Something went wrong getting user friendships with specified user id');
	}
  }

  async findOne(id: string) { //returns a friendship pair by id
	try {
		const userfriendship = await this.prisma.userFriendship.findUnique({where: { id }});
		if (!userfriendship)
			throw new BadRequestException;
		return userfriendship;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async remove(id: string) { //removes a friendship pair from the database
	try {
		const deluf = await this.prisma.userFriendship.delete({where: { id }});
		if (!deluf)
			throw new BadRequestException('Could not delete specified user');
		return deluf;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }
}
