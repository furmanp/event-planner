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
 *     summary: Create user's company. Company servers as a workspace. User may have one company.
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
 *           example:
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
 *                   type: object
 *                   properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Users Company 1"
 *                         user_id:
 *                           type: integer
 *                           example: 1
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
 *                   example: "Internal server error"
 */
router.post('/companies', companyController.createCompany);

export default router;
