import { Module } from '@nestjs/common';
import { UserfriendshipService } from './userfriendship.service';
import { UserfriendshipController } from './userfriendship.controller';

@Module({
  controllers: [UserfriendshipController],
  providers: [UserfriendshipService]
})
export class UserfriendshipModule {}
