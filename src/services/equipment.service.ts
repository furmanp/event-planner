import { Equipment } from '../models/models.js';
import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Prisma } from '@prisma/client';

export async function getEquipment(
  page: number,
  pageSize: number,
  sortBy?: string,
): Promise<{
  data: Equipment[];
  totalItems: number;
}> {
  try {
    const skip: number =
      pageSize > 20 ? (page - 1) * 20 : (page - 1) * pageSize;
    const orderBy: object = {};

    if (sortBy) {
      orderBy[sortBy] = 'asc';
    }

    const data: Equipment[] = await prisma.project_equipment.findMany({
      skip,
      take: pageSize,
      orderBy,
    });

    const totalItems: number = await prisma.project_equipment.count();

    return {
      data,
      totalItems,
    };
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateEquipment(
  equipment: Equipment[],
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.project_equipment.updateMany({
      data: equipment,
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteEquipment(): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.project_equipment.deleteMany({});
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function createEquipment(
  equipment: Equipment | Equipment[],
): Promise<Promise<Equipment> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(equipment)) {
      return await prisma.project_equipment.create({
        data: equipment,
      });
    } else {
      return await prisma.project_equipment.createMany({
        data: equipment,
      });
    }
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function getEquipmentById(id: number): Promise<Equipment | null> {
  try {
    const equipment: Equipment | null =
      await prisma.project_equipment.findUnique({
        where: { id: id },
      });
    return equipment ? equipment : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateInventoryById(
  equipment: Equipment,
): Promise<Equipment> {
  try {
    return await prisma.project_equipment.update({
      where: { id: equipment.id },
      data: {
        project_id: equipment.project_id,
        check_in: equipment.check_in,
        check_out: equipment.check_out,
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteEquipmentById(id: number): Promise<Equipment> {
  try {
    return await prisma.project_equipment.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}
