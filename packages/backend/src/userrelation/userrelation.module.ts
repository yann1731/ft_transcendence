import { Module } from '@nestjs/common';
import { UserrelationService } from './userrelation.service';
import { UserrelationController } from './userrelation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserrelationController],
  providers: [UserrelationService],
  imports: [PrismaModule]
})
export class UserrelationModule {}
