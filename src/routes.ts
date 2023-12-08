import express from 'express';
import routes from './routes/index.routes.js';
import { morganMiddleware } from './middleware/morgan-middleware.js';
import { createUsersHandler, singIn } from './controllers/users.js';
import { ProtectMiddleware } from './middleware/auth.js';

export const router = express();

router.use(morganMiddleware);
router.use('/user', ProtectMiddleware.verifyPasswordSafety, createUsersHandler);
router.use('/signin', singIn);
router.use('/api', ProtectMiddleware.protect, routes);
