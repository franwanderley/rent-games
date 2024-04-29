import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { ListGameDto } from './dto/list-game.dto';

const GameSaved: CreateGameDto = {
  img: 'https://example.com/',
  description: ' examples mock',
  key: '',
  name: 'example',
};

const GameListed: ListGameDto = {
  img: 'https://example.com/',
  description: ' examples mock',
  name: 'example',
  id: 2,
};

describe('GamesService', () => {
  let service: GamesService;
  let gameRepository: Repository<Game>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useValue: {
            save: jest.fn().mockResolvedValue(GameSaved),
            query: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(gameRepository).toBeDefined();
  });

  it('should be saved', async () => {
    const game = await service.create(GameSaved);
    expect(game).toEqual(GameSaved);
  });

  it('should return empty array in listGamesNotRented', async () => {
    const games = await service.listGamesNotRented();
    expect(games.length).toEqual(0);
  });

  it('should return games in listGamesNotRented', async () => {
    jest.spyOn(gameRepository, 'query').mockResolvedValue([GameListed]);
    const games = await service.listGamesNotRented();
    expect(games).toEqual([GameListed]);
  });
});
