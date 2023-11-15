import { Injectable } from '@nestjs/common';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Game } from 'src/games/entities/game.entity';
import { UserGame } from './entities/user-game.entity';

@Injectable()
export class UserGameService {
  constructor(
    @InjectRepository(UserGame)
    private readonly userGameRepository: Repository<UserGame>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  findHasActive() {
    return this.userGameRepository.findBy({ active: true });
  }

  async create(dto: CreateUserGameDto) {
    const user: User | null = await this.userRepository.findOneBy({
      id: dto?.userId,
    });
    const game: Game | null = await this.gameRepository.findOneBy({
      id: dto?.gameId,
    });
    const userGame: UserGame = new UserGame();
    userGame.endDate = dto?.endDate;
    game && (userGame.game = game);
    user && (userGame.user = user);
    return this.userGameRepository.save(userGame);
  }
}
