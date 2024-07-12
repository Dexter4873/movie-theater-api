import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookersService } from './bookers.service';
import { CreateBookerDto } from './dto/create-booker.dto';
import { UpdateBookerDto } from './dto/update-booker.dto';
import { Booker } from './entities/booker.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bookers')
@Controller('bookers')
export class BookersController {
  constructor(private readonly bookersService: BookersService) {}

  @Post()
  create(@Body() createBookerDto: CreateBookerDto): Promise<Booker> {
    return this.bookersService.create(createBookerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookerDto: UpdateBookerDto) {
    return this.bookersService.update(+id, updateBookerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookersService.remove(+id);
  }
}
