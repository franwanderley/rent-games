import { Module } from '@nestjs/common';
import { UserGameService } from './user-games.service';
import { UserGameController } from './user-games.controller';
import { UserGame } from './entities/user-game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Game } from '../games/entities/game.entity';
import { EmailService } from '../email/email.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserGame, User, Game]),
    ScheduleModule.forRoot(),
  ],
  controllers: [UserGameController],
  providers: [UserGameService, EmailService],
})
export class UserGameModule {}
