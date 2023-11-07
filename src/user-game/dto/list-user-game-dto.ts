import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGameDto } from './create-user-game.dto';

export class ListUserGameDto extends PartialType(CreateUserGameDto) {
  active: boolean;
  beginDate: Date;
}
