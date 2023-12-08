//TODO implement filtering functionality
import { Inventory } from '../models/models.js';
import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Prisma } from '@prisma/client';

export async function getInventory(
  company_id: number,
  page: number,
  pageSize: number,
  sortBy?: string,
): Promise<{
  data: Inventory[];
  totalItems: number;
}> {
  try {
    const skip: number =
      pageSize > 20 ? (page - 1) * 20 : (page - 1) * pageSize;
    const orderBy: object = {};

    if (sortBy) {
      orderBy[sortBy] = 'asc';
    }

    const data: Inventory[] = await prisma.inventory.findMany({
      where: {
        company_id: company_id,
      },
      skip,
      take: pageSize,
      orderBy,
    });

    const totalItems: number = await prisma.inventory.count({
      where: { company_id: company_id },
    });

    return {
      data,
      totalItems,
    };
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateInventory(
  inventory: Inventory[],
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.inventory.updateMany({
      data: inventory,
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteInventory(
  company_id: number,
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.inventory.deleteMany({
      where: { company_id: company_id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function createInventory(
  inventory: Inventory | Inventory[],
): Promise<Promise<Inventory> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(inventory)) {
      return await prisma.inventory.create({
        data: inventory,
      });
    } else {
      return await prisma.inventory.createMany({
        data: inventory,
      });
    }
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function getInventoryById(
  id: number,
  company_id: number,
): Promise<Inventory | null> {
  try {
    const inventory: Inventory | null = await prisma.inventory.findUnique({
      where: { id: id, company_id: company_id },
    });
    return inventory ? inventory : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateInventoryById(
  inventory: Inventory,
): Promise<Inventory> {
  try {
    return await prisma.inventory.update({
      where: { id: inventory.id, company_id: inventory.company_id },
      data: {
        name: inventory.name,
        stock: inventory.stock,
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteInventoryById(
  id: number,
  company_id: number,
): Promise<Inventory> {
  try {
    return await prisma.inventory.delete({
      where: { id: id, company_id: company_id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}
