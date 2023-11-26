import express from 'express';
import routes from './routes/index.routes.js';
import { protect } from './middleware/auth.js';

export const router = express();

router.use('/data', protect, routes);
