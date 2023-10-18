import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/chatroom')
@ApiTags('chatroom')
@UseGuards(TokenGuard)
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post("/password") //creates a new password protected chatroom with it's associated chatroomuser whose permission is set as owner
  createWithPass(@Body(new ValidationPipe({transform: true})) createPasswordChatroomDto: CreatePasswordChatroomDto) {
    try {
      return this.chatroomService.createWithPass(createPasswordChatroomDto);
    } catch (error) {
      throw error;
    }
  }

  @Post() //creates a new chatroom with it's associated chatroomuser whose permission is set as owner
  create(@Body(new ValidationPipe({transform: true})) createChatroomDto: CreateChatroomDto) {
    try {
      return this.chatroomService.create(createChatroomDto);
    } catch (error) {
      throw error;
    }
  }

  @Get() //returns all currently created chatrooms
  findAll() {
    try {
      return this.chatroomService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id') //returns single chatroom with id provided
  findOne(@Param('id') id: string) {
    try {
      return this.chatroomService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('/users/:chatroomId') //returns all users associated with chatroom with provided id
  findAllUsers(@Param('chatroomId') chatroomId: string) {
    try {
      return this.chatroomService.findAllUsers(chatroomId);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id') //update chatroom with provided id
  update(@Param('id') id: string, @Body() updateChatroomDto: UpdateChatroomDto) {
    try {
      return this.chatroomService.update(id, updateChatroomDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id') //deletes single chatroom with provided id
  remove(@Param('id') id: string) {
    try {
      return this.chatroomService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
