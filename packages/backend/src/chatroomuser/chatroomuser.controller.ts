import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatroomuserService } from './chatroomuser.service';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('chatroomuser')
// @UseGuards(TokenGuard)
export class ChatroomuserController {
  constructor(private readonly chatroomuserService: ChatroomuserService) {}

  @Post() //create chatroomuser joined to particular user id and chatroom id
  create(@Body() createChatroomuserDto: CreateChatroomuserDto) {
    return this.chatroomuserService.create(createChatroomuserDto);
  }

  @Get() //returns all currently created chatroomusers
  findAll() {
    return this.chatroomuserService.findAll();
  }

  @Get(':id') //returns single chatroomuser by it's id
  findOne(@Param('id') id: string) {
    return this.chatroomuserService.findOne(id);
  }

  @Get('chatroom/:id') // returns all chatroomusers associated to the chatroomid
  findAllChatroomUsersByChatroomId(@Param('id') id: string) {
    return this.chatroomuserService.findAllChatroomUsersByChatroomId(id);
  }

  @Get('user/:id') //returns all chatroomusers associated to the user id
  findAllChatroomUsersByUserId(@Param('id') id: string) {
    return this.chatroomuserService.findAllChatroomUsersByUserId(id);
  }

  @Patch(':id') //updates chatroomuser by id
  update(@Param('id') id: string , @Body() updateChatroomuserDto: UpdateChatroomuserDto) {
    return this.chatroomuserService.update(id, updateChatroomuserDto);
  }

  @Delete(':id') //deletes single chatroomuser by id provided
  remove(@Param('id') id: string) {
    return this.chatroomuserService.remove(id);
  }
}
