import express from 'express';
import { protect } from './../middleware/auth.js';
import equipmentRoutes from './equipment.routes.js';
import employeeRoutes from './employees.routes.js';
import projectRoutes from './projects.routes.js';
import clientRoutes from './clients.routes.js';
import inventorRoutes from './inventory.routes.js';

const router = express();

router.use('', protect, equipmentRoutes);
router.use('', protect, employeeRoutes);
router.use('', protect, projectRoutes);
router.use('', protect, clientRoutes);
router.use('', protect, inventorRoutes);

export default router;
