import { NextFunction, Request, Response } from 'express';
import { getCompanyByUserId } from '../services/company.service.js';
import { Company as ICompany } from '../models/models.js';

export async function checkIfCompanyExists(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = parseInt(<string>req.headers.user_id, 10);
  try {
    const company: ICompany | null = await getCompanyByUserId(user_id);
    if (company) {
      req.headers['company_id'] = String(company.id);
      next();
    }
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: 'Create Company workspace first.' });
  }
}
