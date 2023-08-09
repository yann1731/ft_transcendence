import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'class-validator';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime';

@Injectable()
export class UserService { //creates a new user
  constructor(private prisma: PrismaService) { }

  async create(code: string, refresh_token: string, expires_in: number, created_at: number) { //creates a new user using token, refresh_token, expires_in and created_at. Also calls 42 api to get more info on user
	try {
		const response = await axios.get('https://api.intra.42.fr/v2/me', {
			headers: {
			  Authorization: `Bearer ${code}`
			}
		});
	  
		const check = await this.prisma.user.findUnique({where: {
			username: response.data.login
		}});
	  
		if (!check) {
			const user = await this.prisma.user.create({
				data: {
					email: response.data.email, 
					refresh_token: refresh_token,
					username: response.data.login,
					nickname: response.data.login,
					avatar: response.data.image.link,
					token: code,
					token_expires_in: expires_in,
					token_created_at: created_at,
					token_expires_at: created_at + expires_in
				}
			});
			if (!user) {
				throw new BadRequestException('Could not create user');
			}
			return user;
		}
		else
			return check; 
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findAll() { //returns a list of all users
	try {
		const user = await this.prisma.user.findMany();
		if (!user)
			throw new BadRequestException('Could not fetch users');
		return user;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findOne(id: string) { //returns one user by id
	try {
		const user = await this.prisma.user.findUnique({where: { id }} );
		if (!user)
		  throw new BadRequestException('Could not find specified user');
		return user;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async findUsername(username: string) {
	try {
		const user = await this.prisma.user.findUnique({where: {username}});
		if (!user)
			throw new BadRequestException('Could not find specified user');
		return user;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async update(id: string, updateUserDto: UpdateUserDto) { //updates all the information of a user except the password. All the fields are optional
	try {
		const errors = await validate(updateUserDto);
		if (errors.length > 0) {
			throw new BadRequestException("Invalid information provided");
		}
		const user = await this.prisma.user.update({
		  where: {
			id
		  },
		  data: {
			avatar: updateUserDto.avatar,
			username: updateUserDto.username,
			nickname: updateUserDto.nickname,
			email: updateUserDto.email,
			win: updateUserDto.win,
			loss: updateUserDto.loss,
			gamesPlayed: updateUserDto.gamesPlayed,
			userStatus: updateUserDto.userStatus,
			twoFaEnabled: updateUserDto.twoFaEnabled,
			twoFaSecret: updateUserDto.twoFaSecret,
			refresh_token: updateUserDto.refresh_token
		  }
		});
		if (!user)
			throw new BadRequestException('Could not create user');
		return user;	
	} catch (error) {
		console.log(error);
		throw error;
	}
  }

  async updateSocketID(_socketID: string, _username: string) {
    const _updatedUser = await this.prisma.user.update({
      where: {
        username: _username,
      },
      data: {
        socketID: _socketID,
      }
    })
    console.log("socketID: " + _updatedUser.socketID);
  }

  async remove(id: string) { //removes a specific user by id
	try {
		return await this.prisma.user.delete({where: {id}});
	} catch (error) {
		console.log(error);
		throw error;
	}
  }
}
