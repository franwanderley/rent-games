import { Test, TestingModule } from '@nestjs/testing';
import { UserGameController } from './user-games.controller';
import { UserGameService } from './user-game.service';

describe('UserGameController', () => {
  let controller: UserGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGameController],
      providers: [UserGameService],
    }).compile();

    controller = module.get<UserGameController>(UserGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
