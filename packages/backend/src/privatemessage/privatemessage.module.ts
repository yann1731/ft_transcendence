import { Module } from '@nestjs/common';
import { PrivatemessageService } from './privatemessage.service';
import { PrivatemessageController } from './privatemessage.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PrivatemessageController],
  providers: [PrivatemessageService],
  imports: [PrismaModule],
  exports: [PrivatemessageService]
})
export class PrivatemessageModule {}
