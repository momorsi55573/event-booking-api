/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateTicketDTO {
    @IsNotEmpty()
    @Transform(({ value }) => {
      return Number(value);
    })
    @IsInt()
    @Min(1)
    availableAttendeesCount: number;  

    @IsOptional()
    eventId: string;
    
    @IsOptional()
    userId: string

}
