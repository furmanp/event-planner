import morgan, {token} from 'morgan';
import chalk, { ChalkInstance } from "chalk";
import { logger } from '../utils/winston-logger.js';
import { Handler } from 'express';
import {IncomingMessage, ServerResponse} from "http";

token('statusColor', (_req: IncomingMessage, res: ServerResponse) => {
    // get the status code if response written
    const status: number | undefined = (
        typeof res.headersSent !== 'boolean' ? Boolean(res.headersSent) : res.headersSent
    )
        ? res.statusCode
        : undefined;

    // get status color
    let color: ChalkInstance;
    if(status) {
      if (status >= 500) {
        color = chalk.hex('#ff4757');
      } else if (status >= 400) {
        color = chalk.hex('#FFFF00');
      } else if (status >= 300) {
        color = chalk.hex('#00FFFF');
      } else if (status >= 200) {
        color = chalk.hex('#00FF00');
      } else {
        color = chalk.hex('#00FFFF');
      }
      return color(status);
    } else {
      return
    }

});

const stream = {
  write: (message: string) => logger.http(message.trim()),
};

const skip = ():boolean => {
  const env: string = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const format = (tokens, req, res) =>
  [
    chalk.hex('#34ace0').bold(tokens.method(req, res)),
    chalk.bold(tokens.statusColor(req, res)),
    chalk.hex('#ffb142')(tokens.url(req, res)),
    chalk.hex('#2ed573').bold(`${tokens['response-time'](req, res)} ms`),
  ].join(' ');


export const morganMiddleware: Handler = morgan(format, {stream, skip});
