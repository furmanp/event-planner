import dotenv from 'dotenv';
import { logger } from './src/utils/winston-logger.js';

dotenv.config();

function getEnvironmentVariable(name: string): string {
  const value: string | undefined = process.env[name];
  if (!value) {
    logger.error(`Missing environment variable: ${name}.
    Server is being shut down, process code ${process.exitCode}`);
    process.exit(1);
  }
  return value;
}

export const config = {
  JWT_TOKEN: getEnvironmentVariable('JWT_SECRET'),
  PORT: getEnvironmentVariable('PORT'),
  DATABASE_URL: getEnvironmentVariable('DATABASE_URL'),
};
