import { UserGame } from 'src/user-game/entities/user-game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  key: string;

  @OneToMany(() => UserGame, (userGame) => userGame.game)
  userGames: UserGame[];
}
