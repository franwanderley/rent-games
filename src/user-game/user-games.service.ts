import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Game } from 'src/games/entities/game.entity';
import { UserGame } from './entities/user-game.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserGameService {
  constructor(
    @InjectRepository(UserGame)
    private readonly userGameRepository: Repository<UserGame>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly emailService: EmailService,
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

    if (!game || !user) {
      throw new BadRequestException('Game or User not found');
    }
    const isRented = await this.isRented(game.id);
    if (isRented) {
      throw new BadRequestException('game is already rented');
    }

    const userGame: UserGame = new UserGame();
    userGame.endDate = dto?.endDate;
    game && (userGame.game = game);
    user && (userGame.user = user);
    this.emailService.sendEmailKey(userGame);
    return this.userGameRepository.save(userGame);
  }

  async isRented(id: number) {
    const game: Array<Game> = await this.gameRepository.query(
      'SELECT g.* FROM game g WHERE g.id = $1 AND EXISTS (SELECT * FROM user_game WHERE user_game.game_id = g.id and user_game.active = true)',
      [id],
    );
    return game?.length;
  }
}
