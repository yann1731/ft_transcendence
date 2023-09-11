import { Module } from '@nestjs/common';
import { UserfriendshipService } from './userfriendship.service';
import { UserfriendshipController } from './userfriendship.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserblocksModule } from 'src/userblocks/userblocks.module';

@Module({
  controllers: [UserfriendshipController],
  providers: [UserfriendshipService],
  imports: [PrismaModule, UserblocksModule],
  exports: [UserfriendshipService]
})
export class UserfriendshipModule {}
