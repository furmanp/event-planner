import express, { Express } from 'express';
import { router } from './../routes.js';

export function createServer(): Express {
  const app: Express = express();
  app.use(express.json());
  app.use('/', router);
  app.get('/', (_req, res) => {
    res.status(200).json('test');
  });
  return app;
}
