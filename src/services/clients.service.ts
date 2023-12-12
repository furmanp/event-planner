import { Client } from '../models/models.js';
import { Prisma } from '@prisma/client';
import prisma, { handlePrismaError } from '../libs/prisma.js';
import { DataError } from '../models/errors.js';
import { checkIfCompanyExists } from './company.service.js';

export async function getClients(company_id: number): Promise<Client[]> {
  try {
    return await prisma.clients.findMany({
      where: {
        company_id: company_id,
      },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function createClients(
  client: Client | Client[],
): Promise<Promise<Client> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(client)) {
      if (!client.name) {
        throw new DataError({
          name: 'Missing information error',
          message: 'Name field cannot be empty.',
        });
      }
      return await prisma.clients.create({
        data: client,
      });
    } else {
      for (const individualClient of client) {
        if (!individualClient.name) {
          throw new DataError({
            name: 'Missing information error',
            message: 'Name field cannot be empty.',
          });
        }
      }
      return await prisma.clients.createMany({
        data: client,
      });
    }
  } catch (error) {
    if (error instanceof DataError) {
      throw error;
    } else throw handlePrismaError(error);
  }
}

// THIS IMPLEMENTATION IS WRONG - UPDATE MANY WORKS ONLY IF ALL RECORDS ALL UPDATED WITH THE SAME VALUE
// export async function updateClients(
//   clients: Client[],
// ): Promise<Prisma.BatchPayload> {
//   try {
//     return await prisma.clients.updateMany({
//       data: clients,
//     });
//   } catch (error) {
//     throw handlePrismaError(error);
//   }
// }

export async function deleteClients(
  companyId: number,
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.clients.deleteMany({
      where: {
        company_id: companyId,
      },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getClientById(
  id: number,
  companyId: number,
): Promise<Client | null> {
  try {
    const client: Client | null = await prisma.clients.findUnique({
      where: {
        id: id,
        company_id: companyId,
      },
    });
    return client ? client : null;
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function updateClientById(client: Client): Promise<Client> {
  try {
    return await prisma.clients.update({
      where: { id: client.id },
      data: {
        name: client.name,
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteClientById(
  id: number,
  companyId: number,
): Promise<Client> {
  try {
    const company = await checkIfCompanyExists(companyId);
    if (company) {
      return await prisma.clients.delete({
        where: { id: id, company_id: companyId },
      });
    } else {
      throw new DataError({
        name: 'Wrong copmany ID',
        message: 'Company ID provided does not exist in the database.',
      });
    }
  } catch (error) {
    if (error instanceof DataError) {
      throw error;
    } else throw handlePrismaError(error);
  }
}
