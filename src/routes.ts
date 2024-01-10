import express from 'express';
import routes from './routes/index.routes.js';
import { morganMiddleware } from './middleware/morgan-middleware.js';
import { ProtectMiddleware } from './middleware/auth.js';
import userRoutes from './routes/users.routes.js'
export const router = express();

router.use(morganMiddleware);
router.use(userRoutes)
router.use('/api', ProtectMiddleware.protect, routes);
