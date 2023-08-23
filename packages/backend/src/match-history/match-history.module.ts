import { Module } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';
import { MatchHistoryController } from './match-history.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MatchHistoryController],
  providers: [MatchHistoryService],
  imports: [PrismaModule]
})
export class MatchHistoryModule {}
