import { Module } from '@nestjs/common';
import { AuditoriumService } from './auditorium.service';
import { AuditoriumController } from './auditorium.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditorium } from './entities/auditorium.entity';
import { Schedule } from './entities/schedule.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorium, Schedule, Booking])],
  providers: [AuditoriumService],
  controllers: [AuditoriumController]
})
export class AuditoriumModule {}
