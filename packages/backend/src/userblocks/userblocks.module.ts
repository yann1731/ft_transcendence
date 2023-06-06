import { Module } from '@nestjs/common';
import { UserblocksService } from './userblocks.service';
import { UserblocksController } from './userblocks.controller';

@Module({
  controllers: [UserblocksController],
  providers: [UserblocksService]
})
export class UserblocksModule {}
