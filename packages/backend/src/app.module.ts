import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { ChatroomuserModule } from './chatroomuser/chatroomuser.module';
import { PrivatemessageModule } from './privatemessage/privatemessage.module';
import { ChatroommessageModule } from './chatroommessage/chatroommessage.module';
import { UserfriendshipModule } from './userfriendship/userfriendship.module';
import { UserblocksModule } from './userblocks/userblocks.module';

@Module({
  imports: [PrismaModule, ChatModule, UserModule, ChatroomModule, ChatroomuserModule, PrivatemessageModule, ChatroommessageModule, UserfriendshipModule, UserblocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
