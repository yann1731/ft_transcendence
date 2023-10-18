import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomService],
  imports: [PrismaModule, JwtModule],
  exports: [ChatroomService]
})
export class ChatroomModule {}
