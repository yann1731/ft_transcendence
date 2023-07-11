import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';
import { TokenGuard } from 'src/guard/token.guard';

@UseGuards(TokenGuard)
@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Post("/password") //creates a new password protected chatroom with it's associated chatroomuser whose permission is set as owner
  createWithPass(@Body(new ValidationPipe({transform: true})) createPasswordChatroomDto: CreatePasswordChatroomDto) {
    return this.chatroomService.createWithPass(createPasswordChatroomDto);
  }

  @Post() //creates a new chatroom with it's associated chatroomuser whose permission is set as owner
  create(@Body(new ValidationPipe({transform: true})) createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }

  @Get() //returns all currently created chatrooms
  findAll() {
    return this.chatroomService.findAll();
  }

  @Get(':id') //returns single chatroom with id provided
  findOne(@Param('id') id: string) {
    return this.chatroomService.findOne(id);
  }

  @Get('/user/:id') //returns all users associated with chatroom with provided id
  findAllUsers(@Param('id') id: string) {
    return this.chatroomService.findAllUsers(id);
  }

  @Patch(':id') //update chatroom with provided id
  update(@Param('id') id: string, @Body() updateChatroomDto: UpdateChatroomDto) {
    return this.chatroomService.update(id, updateChatroomDto);
  }

  @Delete(':id') //deletes single chatroom with provided id
  remove(@Param('id') id: string) {
    return this.chatroomService.remove(id);
  }
}
