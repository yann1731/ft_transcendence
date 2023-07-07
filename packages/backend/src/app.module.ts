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
import { GameModule } from './gameSocket/game.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path';

@Module({
  imports: [PrismaModule, UserModule, ChatroomModule, ChatroomuserModule, PrivatemessageModule, ChatroommessageModule, UserfriendshipModule, UserblocksModule, ChatModule, AuthModule, GameModule, 
  ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'build')})]
})
export class AppModule {}
