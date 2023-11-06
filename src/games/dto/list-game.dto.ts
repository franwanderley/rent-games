import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game.dto';

export class ListGameDto extends PartialType(CreateGameDto) {
  id: number;

  name: string;

  img: string;

  description: string;
}
