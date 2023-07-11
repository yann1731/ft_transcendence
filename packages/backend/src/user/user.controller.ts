import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { promises } from 'dns';
import { ValidationPipe } from '@nestjs/common';
import { TokenGuard } from 'src/guard/token.guard';


// {
//   backend   |   access_token: '00f40f4f0c636db7299e736096989fc918d4072690a83436112a3ac1b080cdc7',
//   backend   |   token_type: 'bearer',
//   backend   |   expires_in: 6706,
//   backend   |   refresh_token: '006fcf20b9c6c28c9b0cadb30bbcfb472e71e05bced0b4b7bf7feff21ce3e18c',
//   backend   |   scope: 'public',
//   backend   |   created_at: 1687800695,
//   backend   |   secret_valid_until: 1689348030
//   backend   |
// }
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body('code') code: string, @Body('refresh_token') refresh_token: string, @Body('expires_in') expires_in: number, @Body('created_at') created_at: number) { //creates a new user using token, refresh_token, expires_in and created_at. Also calls 42 api to get more info on user
    return this.userService.create(code, refresh_token, expires_in, created_at);
  }

  @Get() //returns all users
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id') //returns single user by id
  @UseGuards(TokenGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id') //updates single by id
  @UseGuards(TokenGuard)
  update(@Param('id') id: string, @Body(new ValidationPipe({ transform: true })) updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id') //deletes single user by id
  @UseGuards(TokenGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
