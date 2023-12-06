import { Client } from '../models/models.js';
import { Prisma } from '@prisma/client';
import prisma, { handlePrismaError } from '../libs/prisma.js';

export async function getClients(user: number): Promise<Client[]> {
  try {
    return await prisma.clients.findMany({
      where: {
        user_id: user,
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
        throw new Error('Client name is required.');
      }
      return await prisma.clients.create({
        data: client,
      });
    } else {
      for (const individualClient of client) {
        if (!individualClient.name) {
          throw new Error('Client name is required.');
        }
      }
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

export async function deleteClients(
  userId: number,
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.clients.deleteMany({
      where: {
        user_id: userId,
      },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getClientById(
  id: number,
  user_id: number,
): Promise<Client | null> {
  try {
    const client: Client | null = await prisma.clients.findUnique({
      where: {
        id: id,
        user_id: user_id,
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

export async function deleteClientById(
  id: number,
  user_id: number,
): Promise<Client> {
  try {
    return await prisma.clients.delete({
      where: { id: id, user_id: user_id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}
