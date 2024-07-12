import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { globalConfig } from './config/global';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './common/types/global-config.interface';
import { BookersModule } from './bookers/bookers.module';
import { Booker } from './bookers/entities/booker.entity';

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
          entities: [Booker],
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    BookersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
