import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatroomService } from 'src/chatroom/chatroom.service';

@Module({
  providers: [ChatGateway, ChatService, ChatroomService],
  imports: [PrismaModule],
})
export class ChatModule {}
