import { Test, TestingModule } from '@nestjs/testing';
import { UserfriendshipController } from './userfriendship.controller';
import { UserfriendshipService } from './userfriendship.service';

describe('UserfriendshipController', () => {
  let controller: UserfriendshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserfriendshipController],
      providers: [UserfriendshipService],
    }).compile();

    controller = module.get<UserfriendshipController>(UserfriendshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
