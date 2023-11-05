import { DataSource } from 'typeorm';
import { envConfig } from './envConfig';

export const dbConfig = new DataSource({
  type: 'postgres',
  host: envConfig.DB_HOST,
  port: Number(envConfig.DB_PORT),
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_DATABASE,
  entities: []
});

