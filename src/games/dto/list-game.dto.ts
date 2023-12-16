import { Game } from '../entities/game.entity';

export class ListGameDto {
  id: number;

  name: string;

  img: string;

  description: string;

  constructor(entity: Game) {
    this.id = entity.id;
    this.name = entity.name;
    this.img = entity.img;
    this.description = entity.description;
  }
}
