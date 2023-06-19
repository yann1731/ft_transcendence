import { Controller, Get, Param } from '@nestjs/common';
import { ChatroommessageService } from './chatroommessage.service';

@Controller('chatroommessage')
export class ChatroommessageController {
  constructor(private readonly chatroommessageService: ChatroommessageService) {}
  
  @Get(':chatroomId')
  findAll(@Param('chatroomId') chatroomId: string) {
    return this.chatroommessageService.findAll(chatroomId);
  }
}
