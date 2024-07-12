import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBookerDto } from './create-booker.dto';

export class UpdateBookerDto extends PartialType(
  OmitType(CreateBookerDto, ['password', 'email'] as const)
) {}
