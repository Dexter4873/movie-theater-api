import { GlobalConfig } from '../common/types/global-config.interface';
import * as process from 'node:process';

export const globalConfig = (): GlobalConfig => ({
  port: parseInt(process.env['PORT']) || 3000,
  database: {
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    port: parseInt(process.env['DB_PORT']) || 3306,
    database: process.env['DB_DATABASE'],
  },
  jwtSecrets: {
    access: process.env['JWT_ACCESS'],
    refresh: process.env['JWT_REFRESH'],
  }
});
