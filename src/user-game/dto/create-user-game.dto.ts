import { IsDateString, IsNumber } from 'class-validator';

export class CreateUserGameDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  gameId: number;

  @IsDateString()
  endDate: Date;
}
