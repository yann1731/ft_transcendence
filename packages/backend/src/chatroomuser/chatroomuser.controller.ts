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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroomuserService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string , @Body() updateChatroomuserDto: UpdateChatroomuserDto) {
    return this.chatroomuserService.update(id, updateChatroomuserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroomuserService.remove(id);
  }
}