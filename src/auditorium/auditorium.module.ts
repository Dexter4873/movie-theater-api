import { Module } from '@nestjs/common';
import { AuditoriumService } from './auditorium.service';
import { AuditoriumController } from './auditorium.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditorium } from './entities/auditorium.entity';
import { Schedule } from './entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auditorium, Schedule])],
  providers: [AuditoriumService],
  controllers: [AuditoriumController]
})
export class AuditoriumModule {}
