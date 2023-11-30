import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { ListGameDto } from './dto/list-game.dto';
import { JwtAuthGuard } from 'src/auth/JwtAuthGuardian';
import { User } from 'src/user/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';

interface UserRequest extends Request {
  user: User;
}

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  create(
    @Body() createGameDto: CreateGameDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: UserRequest,
  ) {
    if (request.user.role !== 'ADMIN') {
      throw new UnauthorizedException();
    }
    return this.gamesService.create(createGameDto);
  }

  @Post('test')
  @UseInterceptors(FilesInterceptor('file'))
  teste(@Req() request: Request) {
    console.log(request);
  }

  @Get()
  findAll(): Promise<ListGameDto[]> {
    return this.gamesService.findAll();
  }

  @Get('not-rented')
  listGamesNotRented(): Promise<ListGameDto[]> {
    return this.gamesService.listGamesNotRented();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-games/:userId')
  listGamesByUserId(@Param('userId') userId: number) {
    return this.gamesService.listGamesByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gamesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() request: UserRequest) {
    if (request.user.role !== 'ADMIN') {
      throw new UnauthorizedException();
    }
    return this.gamesService.remove(id);
  }
}
