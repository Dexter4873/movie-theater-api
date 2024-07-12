import { Injectable, NotFoundException } from '@nestjs/common';
import { Auditorium } from './entities/auditorium.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class AuditoriumService {
  constructor(
    @InjectRepository(Auditorium)
    private readonly auditoriumRepo: Repository<Auditorium>,
    @InjectRepository(Schedule) private readonly scheduleRepo: Repository<Schedule>,
    @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
  ) {}

  findAll(): Promise<Auditorium[]> {
    return this.auditoriumRepo.find({ relations: ['schedules'] });
  }

  async findOne(id: number): Promise<Auditorium> {
    const auditorium = this.auditoriumRepo.findOne({where: { id: id }, relations: ['schedules']});
    if (!auditorium) throw new NotFoundException('Auditorium now found');
    return auditorium;
  }

  async getFreeSeats(date: Date, scheduleId: number) {
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId },
      relations: ['auditorium'],
    })

    const bookings = await this.bookingRepo.find({
      where: {
        schedule,
        date: date
      }
    });


    // Create an array with all possible seats numbers
    const seats: number[] = [];
    for (let i = 1; i <= schedule.auditorium.seats; i++)
      seats.push(i);

    // Extract all already occupied seats
    bookings.forEach((booking) => {
      seats.splice(booking.seatNumber - 1, 1);
    })

    return seats;
  }
}
