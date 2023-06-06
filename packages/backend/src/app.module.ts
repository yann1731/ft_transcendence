import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { UserrelationModule } from './userrelation/userrelation.module';
import { ChatroomService } from './chatroom/chatroom.service';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [PrismaModule, ChatModule, UserModule, UserrelationModule, ChatroomModule],
  controllers: [AppController],
  providers: [AppService, ChatroomService],
})
export class AppModule {}
