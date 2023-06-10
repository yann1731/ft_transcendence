import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPass = await argon2.hash(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPass,
        username: createUserDto.username
      }
    });
    if (!user)
      throw new ForbiddenException;
    else
      return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({where: { id }} );
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        avatar: updateUserDto.avatar,
        username: updateUserDto.username,
        email: updateUserDto.email,
        win: updateUserDto.win,
        loss: updateUserDto.loss,
        gamesPlayed: updateUserDto.gamesPlayed,
        userStatus: updateUserDto.userStatus,
        twoFaEnabled: updateUserDto.twoFaEnabled
      }
    });
    if (!user)
      throw new ForbiddenException;
    else
      return user;
  }

  async remove(id: string) {
    return this.prisma.user.delete({where: {id}});
  }
}
