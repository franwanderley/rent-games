import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { ListGameDto } from './dto/list-game.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuardian';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll(): Promise<ListGameDto[]> {
    return this.gamesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('not-rented')
  listGamesNotRented(@Req() request: any): Promise<ListGameDto[]> {
    console.log(request?.user);
    return this.gamesService.listGamesNotRented();
  }

  @Get('my-games/:userId')
  listGamesByUserId(@Param('userId') userId: number) {
    return this.gamesService.listGamesByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
