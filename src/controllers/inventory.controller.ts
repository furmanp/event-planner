import { Request, Response } from 'express';
import {
  Inventory as IInventory,
  RequestBody,
  RequestParams,
  RequestQuery,
  ResponseBody,
} from '../models/models.js';
import { Prisma } from '@prisma/client';
import {
  createInventory,
  deleteInventory,
  deleteInventoryById,
  getInventory,
  getInventoryById,
  updateInventory,
  updateInventoryById,
} from '../services/inventory.service.js';

export class InventoryController {
  //TODO add filtering and sorting the data
  async getInventory(
    req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
    res: Response,
  ): Promise<void> {
    try {
      const user_id = parseInt(<string>req.headers.user_id, 10);
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
        const inventory: {
          data: IInventory[];
          totalItems: number;
        } = await getInventory(
          user_id,
          parseInt(query.page, 10),
          parseInt(query.pageSize, 10),
          query.sortBy,
        );
        res.status(200).json({ success: true, data: inventory });
      }
    } catch (error) {
      console.error('Error fetching inventory: ', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async updateInventory(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);
    let inventoryData: IInventory[] = req.body;
    inventoryData = inventoryData.map((item) => ({
      ...item,
      user_id: user_id,
    }));

    try {
      const inventory: Prisma.BatchPayload = await updateInventory(
        inventoryData,
      );
      res.status(204).json({
        success: true,
        data: inventory,
        message: 'Client updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteInventory(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);
    try {
      const inventory: Prisma.BatchPayload = await deleteInventory(user_id);
      res.status(204).json({
        success: true,
        data: inventory,
        message: 'Clients deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createInventory(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);
    let inventoryData: IInventory | IInventory[] = req.body;

    if (Array.isArray(inventoryData)) {
      inventoryData = inventoryData.map((item) => ({
        ...item,
        user_id: user_id,
      }));
    } else {
      inventoryData = {
        ...inventoryData,
        user_id: user_id,
      };
    }
    try {
      const result: IInventory | Prisma.BatchPayload = await createInventory(
        inventoryData,
      );

      if ('count' in result) {
        res.status(201).json({
          success: true,
          data: result,
          message: `${result.count} items created.`,
        });
      } else {
        res
          .status(201)
          .json({ success: true, data: result, message: 'Item created.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  async getInventoryById(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);
    try {
      const id: number = parseInt(req.params.id);
      const inventory: IInventory | null = await getInventoryById(id, user_id);
      res.status(200).json({ success: true, data: inventory });
    } catch (error) {
      console.error('Error fetching inventory: ', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async updatesInventoryById(req: Request, res: Response): Promise<void> {
    const inventoryData: IInventory = {
      id: parseInt(req.params.id, 10),
      user_id: 1,
      name: req.body.name,
      stock: req.body.stock,
    };
    try {
      const inventory: IInventory = await updateInventoryById(inventoryData);
      res.status(204).json({
        success: true,
        data: inventory,
        message: 'Inventory updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteInventoryById(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);
    const id: number = parseInt(req.params.id, 10);
    try {
      const inventory: IInventory = await deleteInventoryById(id, user_id);
      res.status(204).json({
        success: true,
        data: inventory,
        message: 'Item deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
