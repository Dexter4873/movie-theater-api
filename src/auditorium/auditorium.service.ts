import { Injectable, NotFoundException } from '@nestjs/common';
import { Auditorium } from './entities/auditorium.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuditoriumService {
  constructor(
    @InjectRepository(Auditorium)
    private readonly auditoriumRepo: Repository<Auditorium>,
  ) {}

  findAll(): Promise<Auditorium[]> {
    return this.auditoriumRepo.find({ relations: ['schedules'] });
  }

  async findOne(id: number): Promise<Auditorium> {
    const auditorium = this.auditoriumRepo.findOne({where: { id }, relations: ['schedules']});
    if (!auditorium) throw new NotFoundException('Auditorium now found');
    return auditorium;
  }
}
