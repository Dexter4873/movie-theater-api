import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { globalConfig } from './config/global';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './common/types/global-config.interface';
import { BookersModule } from './bookers/bookers.module';
import { Booker } from './bookers/entities/booker.entity';
import { AuthModule } from './auth/auth.module';
import { AuditoriumModule } from './auditorium/auditorium.module';
import { Auditorium } from './auditorium/entities/auditorium.entity';
import { Schedule } from './auditorium/entities/schedule.entity';
import { BookingsModule } from './bookings/bookings.module';
import { Booking } from './bookings/entities/booking.entity';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      load: [globalConfig],
      isGlobal: true,
    }),
    // Database config
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const database = configService.get<DbConfig>('database');
        return {
          type: 'mysql',
          username: database.username,
          password: database.password,
          port: database.port,
          database: database.database,
          entities: [Booker, Auditorium, Schedule, Booking],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    BookersModule,
    AuthModule,
    AuditoriumModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
