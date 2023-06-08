import { Test, TestingModule } from '@nestjs/testing';
import { UserblocksController } from './userblocks.controller';
import { UserblocksService } from './userblocks.service';

describe('UserblocksController', () => {
  let controller: UserblocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserblocksController],
      providers: [UserblocksService],
    }).compile();

    controller = module.get<UserblocksController>(UserblocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
