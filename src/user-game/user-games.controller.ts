import { Controller, Post, Body } from '@nestjs/common';
import { UserGameService } from './user-games.service';
import { CreateUserGameDto } from './dto/create-user-game.dto';

@Controller('games')
export class UserGameController {
  constructor(private readonly userGamesService: UserGameService) {}

  @Post()
  create(@Body() createUserGameDto: CreateUserGameDto) {
    return this.userGamesService.create(createUserGameDto);
  }
}
