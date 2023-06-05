import { Test, TestingModule } from '@nestjs/testing';
import { ChatroommessageController } from './chatroommessage.controller';
import { ChatroommessageService } from './chatroommessage.service';

describe('ChatroommessageController', () => {
  let controller: ChatroommessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroommessageController],
      providers: [ChatroommessageService],
    }).compile();

    controller = module.get<ChatroommessageController>(ChatroommessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
