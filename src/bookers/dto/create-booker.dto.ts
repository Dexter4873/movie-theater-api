import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookerDto {
  @IsEmail()
  @MaxLength(256)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(256)
  password: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(256)
  @IsOptional()
  lastname?: string;
}
