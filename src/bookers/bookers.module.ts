import { Module } from '@nestjs/common';
import { BookersService } from './bookers.service';
import { BookersController } from './bookers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booker } from './entities/booker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booker])],
  controllers: [BookersController],
  providers: [BookersService],
})
export class BookersModule {}
