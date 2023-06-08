import { Test, TestingModule } from '@nestjs/testing';
import { UserblocksService } from './userblocks.service';

describe('UserblocksService', () => {
  let service: UserblocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserblocksService],
    }).compile();

    service = module.get<UserblocksService>(UserblocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
