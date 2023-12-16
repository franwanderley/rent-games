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

  async create(createGameDto: CreateGameDto) {
    return this.gameRepository.save(createGameDto);
  }

  async listGamesNotRented() {
    const games: Array<Game> = await this.gameRepository.query(
      'SELECT g.* FROM game g WHERE NOT EXISTS (SELECT * FROM user_game WHERE user_game.game_id = g.id and user_game.active = true)',
    );
    return games?.map((game) => new ListGameDto(game));
  }

  async listGamesByUserId(userId: number) {
    const games: Array<Game> = await this.gameRepository.query(
      'select game.* from game, user_game where user_game.user_id = $1 and user_game.game_id = game.id',
      [userId],
    );
    return games?.map((game) => new ListGameDto(game));
  }

  async findAll() {
    const games: Game[] = await this.gameRepository.find();
    return games?.map((game) => new ListGameDto(game));
  }

  async findOne(id: number) {
    const game: Game | null = await this.gameRepository.findOneBy({ id });
    return game ? new ListGameDto(game) : null;
  }

  remove(id: number) {
    this.gameRepository.query(
      'delete from game g where g.id = $1 and not exists (select * from user_game where g.id = user_game.id)',
      [id],
    );
  }
}
