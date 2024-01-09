import { Express } from 'express';
import { logger } from './utils/winston-logger.js';
import { createServer } from './utils/server.js';
import { config } from '../config.js';

const app: Express = createServer();
app.listen(config.PORT, () => {
  logger.info(`App started`);
});
