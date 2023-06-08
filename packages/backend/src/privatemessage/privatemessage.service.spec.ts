import { Test, TestingModule } from '@nestjs/testing';
import { PrivatemessageService } from './privatemessage.service';

describe('PrivatemessageService', () => {
  let service: PrivatemessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivatemessageService],
    }).compile();

    service = module.get<PrivatemessageService>(PrivatemessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
