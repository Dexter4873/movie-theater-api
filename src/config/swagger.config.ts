import { DocumentBuilder } from '@nestjs/swagger';
import { API_VERSION } from '../common/constants';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Movie theater API')
  .setDescription('This is the movie theater API swagger documentation')
  .setVersion(String(API_VERSION))
  .build()
