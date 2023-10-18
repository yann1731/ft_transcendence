import { Module } from '@nestjs/common';
import { PrivatemessageService } from './privatemessage.service';
import { PrivatemessageController } from './privatemessage.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PrivatemessageController],
  providers: [PrivatemessageService],
  imports: [PrismaModule, JwtModule],
  exports: [PrivatemessageService]
})
export class PrivatemessageModule {}
