import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booker } from '../bookers/entities/booker.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../auditorium/entities/schedule.entity';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booker) private readonly bookerRepo: Repository<Booker>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async create(bookerId: number, createBookingDto: CreateBookingDto) {
    const booker = await this.bookerRepo.findOneBy({
      id: bookerId,
    });
    if (!booker) throw new NotFoundException('Booker not found');

    const schedule = await this.scheduleRepo.findOne({
      where: { id: createBookingDto.schedule },
    });
    if (!schedule) throw new NotFoundException('Schedule not found');

    let booking = this.bookingRepo.create({
      seatNumber: createBookingDto.seatNumber,
      date: createBookingDto.date,
    });
    booking.booker = booker;
    booking.schedule = schedule;
    booking = await this.bookingRepo.save(booking);
    return booking;
  }

  findAll(bookerId: number) {
    return this.bookingRepo.find({ where: { booker: { id: bookerId } }})
  }

  async findOne(id: number) {
    const booking = await this.bookingRepo.findOneBy({ id });
    if (!booking) throw new NotFoundException('Booking not found')
    return booking;
  }
}
