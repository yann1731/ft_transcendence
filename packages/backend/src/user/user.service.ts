import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    const user = new CreateUserDto;

    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.username = createUserDto.username;

    return user;
  }

  findAll() {
    return this.prisma.user.findMany;
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
