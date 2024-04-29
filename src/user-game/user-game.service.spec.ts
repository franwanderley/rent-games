import { Test, TestingModule } from '@nestjs/testing';
import { UserGameService } from './user-games.service';
import { Repository } from 'typeorm';
import { UserGame } from './entities/user-game.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Game } from '../games/entities/game.entity';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { EmailService } from '../email/email.service';

const userGameListed: UserGame = {
  active: true,
  beginDate: new Date(),
  endDate: new Date(),
  id: 2,
  game: {
    id: 1,
    name: 'Teste',
    img: 'teste',
    description: 'teste',
    key: 'teste',
  },
};

const userGameCreated: CreateUserGameDto = {
  endDate: new Date(),
  gameId: 1,
  userId: 1,
};

const user: User = {
  id: 1,
  name: 'Teste',
  email: '',
  role: 'USER',
  password: '',
};

const game: Game = {
  id: 1,
  name: 'Teste',
  img: '',
  description: '',
  key: '',
};

describe('UserGameService', () => {
  let service: UserGameService;
  let userGameRepository: Repository<UserGame>;
  let userRepository: Repository<User>;
  let gameRepository: Repository<Game>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserGameService,
        {
          provide: getRepositoryToken(UserGame),
          useValue: {
            findBy: jest.fn().mockResolvedValue([userGameListed]),
            save: jest.fn().mockResolvedValue(userGameListed),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: getRepositoryToken(Game),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(game),
            query: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendEmailKey: jest.fn(),
          },
        },
      ],
    }).compile();

    userGameRepository = module.get<Repository<UserGame>>(
      getRepositoryToken(UserGame),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    gameRepository = module.get<Repository<Game>>(getRepositoryToken(Game));
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

  it('should create user game', async () => {
    const userGame = await service.create(userGameCreated);
    expect(userRepository.findOneBy).toHaveBeenCalled();
    expect(gameRepository.query).toHaveBeenCalled();
    expect(userGame.game?.id).toEqual(1);
  });

  it('should create user game return exception', async () => {
    jest.spyOn(gameRepository, 'findOneBy').mockResolvedValue(null);
    expect(service.create(userGameCreated)).rejects.toThrow(
      'Game or User not found',
    );
  });
});
