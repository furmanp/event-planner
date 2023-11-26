import { Request, Response } from 'express';
import {
  Equipment,
  RequestBody,
  RequestParams,
  RequestQuery,
  ResponseBody,
} from '../models/models.js';
import { Prisma } from '@prisma/client';
import {
  createEquipment,
  deleteEquipment,
  deleteEquipmentById,
  getEquipment,
  getEquipmentById,
  updateEquipment,
  updateEquipmentById,
} from '../services/equipment.service.js';

export async function getEquipmentHandler(
  req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  res: Response,
): Promise<void> {
  try {
    const {
      query,
    }: Request<RequestParams, ResponseBody, RequestBody, RequestQuery> = req;
    if (!query.page || !query.pageSize) {
      res.status(400).json({
        success: false,
        error: 'Both page and pageSize parameters are required.',
      });
      return;
    } else {
      const equipment: {
        data: Equipment[];
        totalItems: number;
      } = await getEquipment(
        parseInt(query.page, 10),
        parseInt(query.pageSize, 10),
        query.sortBy,
      );
      res.status(200).json({ success: true, data: equipment });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function createEquipmentHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const equipmentData: Equipment | Equipment[] = req.body;
  try {
    const result: Equipment | Prisma.BatchPayload = await createEquipment(
      equipmentData,
    );

    if ('count' in result) {
      res.status(201).json({
        success: true,
        data: result,
        message: `${result.count} equipment added.`,
      });
    } else {
      res
        .status(201)
        .json({ success: true, data: result, message: 'Equipment added.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}

export async function updateEquipmentHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const equipmentData: Equipment[] = req.body;

  try {
    const equipment: Prisma.BatchPayload = await updateEquipment(equipmentData);
    res.status(204).json({
      success: true,
      data: equipment,
      message: 'Equipment updated successfully',
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteEquipmentHandler(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const equipment: Prisma.BatchPayload = await deleteEquipment();
    res.status(204).json({
      success: true,
      data: equipment,
      message: 'Equipment deleted successfully',
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getEquipmentByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    if (req.params.id) {
      const equipment: Equipment | null = await getEquipmentById(
        parseInt(req.params.id, 10),
      );
      if (equipment) {
        res.status(200).json({ success: true, data: equipment });
      } else {
        res.status(404).json({ success: false, message: 'Not found' });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateEquipmentByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const equipmentData: Equipment = {
    id: parseInt(req.params.id, 10),
    item_id: req.body.item_id,
    project_id: req.body.project,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
  };
  try {
    const equipment: Equipment = await updateEquipmentById(equipmentData);
    res.status(204).json({
      success: true,
      data: equipment,
      message: 'Equipment updated successfully',
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteEquipmentByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const id: number = parseInt(req.params.id, 10);
  try {
    const equipment: Equipment = await deleteEquipmentById(id);
    res.status(204).json({
      success: true,
      data: equipment,
      message: 'Equipment deleted successfully',
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
