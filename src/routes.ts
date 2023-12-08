import express from 'express';
import routes from './routes/index.routes.js';
import { morganMiddleware } from './middleware/morgan-middleware.js';
import { ProtectMiddleware } from './middleware/auth.js';
import { UsersController } from './controllers/users.controller.js';

export const router = express();
const userController = new UsersController();

router.use(morganMiddleware);
router.post(
  '/user',
  ProtectMiddleware.verifyPasswordSafety,
  userController.createUsersHandler,
);
router.post('/signin', userController.singIn);
router.use('/api', ProtectMiddleware.protect, routes);
