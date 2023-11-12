import { IsString, Length } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @Length(3, 100)
  name: string;

  img: string;

  description: string;

  @IsString()
  key: string;
}
