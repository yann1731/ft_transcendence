import { Test, TestingModule } from '@nestjs/testing';
import { UserrelationService } from './userrelation.service';

describe('UserrelationService', () => {
  let service: UserrelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserrelationService],
    }).compile();

    service = module.get<UserrelationService>(UserrelationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
