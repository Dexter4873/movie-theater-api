import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookerDto } from './dto/create-booker.dto';
import { UpdateBookerDto } from './dto/update-booker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booker } from './entities/booker.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { SALTS } from '../common/constants';

@Injectable()
export class BookersService {
  constructor(
    @InjectRepository(Booker) private readonly bookerRepo: Repository<Booker>,
  ) {}

  async create(createBookerDto: CreateBookerDto): Promise<Booker> {
    const emailExists = await this.bookerRepo.exists({
      where: { email: createBookerDto.email },
    });
    if (emailExists) throw new BadRequestException('Email already exists');

    let booker = this.bookerRepo.create(createBookerDto);
    booker.password = await hash(createBookerDto.password, SALTS);
    booker = await this.bookerRepo.save(booker);
    return this.bookerRepo.findOne({ where: { id: booker.id } });
  }

  findOne(id: number): Promise<Booker> {
    return this.bookerRepo.findOneBy({ id });
  }

  async update(id: number, updateBookerDto: UpdateBookerDto): Promise<Booker> {
    const res = await this.bookerRepo.update({ id }, updateBookerDto);
    if (res.affected === 0) throw new NotFoundException('User not found');
    return this.bookerRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const res = await this.bookerRepo.delete({ id });
    if (res.affected === 0) throw new NotFoundException('User not found');
  }
}
