import express from 'express';
import { checkIfCompanyExists } from '../middleware/company.middleware.js';
import equipmentRoutes from './equipment.routes.js';
import employeeRoutes from './employees.routes.js';
import projectRoutes from './projects.routes.js';
import clientRoutes from './clients.routes.js';
import inventorRoutes from './inventory.routes.js';
import companyRoutes from './company.routes.js';

const router = express();

router.use(companyRoutes);
router.use(checkIfCompanyExists, equipmentRoutes);
router.use(checkIfCompanyExists, employeeRoutes);
router.use(checkIfCompanyExists, projectRoutes);
router.use(checkIfCompanyExists, clientRoutes);
router.use(checkIfCompanyExists, inventorRoutes);

export default router;
