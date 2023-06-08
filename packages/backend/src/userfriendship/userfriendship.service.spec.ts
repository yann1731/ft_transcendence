import { Test, TestingModule } from '@nestjs/testing';
import { UserfriendshipService } from './userfriendship.service';

describe('UserfriendshipService', () => {
  let service: UserfriendshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserfriendshipService],
    }).compile();

    service = module.get<UserfriendshipService>(UserfriendshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
