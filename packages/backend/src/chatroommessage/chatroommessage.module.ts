import { Module } from '@nestjs/common';
import { ChatroommessageService } from './chatroommessage.service';
import { ChatroommessageController } from './chatroommessage.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  controllers: [ChatroommessageController],
  providers: [ChatroommessageService],
  imports: [PrismaModule]
})
export class ChatroommessageModule {}
