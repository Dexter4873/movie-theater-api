import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookersService } from './bookers.service';
import { CreateBookerDto } from './dto/create-booker.dto';
import { UpdateBookerDto } from './dto/update-booker.dto';
import { Booker } from './entities/booker.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from '../decorators/jwt-payload.decorator';
import { JwtPayloadData } from '../common/types/jwt-payload-data';
import { Public } from '../decorators/public.decorator';

@ApiTags('Bookers')
@Controller('bookers')
export class BookersController {
  constructor(private readonly bookersService: BookersService) {}

  @Public()
  @Post()
  create(@Body() createBookerDto: CreateBookerDto): Promise<Booker> {
    return this.bookersService.create(createBookerDto);
  }

  @Get('self')
  findOne(@JwtPayload() jwtPayload: JwtPayloadData) {
    return this.bookersService.findOne(jwtPayload.id);
  }

  @Patch('self')
  update(@JwtPayload() jwtPayload: JwtPayloadData, @Body() updateBookerDto: UpdateBookerDto) {
    return this.bookersService.update(jwtPayload.id, updateBookerDto);
  }

  @Delete('self')
  remove(@JwtPayload() jwtPayload: JwtPayloadData) {
    return this.bookersService.remove(jwtPayload.id);
  }
}
