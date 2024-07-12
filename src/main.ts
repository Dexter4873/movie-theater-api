import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from '@nestjs/common';
import { API_PREFIX } from "./common/constants";
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get port
  const port = app.get(ConfigService).get<number>('port');

  // Set api prefix
  app.setGlobalPrefix(API_PREFIX);

  // Set swagger documentation
  const swaggerDocs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, swaggerDocs);

  // Set global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  await app.listen(port);
  Logger.log(`Running server on port ${port}`);
}

bootstrap();
