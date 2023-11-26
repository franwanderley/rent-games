import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserGameService } from './user-games.service';
import { CreateUserGameDto } from './dto/create-user-game.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuardian';

@Controller('user-game')
export class UserGameController {
  constructor(private readonly userGamesService: UserGameService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserGameDto: CreateUserGameDto) {
    return this.userGamesService.create(createUserGameDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findHasActive() {
    return this.userGamesService.findHasActive();
  }
}
