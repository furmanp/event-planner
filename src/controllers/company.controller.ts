import { Request, Response } from 'express';
import { Company as ICompany } from '../models/models.js';
import { createCompany } from '../services/company.service.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The company ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The unique name of the company.
 *           example: "Company Inc."
 *         user_id:
 *           type: integer
 *           description: The unique ID of the user associated with the company.
 *           example: 1
 *         projects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Project'
 *         clients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Client'
 *         inventory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Inventory'
 *         employees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employee'
 *         equipment:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Equipment'
 */
export class CompanyController {
  async createCompany(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);

    const companyData: ICompany = {
      name: req.body.name,
      user_id: user_id,
    };

    try {
      const result: ICompany = await createCompany(companyData);

      res
        .status(201)
        .json({ success: true, data: result, message: 'Company created.' });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }
}
