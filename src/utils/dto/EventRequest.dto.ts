/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';
import { Category } from '../enums';

export class EventRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  availableAttendeesCount: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  category: Category
}
