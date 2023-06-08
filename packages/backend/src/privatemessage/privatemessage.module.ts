import { Module } from '@nestjs/common';
import { PrivatemessageService } from './privatemessage.service';
import { PrivatemessageController } from './privatemessage.controller';

@Module({
  controllers: [PrivatemessageController],
  providers: [PrivatemessageService]
})
export class PrivatemessageModule {}
