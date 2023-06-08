import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatroommessageService } from './chatroommessage.service';
import { CreateChatroommessageDto } from './dto/create-chatroommessage.dto';
import { UpdateChatroommessageDto } from './dto/update-chatroommessage.dto';

@Controller('chatroommessage')
export class ChatroommessageController {
  constructor(private readonly chatroommessageService: ChatroommessageService) {}

  @Post()
  create(@Body() createChatroommessageDto: CreateChatroommessageDto) {
    return this.chatroommessageService.create(createChatroommessageDto);
  }

  @Get()
  findAll() {
    return this.chatroommessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatroommessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatroommessageDto: UpdateChatroommessageDto) {
    return this.chatroommessageService.update(+id, updateChatroommessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatroommessageService.remove(+id);
  }
}
