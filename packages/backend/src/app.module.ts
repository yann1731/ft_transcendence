import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { ChatroomuserModule } from './chatroomuser/chatroomuser.module';
import { PrivatemessageModule } from './privatemessage/privatemessage.module';
import { ChatroommessageModule } from './chatroommessage/chatroommessage.module';
import { UserfriendshipModule } from './userfriendship/userfriendship.module';
import { UserblocksModule } from './userblocks/userblocks.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [PrismaModule, UserModule, ChatroomModule, ChatroomuserModule, PrivatemessageModule, ChatroommessageModule, UserfriendshipModule, UserblocksModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
