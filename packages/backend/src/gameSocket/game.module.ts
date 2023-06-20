import { Module } from '@nestjs/common';
import { gameSocket } from './game.webSocketGateway';

@Module({
  providers: [gameSocket]
})
export class GameModule {}