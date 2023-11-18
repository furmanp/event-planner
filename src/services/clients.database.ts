import { Client } from '../models/models.js';
import { Prisma } from '@prisma/client';
import prisma, { handlePrismaError } from '../../libs/prisma.js';

export function getClients(): Promise<Client[]>;
export function getClients(id: number): Promise<Client | null>;
export async function getClients(
  id?: number | null,
): Promise<Client[] | Client | null> {
  try {
    if (!id) {
      return await prisma.clients.findMany();
    } else {
      const client: Client | null = await prisma.clients.findUnique({
        where: {
          id: id,
        },
      });
      return client ? client : null;
    }
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
      return await prisma.clients.create({
        data: client,
      });
    } else {
      return await prisma.clients.createMany({
        data: client,
      });
    }
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateClients(
  clients: Client[],
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.clients.updateMany({
      data: clients,
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteClients(): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.clients.deleteMany({});
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getClientById(id: number): Promise<Client | null> {
  try {
    const client: Client | null= await prisma.clients.findUnique({
      where: {
        id: id,
      },
    });
    return client ? client : null;
  } catch (error) {
    console.log();
    throw error;
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

export async function deleteClientById(id: number): Promise<Client> {
  try {
    return await prisma.clients.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}
