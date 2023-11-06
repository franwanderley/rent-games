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
