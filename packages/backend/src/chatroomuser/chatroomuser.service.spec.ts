import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomuserService } from './chatroomuser.service';

describe('ChatroomuserService', () => {
  let service: ChatroomuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatroomuserService],
    }).compile();

    service = module.get<ChatroomuserService>(ChatroomuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
