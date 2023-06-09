import { Injectable } from '@nestjs/common';
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
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({where: { id }} );
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return ;
  }

  remove(id: string) {
    return ;
  }
}
