import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Company as ICompany } from '../models/models.js';

export async function getCompanyByUserId(
  user_id: number,
): Promise<ICompany | null> {
  try {
    const company: ICompany | null = await prisma.company.findUnique({
      where: { user_id: user_id },
    });
    return company ? company : null;
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function createCompany(company: ICompany): Promise<ICompany> {
  try {
    return await prisma.company.create({
      data: {
        name: company.name,
        user_id: company.user_id,
      },
    });
  } catch (error) {
    throw handlePrismaError(error);
  }
}
