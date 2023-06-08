import { Module } from '@nestjs/common';
import { ChatroommessageService } from './chatroommessage.service';
import { ChatroommessageController } from './chatroommessage.controller';

@Module({
  controllers: [ChatroommessageController],
  providers: [ChatroommessageService]
})
export class ChatroommessageModule {}
