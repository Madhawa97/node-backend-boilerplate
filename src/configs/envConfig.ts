import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USERNAME: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  DB_DATABASE: process.env.DB_NAME || 'test',
  JWT_SECRET: process.env.JWT_SECRET || ''
};
