import { Controller, Get, Param } from '@nestjs/common';
import { PrivatemessageService } from './privatemessage.service';

@Controller('privatemessage')
export class PrivatemessageController {
  constructor(private readonly privatemessageService: PrivatemessageService) {}

  @Get(':senderId/:recipientId') //returns all private messages between 2 users
  findAll(@Param() params: {senderId: string, recipientId: string}) {
    return this.privatemessageService.findAll(params.senderId, params.recipientId);
  }
}
