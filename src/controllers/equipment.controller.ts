import { Request, Response } from 'express';
import {
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
import { Equipment as IEquipment } from '../models/models.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       description: Equivalent of booking. Equipment is unique per project, it is derived from the items' repository.
 *       properties:
 *         id:
 *           type: integer
 *           description: The project equipment ID. Assigned Automatically
 *           example: 1
 *         project_id:
 *           type: integer
 *           description: The ID of the project associated with the equipment.
 *           example: 1
 *         item_id:
 *           type: integer
 *           description: The ID of the equipment item.
 *           example: 1
 *         company_id:
 *           type: integer
 *           description: The ID of the company owning the equipment.
 *           example: 1
 *         check_in:
 *           type: date
 *           description: The check-in date of the equipment (booking).
 *           example: "2024-01-10"
 *         check_out:
 *           type: date
 *           description: The return date of the equipment (booking).
 *           example: "2024-01-15"
 *       required:
 *         - project_id
 *         - item_id
 *         - company_id
 *         - check_in
 *         - check_out
 *       uniqueItems:
 *         - id
 *         - project_id
 *         - item_id
 *         - company_id
 */
export class EquipmentController {
  async getEquipment(
    req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
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
          data: IEquipment[];
          totalItems: number;
        } = await getEquipment(
          company_id,
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
  async createEquipment(req: Request, res: Response): Promise<void> {
    const equipmentData: IEquipment | IEquipment[] = req.body;
    try {
      const result: IEquipment | Prisma.BatchPayload = await createEquipment(
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
  async updateEquipment(req: Request, res: Response): Promise<void> {
    const equipmentData: IEquipment[] = req.body;

    try {
      const equipment: Prisma.BatchPayload = await updateEquipment(
        equipmentData,
      );
      res.status(204).json({
        success: true,
        data: equipment,
        message: 'Equipment updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteEquipment(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    try {
      const equipment: Prisma.BatchPayload = await deleteEquipment(company_id);
      res.status(204).json({
        success: true,
        data: equipment,
        message: 'Equipment deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getEquipmentById(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id) {
        const equipment: IEquipment | null = await getEquipmentById(
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

  async updateEquipmentById(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    const equipmentData: IEquipment = {
      id: parseInt(req.params.id, 10),
      item_id: req.body.item_id,
      company_id: company_id,
      project_id: req.body.project,
      check_in: req.body.check_in,
      check_out: req.body.check_out,
    };
    try {
      const equipment: IEquipment = await updateEquipmentById(equipmentData);
      res.status(204).json({
        success: true,
        data: equipment,
        message: 'Equipment updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteEquipmentById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    try {
      const equipment: IEquipment = await deleteEquipmentById(id);
      res.status(204).json({
        success: true,
        data: equipment,
        message: 'Equipment deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
