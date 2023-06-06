import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { UserrelationModule } from './userrelation/userrelation.module';

@Module({
  imports: [PrismaModule, ChatModule, UserModule, UserrelationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
