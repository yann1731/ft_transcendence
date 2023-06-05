import { Module } from '@nestjs/common';
import { UserfriendshipService } from './userfriendship.service';
import { UserfriendshipController } from './userfriendship.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserfriendshipController],
  providers: [UserfriendshipService],
  imports: [PrismaModule]
})
export class UserfriendshipModule {}
