import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtPayload } from '../decorators/jwt-payload.decorator';
import { JwtPayloadData } from '../common/types/jwt-payload-data';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(
    @JwtPayload() jwtPayload: JwtPayloadData,
    @Body() createBookingDto: CreateBookingDto
  ) {
    return this.bookingsService.create(jwtPayload.id, createBookingDto);
  }

  @Get()
  findAll(@JwtPayload() jwtPayload: JwtPayloadData) {
    return this.bookingsService.findAll(jwtPayload.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }
}
