import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { ChatroomuserModule } from './chatroomuser/chatroomuser.module';
import { PrivatemessageModule } from './privatemessage/privatemessage.module';
import { ChatroommessageModule } from './chatroommessage/chatroommessage.module';
import { UserfriendshipModule } from './userfriendship/userfriendship.module';
import { UserblocksModule } from './userblocks/userblocks.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MatchHistoryModule } from './match-history/match-history.module';

@Module({
  imports: [ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    ChatroomModule,
    ChatroomuserModule,
    PrivatemessageModule,
    ChatroommessageModule,
    UserfriendshipModule,
    UserblocksModule,
    ChatModule,
    AuthModule,
    MatchHistoryModule]
})
export class AppModule {}
