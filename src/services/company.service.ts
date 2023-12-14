import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Company as ICompany } from '../models/models.js';

export async function getCompanyByUserId(
  user_id: number,
): Promise<ICompany | null> {
  try {
    const company: ICompany | null = await prisma.company.findUniqueOrThrow({
      where: { user_id: user_id },
    });
    return company ? company : null;
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function createCompany(company: ICompany): Promise<ICompany> {
  if (!company.name) {
    throw new Error("Company's name is required.");
  }
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

export async function checkIfCompanyExists(
  company_id: number,
): Promise<boolean> {
  try {
    const company = await prisma.company.findUnique({
      where: { id: company_id },
    });
    return company ? true : false;
  } catch (error) {
    throw handlePrismaError;
  }
}
