import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { API_PREFIX } from "./common/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get port
  const port = app.get(ConfigService).get<number>('port');

  // Set api prefix
  app.setGlobalPrefix(API_PREFIX);

  await app.listen(port);
  Logger.log(`Running server on port ${port}`);
}

bootstrap();
