import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { promises } from 'dns';
import { ValidationPipe } from '@nestjs/common';
import { TokenGuard } from 'src/guard/token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { meGuard } from 'src/guard/me.guard ';

@Controller('api/user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body('code') code: string) { //creates a new user using token, refresh_token, expires_in and created_at. Also calls 42 api to get more info on user
    try {
      const user = await this.userService.create(code);
      return user;
    } catch (error) {
      throw error
    }
  }

  @Get() //returns all users
  @UseGuards(TokenGuard)
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id') //returns single user by id
  @UseGuards(TokenGuard)
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('/me/:id')
  @UseGuards(meGuard)
  findMe(@Param('id') id: string) {
    try {
      return this.userService.findMe(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id') //updates single by id
  @UseGuards(TokenGuard)
  update(@Param('id') id: string, @Body(new ValidationPipe({ transform: true })) updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id') //deletes single user by id
  @UseGuards(TokenGuard)
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
