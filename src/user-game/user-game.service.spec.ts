import { Test, TestingModule } from '@nestjs/testing';
import { UserGameService } from './user-games.service';
import { Repository } from 'typeorm';
import { UserGame } from './entities/user-game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const userGameListed: UserGame = {
  active: true,
  beginDate: new Date(),
  endDate: new Date(),
  id: 2,
};

describe('UserGameService', () => {
  let service: UserGameService;
  let userGameRepository: Repository<UserGame>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGameService,
        {
          provide: getRepositoryToken(UserGame),
          useValue: {
            findBy: jest.fn().mockResolvedValue([userGameListed]),
          },
        },
      ],
    }).compile();

    userGameRepository = module.get<Repository<UserGame>>(
      getRepositoryToken(UserGame),
    );
    service = module.get<UserGameService>(UserGameService);
  });

  it('should be defined', () => {
    expect(userGameRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return userGame infindHasActive', async () => {
    const userGames = await service.findHasActive();
    expect(userGames).toEqual([userGameListed]);
  });
});
