import { Test, TestingModule } from '@nestjs/testing';
import { UserGameService } from './user-game.service';

describe('UserGameService', () => {
  let service: UserGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGameService],
    }).compile();

    service = module.get<UserGameService>(UserGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
