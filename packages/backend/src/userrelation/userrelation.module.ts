import { Module } from '@nestjs/common';
import { UserrelationService } from './userrelation.service';
import { UserrelationController } from './userrelation.controller';

@Module({
  controllers: [UserrelationController],
  providers: [UserrelationService]
})
export class UserrelationModule {}
