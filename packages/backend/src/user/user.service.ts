import { BadRequestException, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserPassDto } from './dto/update-userPass.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2'
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const errors = await validate(createUserDto);
    console.log(errors);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

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
    const user = await this.prisma.user.findMany();
    if (!user)
      throw new BadRequestException;
    else
      return user;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({where: { id }} );
    if (!user)
      throw new ForbiddenException;
    else
      return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const errors = await validate(updateUserDto);
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

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

  async updatePass(id: string, updateUserPassDto: UpdateUserPassDto) {

    const errors = await validate(updateUserPassDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const hashedPass = await argon2.hash(updateUserPassDto.password);
    const user = await this.prisma.user.update({where: 
    { id },
    data: {
        password: hashedPass
    }
    });
    if (!user)
      throw new BadRequestException;
    else
      return user;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({where: {id}});
  }
}
