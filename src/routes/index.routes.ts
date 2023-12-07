import express from 'express';
import { protect } from './../middleware/auth.js';
import { checkIfCompanyExists } from '../middleware/company.middleware.js';
import equipmentRoutes from './equipment.routes.js';
import employeeRoutes from './employees.routes.js';
import projectRoutes from './projects.routes.js';
import clientRoutes from './clients.routes.js';
import inventorRoutes from './inventory.routes.js';
import companyRoutes from './company.routes.js';

const router = express();

router.use('', protect, companyRoutes);

router.use('', protect, checkIfCompanyExists, equipmentRoutes);
router.use('', protect, checkIfCompanyExists, employeeRoutes);
router.use('', protect, checkIfCompanyExists, projectRoutes);
router.use('', protect, checkIfCompanyExists, clientRoutes);
router.use('', protect, checkIfCompanyExists, inventorRoutes);

export default router;
