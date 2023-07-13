import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PrivatemessageService } from './privatemessage.service';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('privatemessage')
// @UseGuards(TokenGuard)
export class PrivatemessageController {
  constructor(private readonly privatemessageService: PrivatemessageService) {}

  @Get(':senderId/:recipientId') //returns all private messages between 2 users
  findAll(@Param() params: {senderId: string, recipientId: string}) {
    return this.privatemessageService.findAll(params.senderId, params.recipientId);
  }
}
