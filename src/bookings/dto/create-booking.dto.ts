import { IsDateString, IsInt, Min } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Min(1)
  schedule: number;

  @IsDateString()
  date: Date;

  @IsInt()
  @Min(1)
  seatNumber: number;
}
