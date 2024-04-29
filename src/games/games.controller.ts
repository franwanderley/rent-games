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
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { JwtAuthGuard } from '../auth/JwtAuthGuardian';
import { User } from '../user/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

interface UserRequest extends Request {
  user: User;
}

interface FileRequest extends UserRequest {
  files: Express.Multer.File[];
}

@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly uploadService: UploadService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async create(
    @Body() createGameDto: CreateGameDto,
    @Req() request: FileRequest,
  ) {
    if (request.user.role !== 'ADMIN') {
      throw new UnauthorizedException();
    }
    createGameDto.img = await this.uploadService.uploadImage(
      request.files?.[0],
    );
    return this.gamesService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('not-rented')
  listGamesNotRented() {
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
