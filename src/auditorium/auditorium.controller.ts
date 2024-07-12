import { Controller, Get, Param, Query } from '@nestjs/common';
import { Auditorium } from './entities/auditorium.entity';
import { AuditoriumService } from './auditorium.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auditoriums')
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
  @Get('schedules/:id/availability')
  getScheduleAvailability(@Param('id') id: string, @Query('date') dateStr: string) {
    let date: Date = new Date()
    if (dateStr) date = new Date(dateStr);
    return this.auditoriumService.getFreeSeats(date, +id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Auditorium> {
    return this.auditoriumService.findOne(+id);
  }
}
