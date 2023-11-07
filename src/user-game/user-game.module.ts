import { Module } from '@nestjs/common';
import { UserGameService } from './user-games.service';
import { UserGameController } from './user-games.controller';
import { UserGame } from './entities/user-game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserGame])],
  controllers: [UserGameController],
  providers: [UserGameService],
})
export class UserGameModule {}
