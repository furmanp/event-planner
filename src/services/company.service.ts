import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Company } from '../models/models.js';

// export const prisma: PrismaClient = new PrismaClient();

export async function createCompany(company: Company): Promise<Company> {
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
