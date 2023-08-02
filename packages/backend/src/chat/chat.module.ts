import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { ChatroomuserService } from 'src/chatroomuser/chatroomuser.service';
@Module({
  providers: [ChatGateway, ChatService, ChatroomService, ChatroomuserService],
  imports: [PrismaModule]
})
export class ChatModule {}
