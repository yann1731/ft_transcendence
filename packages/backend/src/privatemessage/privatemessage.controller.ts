import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivatemessageService } from './privatemessage.service';
import { CreatePrivatemessageDto } from './dto/create-privatemessage.dto';
import { ParamsTokenFactory } from '@nestjs/core/pipes';

@Controller('privatemessage')
export class PrivatemessageController {
  constructor(private readonly privatemessageService: PrivatemessageService) {}

  @Post()
  create(@Body() createPrivatemessageDto: CreatePrivatemessageDto) {
    return this.privatemessageService.create(createPrivatemessageDto);
  }

  @Get(':senderId/:recipientId')
  findAll(@Param() params) {
    return this.privatemessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privatemessageService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privatemessageService.remove(id);
  }
}
