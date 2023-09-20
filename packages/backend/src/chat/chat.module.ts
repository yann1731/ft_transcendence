import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatroommessageService } from 'src/chatroommessage/chatroommessage.service';
import { ChatroommessageModule } from 'src/chatroommessage/chatroommessage.module';
import { UserModule } from 'src/user/user.module';
import { PrivatemessageModule } from 'src/privatemessage/privatemessage.module';
import { ChatroomuserModule } from 'src/chatroomuser/chatroomuser.module';
import { UserblocksModule } from 'src/userblocks/userblocks.module';
import { ChatroomModule } from 'src/chatroom/chatroom.module';
import { UserfriendshipModule } from 'src/userfriendship/userfriendship.module';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [PrismaModule, ChatroommessageModule, UserModule, PrivatemessageModule, ChatroomuserModule, UserblocksModule, ChatroomModule, UserfriendshipModule],
})
export class ChatModule {}
