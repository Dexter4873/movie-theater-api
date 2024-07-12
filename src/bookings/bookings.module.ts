import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Booker } from '../bookers/entities/booker.entity';
import { Schedule } from '../auditorium/entities/schedule.entity';
import { Auditorium } from '../auditorium/entities/auditorium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Booker, Schedule, Auditorium])],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
