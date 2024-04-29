import { UserGame } from '../../user-game/entities/user-game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ListGameDto } from '../dto/list-game.dto';

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
  description?: string;

  @Column()
  key: string;

  @OneToMany(() => UserGame, (userGame) => userGame.game)
  userGames?: UserGame[];

  toDto?(): ListGameDto {
    const { id, name, img, description } = this;
    const gameDto: ListGameDto = { id, name, description, img };
    return gameDto;
  }
}
