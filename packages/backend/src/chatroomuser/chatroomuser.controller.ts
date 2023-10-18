import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatroomuserService } from './chatroomuser.service';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
import { CreateChatroomuserPassDto } from './dto/create-chatroomuserpass.dto';
import { BanChatroomuserDto } from './dto/ban-chatroomuser.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/chatroomuser')
@ApiTags('chatroomuser')
@UseGuards(TokenGuard)
export class ChatroomuserController {
  constructor(private readonly chatroomuserService: ChatroomuserService) {}

  @Post() //create chatroomuser joined to particular user id and chatroom id
  create(@Body() createChatroomuserDto: CreateChatroomuserDto) {
    try {
      return this.chatroomuserService.create(createChatroomuserDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('/password')
  createPass(@Body() createChatroomuserpassDto: CreateChatroomuserPassDto) {
    try {
      return this.chatroomuserService.createPass(createChatroomuserpassDto);
    } catch (error) {
      throw error;
    }
  }

  @Get() //returns all currently created chatroomusers
  findAll() {
    try {
      return this.chatroomuserService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id') //returns single chatroomuser by it's id
  findOne(@Param('id') id: string) {
    try {
      return this.chatroomuserService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('chatroom/:id') // returns all chatroomusers associated to the chatroomid
  findAllChatroomUsersByChatroomId(@Param('id') id: string) {
    try {
      return this.chatroomuserService.findAllChatroomUsersByChatroomId(id);
    } catch (error) {
      throw error;
    }
    
  }

  @Get('user/:id') //returns all chatroomusers associated to the user id
  findAllChatroomUsersByUserId(@Param('id') id: string) {
    try {
      return this.chatroomuserService.findAllChatroomUsersByUserId(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id') //updates chatroomuser by id
  update(@Param('id') id: string , @Body() updateChatroomuserDto: UpdateChatroomuserDto) {
    try {
      return this.chatroomuserService.update(id, updateChatroomuserDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id') //deletes single chatroomuser by id provided
  remove(@Param('id') id: string) {
    try {
      return this.chatroomuserService.remove(id);
    } catch (error) {
      throw error;
    }
  }

  @Post('ban/:id') //ban and deletes single chatroomuser by id provided
  ban(@Param('id') id: string, @Body() banChatroomuserDto: BanChatroomuserDto) {
    try {
      return this.chatroomuserService.ban(id, banChatroomuserDto);
    } catch (error) {
      throw error;
    }
  }
}
