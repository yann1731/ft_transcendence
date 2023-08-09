import { Module } from '@nestjs/common';
import { UserblocksService } from './userblocks.service';
import { UserblocksController } from './userblocks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserblocksController],
  providers: [UserblocksService],
  imports: [PrismaModule],
  exports: [UserblocksService]
})
export class UserblocksModule {}
