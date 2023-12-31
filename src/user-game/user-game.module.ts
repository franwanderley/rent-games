import { Module } from '@nestjs/common';
import { UserGameService } from './user-games.service';
import { UserGameController } from './user-games.controller';
import { UserGame } from './entities/user-game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Game } from 'src/games/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGame, User, Game])],
  controllers: [UserGameController],
  providers: [UserGameService],
})
export class UserGameModule {}
