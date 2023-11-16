import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { ListGameDto } from './dto/list-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.gameRepository.save(createGameDto);
  }

  listGamesNotRented(): Promise<ListGameDto[]> {
    return this.gameRepository.query(
      'SELECT g.* FROM game g WHERE NOT EXISTS (SELECT * FROM user_game WHERE user_game.game_id = g.id and user_game.active = true)',
    );
  }

  listGamesByUserId(userId: number) {
    return this.gameRepository.query(
      'select game.* from game, user_game where user_game.user_id = $1 and user_game.game_id = game.id',
      [userId],
    );
  }

  findAll(): Promise<ListGameDto[]> {
    return this.gameRepository.find();
  }

  findOne(id: number): Promise<ListGameDto | null> {
    return this.gameRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.gameRepository.delete({ id });
  }
}
