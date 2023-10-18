import { Module } from '@nestjs/common';
import { UserblocksService } from './userblocks.service';
import { UserblocksController } from './userblocks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserblocksController],
  providers: [UserblocksService],
  imports: [PrismaModule, JwtModule],
  exports: [UserblocksService]
})
export class UserblocksModule {}
