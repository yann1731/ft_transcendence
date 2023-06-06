import { Test, TestingModule } from '@nestjs/testing';
import { UserrelationController } from './userrelation.controller';
import { UserrelationService } from './userrelation.service';

describe('UserrelationController', () => {
  let controller: UserrelationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserrelationController],
      providers: [UserrelationService],
    }).compile();

    controller = module.get<UserrelationController>(UserrelationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
