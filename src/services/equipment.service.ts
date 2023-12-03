import { Equipment as IEquipment } from '../models/models.js';
import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Prisma } from '@prisma/client';
import { getProjectById } from './projects.service.js';
import { Equipment } from '../models/equipment.model.js';
import { DateError } from '../models/errors.js';

export async function getEquipment(
  page: number,
  pageSize: number,
  sortBy?: string,
): Promise<{
  data: IEquipment[];
  totalItems: number;
}> {
  try {
    const skip: number =
      pageSize > 20 ? (page - 1) * 20 : (page - 1) * pageSize;
    const orderBy: object = {};

    if (sortBy) {
      orderBy[sortBy] = 'asc';
    }

    const data: IEquipment[] = await prisma.project_equipment.findMany({
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
  equipment: IEquipment[],
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
  equipment: IEquipment | IEquipment[],
): Promise<Promise<IEquipment> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(equipment)) {
      const parsedDate: { check_in: Date; check_out: Date } = {
        check_in: new Date(equipment.check_in),
        check_out: new Date(equipment.check_out),
      };
      const project = await getProjectById(equipment.project_id);
      const newEquipment = new Equipment(equipment);
      if (newEquipment.isAvailable(project!.date)) {
        return await prisma.project_equipment.create({
          data: {
            project_id: equipment.project_id,
            item_id: equipment.item_id,
            check_in: parsedDate.check_in,
            check_out: parsedDate.check_out,
          },
        });
      } else {
        throw new DateError({
          name: 'Equipment Booking Error',
          message: 'Check booking dates with project date.',
        });
      }
    } else {
      // TODO
      return await prisma.project_equipment.createMany({
        data: equipment,
      });
    }
  } catch (error) {
    if (error instanceof DateError) {
      throw error;
    } else {
      throw handlePrismaError(error);
    }
  }
}

export async function getEquipmentById(id: number): Promise<IEquipment | null> {
  try {
    const equipment: IEquipment | null =
      await prisma.project_equipment.findUnique({
        where: { id: id },
      });
    return equipment ? equipment : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateEquipmentById(
  equipment: IEquipment,
): Promise<IEquipment> {
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

export async function deleteEquipmentById(id: number): Promise<IEquipment> {
  try {
    return await prisma.project_equipment.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getEquipmentByProjectId(
  project_id: number,
): Promise<IEquipment[]> {
  try {
    const equipment: IEquipment[] = await prisma.project_equipment.findMany({
      where: { project_id: project_id },
    });
    return equipment;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}
