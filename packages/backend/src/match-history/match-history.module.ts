import { Module } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';
import { MatchHistoryController } from './match-history.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [MatchHistoryController],
  providers: [MatchHistoryService],
  imports: [PrismaModule, JwtModule]
})
export class MatchHistoryModule {}
