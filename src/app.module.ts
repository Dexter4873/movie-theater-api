import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from './config/global';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [globalConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
