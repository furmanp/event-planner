import express, { Express } from 'express';
import dotenv from 'dotenv';
import { router } from './routes.js';
import { createUsersHandler, singIn } from './handlers/users.js';

dotenv.config();
export const app: Express = express();

app.use(express.json());
// app.use(morganMiddleware);
app.use('/api', router);
app.post('/user', createUsersHandler);
app.post('/signin', singIn);
app.get('/', (_req, res) => {
  res.status(200).json('test');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
