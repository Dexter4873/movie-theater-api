import { Controller, Get, Param } from '@nestjs/common';
import { Auditorium } from './entities/auditorium.entity';
import { AuditoriumService } from './auditorium.service';
import { Public } from '../decorators/public.decorator';

@Controller('auditoriums')
export class AuditoriumController {

  constructor(
    private readonly auditoriumService: AuditoriumService
  ) {}

  @Public()
  @Get()
  findAll(): Promise<Auditorium[]> {
    return this.auditoriumService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Auditorium> {
    return this.auditoriumService.findOne(+id);
  }
}
