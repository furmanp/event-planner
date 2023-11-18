import { Express } from 'express';
import dotenv from 'dotenv';
import { logger } from "./utils/winston-logger.js";
import { createServer } from "./utils/server.js";

dotenv.config();
const app: Express = createServer()


app.listen(process.env.PORT, () => {
  logger.info(`App started`)
});
