import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { globalConfig } from './config/global';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig } from './common/types/global-config.interface';

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
          synchronize: true,
        }
      },
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
