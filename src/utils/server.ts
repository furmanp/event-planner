import express, { Express } from 'express';
import { router } from './../routes.js';
import { createUsersHandler, singIn } from './../handlers/users.js';
import { morganMiddleware } from './../middleware/morgan-middleware.js';

export function createServer(): Express {
  const app: Express = express();
  app.use(express.json());
  app.use(morganMiddleware);
  app.use('/api', router);
  app.post('/user', createUsersHandler);
  app.post('/signin', singIn);
  app.get('/', (_req, res) => {
    res.status(200).json('test');
  });
  return app;
}
