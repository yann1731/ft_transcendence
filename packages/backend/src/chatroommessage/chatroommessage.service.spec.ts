import { Test, TestingModule } from '@nestjs/testing';
import { ChatroommessageService } from './chatroommessage.service';

describe('ChatroommessageService', () => {
  let service: ChatroommessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatroommessageService],
    }).compile();

    service = module.get<ChatroommessageService>(ChatroommessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
