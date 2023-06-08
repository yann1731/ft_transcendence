import { Module } from '@nestjs/common';
import { ChatroomuserService } from './chatroomuser.service';
import { ChatroomuserController } from './chatroomuser.controller';

@Module({
  controllers: [ChatroomuserController],
  providers: [ChatroomuserService]
})
export class ChatroomuserModule {}
