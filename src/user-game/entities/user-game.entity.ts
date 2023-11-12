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
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  beginDate: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  endDate: Date;

  @ManyToOne(() => Game, (game) => game.userGames)
  game: Game;

  @ManyToOne(() => User, (user) => user.userGames)
  user: User;
}
