import { Module } from '@nestjs/common';
import { ChatroomuserService } from './chatroomuser.service';
import { ChatroomuserController } from './chatroomuser.controller';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChatroomuserController],
  providers: [ChatroomuserService],
  imports: [PrismaModule],
  exports: [ChatroomuserService]
})
export class ChatroomuserModule {}
