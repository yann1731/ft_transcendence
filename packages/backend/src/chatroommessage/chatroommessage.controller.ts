import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatroommessageService } from './chatroommessage.service';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('api/chatroommessage')
@UseGuards(TokenGuard)
export class ChatroommessageController {
  constructor(private readonly chatroommessageService: ChatroommessageService) {}
  
  @Get(':chatroomId')
  findAll(@Param('chatroomId') chatroomId: string) {
    return this.chatroommessageService.findAll(chatroomId);
  }
}
