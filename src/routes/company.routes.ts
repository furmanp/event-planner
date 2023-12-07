import express, { Router } from 'express';
import { CompanyController } from '../controllers/company.controller.js';

const router: Router = express.Router();
const companyController: CompanyController = new CompanyController();

router.post('/company', companyController.createCompany);

export default router;
