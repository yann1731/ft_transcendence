import { Test, TestingModule } from '@nestjs/testing';
import { PrivatemessageController } from './privatemessage.controller';
import { PrivatemessageService } from './privatemessage.service';

describe('PrivatemessageController', () => {
  let controller: PrivatemessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivatemessageController],
      providers: [PrivatemessageService],
    }).compile();

    controller = module.get<PrivatemessageController>(PrivatemessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
