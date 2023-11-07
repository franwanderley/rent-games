import { Injectable } from '@nestjs/common';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGame } from './entities/user-game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserGameService {
  constructor(
    @InjectRepository(UserGame)
    private readonly userGameRepository: Repository<UserGame>,
  ) {}

  create(createUserGameDto: CreateUserGameDto) {
    return this.userGameRepository.save(createUserGameDto);
  }
}
