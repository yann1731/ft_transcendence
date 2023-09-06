import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { gameSocket } from './game.webSocketGateway';

@Module({
  providers: [gameSocket],
  imports: [UserModule]
})
export class GameModule {}