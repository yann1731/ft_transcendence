import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'class-validator';
import axios from 'axios';
import { onlineStatus } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService { //creates a new user
  constructor(private prisma: PrismaService, private auth: AuthService) { }

  

  async create(code: string) { //creates a new user using token, refresh_token, expires_in and created_at. Also calls 42 api to get more info on user
	const uid: string =  process.env.UID;
    const secret: string = process.env.SECRET;
    const port: string = process.env.FRONTEND_PORT
    const ip: string = process.env.IP

	try {
		const Token42 = await axios.post('https://api.intra.42.fr/oauth/token', {
			grant_type: 'authorization_code',
            client_id: uid,
            client_secret: secret,
            redirect_uri: "http://" + ip + ":" + port + "/wait", 
            code: code
        });

        const UserData = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: `Bearer ${Token42.data.access_token}`
            }
        });
		
        const check = await this.prisma.user.findUnique({
            where: {
                username: UserData.data.login
            }
		})
        const tokens = await this.auth.generateToken(UserData.data.id);

        if (!check){
            const user = await this.prisma.user.create({
                data: {
                    email: UserData.data.email, 
                    refresh_token: tokens.refresh,
                    username: UserData.data.login,
                    nickname: UserData.data.login,
                    avatar: UserData.data.image.link,
                }
            });
            
            const final = { ...user, token: tokens.access, refresh_token: tokens.refresh};
            return final;
        } 
		else {

			await this.prisma.user.update({
				where: { id: check.id },
				data: {
					refresh_token: tokens.refresh
			}})

			const final = { ...check, token: tokens.access, refresh_token: tokens.refresh };
			return final;
		}

    } catch (error) {
        throw error;
    }
  }

  async findAll() { //returns a list of all users
	try {
		const user = await this.prisma.user.findMany({
				select: {
					id: true,
					socketID: true,
					avatar: true,
					username: true,
					nickname: true,
					win: true,
					loss: true,
					gamesPlayed: true,
					userStatus: true,
				}
			}
		);
		if (!user)
			throw new BadRequestException('Could not fetch users');
		return user;	
	} catch (error) {
		console.error(error);
		throw error;
	}
  }

  async findOne(id: string) { //returns one user by id
	try {
		const user = await this.prisma.user.findUnique({where: { id },
			select: {
				id: true,
				socketID: true,
				avatar: true,
				username: true,
				nickname: true,
				win: true,
				loss: true,
				gamesPlayed: true,
				userStatus: true,
			}} );
		if (!user)
		  throw new BadRequestException('Could not find specified user');
		return user;	
	} catch (error) {
		console.error(error);
		throw error;
	}
  }

  async findMe(id: string) { //returns one user by id
	try {
		const user = await this.prisma.user.findUnique({where: { id }} );
		if (!user)
		  throw new BadRequestException('Could not find specified user');
		return user;	
	} catch (error) {
		console.error(error);
		throw error;
	}
  }

  async findUsername(username: string) {
	try {
		const user = await this.prisma.user.findUnique(
			{where: {username},
			select: {
				id: true,
				socketID: true,
				avatar: true,
				username: true,
				nickname: true,
				win: true,
				loss: true,
				gamesPlayed: true,
				userStatus: true,
			}});
		if (!user)
			throw new BadRequestException('Could not find specified user');
		return user;	
	} catch (error) {
		console.error(error);
		throw error;
	}
  }

  async findBySocketID(socketID: string) {
	try {
		const user = await this.prisma.user.findFirst({
			where: {
				socketID: socketID,
			},
			select: {
				id: true,
				socketID: true,
				avatar: true,
				username: true,
				nickname: true,
				win: true,
				loss: true,
				gamesPlayed: true,
				userStatus: true,
			}
		});
		return (user);
	} catch (error) {
		console.error(error);
		throw (BadRequestException);
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
		console.error(error);
		throw error;
	}
  }

  async updateSocketID(_socketID: string, id: string) {
	if (id === undefined) {
		return;
	}
	try {
		const _updatedUser = await this.prisma.user.update({
		  where: {
			id: id,
		  },
		  data: {
			socketID: _socketID,
		  }
		});
	} catch (error) {
		console.error(error);
	}
  }

  async updateStatus(_status: onlineStatus, id: string) {
	if (id === undefined) {
		return;
	}
	try {
		await this.prisma.user.update({
		  where: {
			id: id,
		  },
		  data: {
			userStatus: _status,
		  }
		});
	} catch (error) {
		console.error(error);
	}
  }

  async remove(id: string) { //removes a specific user by id
	try {
		return await this.prisma.user.delete({where: {id}});
	} catch (error) {
		console.error(error);
		throw error;
	}
  }
}
