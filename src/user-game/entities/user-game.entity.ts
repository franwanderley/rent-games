import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: true,
  })
  active: boolean;

  @Column({
    default: () => 'CURRENT_DATE',
  })
  beginDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => Game, (game) => game.userGames)
  game: Game;

  @ManyToOne(() => User, (user) => user.userGames)
  user: User;
}
