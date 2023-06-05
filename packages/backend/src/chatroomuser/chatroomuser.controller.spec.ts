import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomuserController } from './chatroomuser.controller';
import { ChatroomuserService } from './chatroomuser.service';

describe('ChatroomuserController', () => {
  let controller: ChatroomuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomuserController],
      providers: [ChatroomuserService],
    }).compile();

    controller = module.get<ChatroomuserController>(ChatroomuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
