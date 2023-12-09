import { Equipment as IEquipment } from '../models/models.js';
import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Prisma } from '@prisma/client';
import { getProjectById } from './projects.service.js';
import { Equipment } from '../models/equipment.model.js';
import { DateError, OverbookingError } from '../models/errors.js';

export async function getEquipment(
  company_id: number,
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
      where: {
        company_id: company_id,
      },
      skip,
      take: pageSize,
      orderBy,
    });

    const totalItems: number = await prisma.project_equipment.count({
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

export async function deleteEquipment(
  company_id: number,
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.project_equipment.deleteMany({
      where: { company_id: company_id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function createEquipment(
  equipment: IEquipment | IEquipment[],
): Promise<IEquipment | Prisma.BatchPayload> {
  try {
    if (!Array.isArray(equipment)) {
      const availability = await getEquipmentByDate(
        equipment.company_id,
        new Date(equipment.check_in),
      );
      console.log(availability);

      const project = await getProjectById(
        equipment.project_id,
        equipment.company_id,
      );
      const newEquipment = new Equipment(equipment);
      if (await newEquipment.isAvailable(project!.date)) {
        return await prisma.project_equipment.create({
          data: {
            project_id: newEquipment.project_id,
            company_id: newEquipment.company_id,
            item_id: newEquipment.item_id,
            check_in: newEquipment.check_in,
            check_out: newEquipment.check_out,
          },
        });
      } else {
        throw new OverbookingError({
          name: 'Equipment Booking Error',
          message: 'No items available for provided date.',
        });
      }
    } else {
      const parsedEquipment: IEquipment[] = [];
      for (const booking of equipment) {
        const project = await getProjectById(
          booking.project_id,
          booking.company_id,
        );
        const newEquipment = new Equipment(booking);
        if (!newEquipment.isAvailable(project!.date)) {
          throw new DateError({
            name: 'Equipment Booking Error',
            message: 'Check booking dates with project date.',
          });
        } else {
          parsedEquipment.push({
            project_id: booking.project_id,
            company_id: booking.company_id,
            item_id: booking.item_id,
            check_in: booking.check_in,
            check_out: booking.check_out,
          });
        }
      }

      return await prisma.project_equipment.createMany({
        data: parsedEquipment,
      });
    }
  } catch (error) {
    if (error instanceof OverbookingError) {
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
export async function getEquipmentByDate(
  company_id: number,
  date: Date,
): Promise<IEquipment[]> {
  try {
    const equipment: IEquipment[] = await prisma.project_equipment.findMany({
      where: {
        company_id: company_id,
        check_in: {
          lte: date,
        },
        check_out: {
          gte: date,
        },
      },
    });
    return equipment;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}
