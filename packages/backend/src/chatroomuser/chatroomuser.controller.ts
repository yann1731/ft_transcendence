import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatroomuserService } from './chatroomuser.service';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';

@Controller('chatroomuser')
export class ChatroomuserController {
  constructor(private readonly chatroomuserService: ChatroomuserService) {}

  @Post()
  create(@Body() createChatroomuserDto: CreateChatroomuserDto) {
    return this.chatroomuserService.create(createChatroomuserDto);
  }

  @Get()
  findAll() {
    return this.chatroomuserService.findAll();
  }

  @Get(':userId/:chatroomId')
  findOne(@Param() params: {userId: string, chatroomId: string}) {
    return this.chatroomuserService.findOne(params.userId, params.chatroomId);
  }

  @Patch(':userId/:chatroomId')
  update(@Param() params: {userId: string, chatroomId: string}, @Body() updateChatroomuserDto: UpdateChatroomuserDto) {
    return this.chatroomuserService.update(params.userId, params.chatroomId, updateChatroomuserDto);
  }

  @Delete(':userId/:chatroomId')
  remove(@Param() params: {userId: string, chatroomId: string}) {
    return this.chatroomuserService.remove(params.userId, params.chatroomId);
  }
}
