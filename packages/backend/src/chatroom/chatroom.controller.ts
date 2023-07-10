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

  @Post("/password")
  createWithPass(@Body(new ValidationPipe({transform: true})) createPasswordChatroomDto: CreatePasswordChatroomDto) {
    return this.chatroomService.createWithPass(createPasswordChatroomDto);
  }

  @Post()
  create(@Body(new ValidationPipe({transform: true})) createChatroomDto: CreateChatroomDto) {
    return this.chatroomService.create(createChatroomDto);
  }

  @Get()
  findAll() {
    return this.chatroomService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.chatroomService.findOne(name);
  }

  @Get('/user/:id')
  findAllUsers(@Param('id') id: string) {
    return this.chatroomService.findAllUsers(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatroomDto: UpdateChatroomDto) {
    return this.chatroomService.update(id, updateChatroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomService.remove(id);
  }
}
