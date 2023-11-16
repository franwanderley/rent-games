import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => User, (user) => user.userGames)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
