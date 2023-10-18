import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserblocksService } from 'src/userblocks/userblocks.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserfriendshipService {
  constructor(private prisma: PrismaService, private readonly userblocksService: UserblocksService, private userService: UserService) {}

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
	
		if (check.length !== 0)
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
		console.error(error);
		throw error;
	}
  }

  async findAll() { //returns all friendship pairs
	try {
		return await this.prisma.userFriendship.findMany();	
	} catch (error) {
		console.error(error);
		throw new InternalServerErrorException('Something went wrong getting user friendships');
	}
  }

  async blockExists(userID: string, senderID: string) {
    const _user = await this.prisma.user.findUnique({
      where: {
        id: userID,
      },
      include: {
        blockedUsers: true,
        blockedBy: true
      }
    });
    for (const b of _user.blockedUsers) {
      if (b.blockedUserId === senderID) {
        return (true);
      }
    }
    for (const b of _user.blockedBy) {
      if (b.blockerId === senderID) {
        return (true);
      }
    }
    return (false);
  }

  async findAllUF(id: string) {
	try {
		const userfriendships = await this.prisma.userFriendship.findMany({
			where: {
			  OR: [
				{ userAId: id },
				{ userBId: id }
			  ]
			},
			include: {
				userA: true,
				userB: true
			}
		});

		const ufs: User[] = [];
		for (const uf of userfriendships) {
			if (uf.userA.id !== id) {
				if (await this.blockExists(id, uf.userA.id) === false)
					ufs.push(uf.userA);
			}
			if (uf.userB.id !== id) {
				if (await this.blockExists(id, uf.userB.id) === false)
					ufs.push(uf.userB);
			}
		}
		const users: any[] = [];
		for (const user of ufs){
			users.push(await this.userService.findOne(user.id))
		}	
		return users
	} catch (error) {
		console.error(error);
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
		console.error(error);
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
		console.error(error);
		throw error;
	}
  }
}
