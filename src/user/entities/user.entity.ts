import { UserGame } from '../../user-game/entities/user-game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'USER',
  })
  role: 'USER' | 'ADMIN';

  @OneToMany(() => UserGame, (userGame) => userGame.user)
  userGames: UserGame[];
}
