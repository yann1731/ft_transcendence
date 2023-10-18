import { Module } from '@nestjs/common';
import { ChatroomuserService } from './chatroomuser.service';
import { ChatroomuserController } from './chatroomuser.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ChatroomuserController],
  providers: [ChatroomuserService],
  imports: [PrismaModule, JwtModule],
  exports: [ChatroomuserService]
})
export class ChatroomuserModule {}
