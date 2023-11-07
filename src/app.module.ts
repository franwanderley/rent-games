import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';
import { UserGameModule } from './user-game/user-game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'ep-solitary-resonance-62747712.us-east-2.aws.neon.tech',
      username: 'franwanderley',
      password: 'b8vclQjdCRK6',
      database: 'rent-games',
      synchronize: true,
      autoLoadEntities: true,
      ssl: true,
    }),
    UserModule,
    GamesModule,
    UserGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
