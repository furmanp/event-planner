import { Request, Response } from 'express';
import { Company as ICompany } from '../models/models.js';
import { createCompany } from '../services/company.service.js';

export class CompanyController {
  async createCompany(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);
    let companyData: ICompany = req.body;

    companyData = {
      name: req.body.name,
      user_id: user_id,
    };

    try {
      const result: ICompany = await createCompany(companyData);

      res
        .status(201)
        .json({ success: true, data: result, message: 'Client created.' });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }
}
