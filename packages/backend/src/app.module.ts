import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [PrismaModule, ChatModule, UserModule, ChatroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
