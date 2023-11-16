import express from 'express';
import dataRoutes from './routes/data.js';
import { protect } from './middleware/auth.js';

export const router = express();

router.use('/data', protect, dataRoutes);
