import express, { Router } from 'express';
import { CompanyController } from '../controllers/company.controller.js';

const router: Router = express.Router();
const companyController: CompanyController = new CompanyController();
/**
 * @swagger
 * /api/companies:
 *   post:
 *     tags:
 *       - Company
 *     summary: Create user's company. Company servers as a workspace. User may have multiple companies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               user_id:
 *                 type: string
 *           examples:
 *             company:
 *               summary: Example company
 *               value:
 *                 username: "Users Company 1"
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 *                 message:
 *                   type: string
 *                   example: 'Company created.'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
router.post('/companies', companyController.createCompany);

export default router;
