import { Request, Response } from 'express';
import { Client as IClient } from '../models/models.js';
import { Prisma } from '@prisma/client';
import {
  createClients,
  deleteClientById,
  deleteClients,
  getClientById,
  getClients,
  updateClientById,
  updateClients,
} from '../services/clients.service.js';

export class ClientController {
  async getClients(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);

    try {
      const clients: IClient[] = await getClients(user_id);
      if (clients) {
        res.status(200).json({ success: true, data: clients });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async createClients(req: Request, res: Response): Promise<void> {
    const user_id = parseInt(<string>req.headers.user_id, 10);
    const clientData: IClient | IClient[] = {
      name: req.body.name,
      user_id: user_id,
    };

    try {
      const result: IClient | Prisma.BatchPayload = await createClients(
        clientData,
      );

      if ('count' in result) {
        res.status(201).json({
          success: true,
          data: result,
          message: `${result.count} clients created.`,
        });
      } else {
        res
          .status(201)
          .json({ success: true, data: result, message: 'Client created.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  async updateClients(req: Request, res: Response): Promise<void> {
    const clientsData: IClient[] = req.body;

    try {
      const clients: Prisma.BatchPayload = await updateClients(clientsData);
      res.status(204).json({
        success: true,
        data: clients,
        message: 'Client updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteClients(_req: Request, res: Response): Promise<void> {
    try {
      const client: Prisma.BatchPayload = await deleteClients();
      res.status(204).json({
        success: true,
        data: client,
        message: 'Clients deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getClientById(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id) {
        const client: IClient | null = await getClientById(
          parseInt(req.params.id, 10),
        );
        if (client) {
          res.status(200).json({ success: true, data: client });
        } else {
          res.status(404).json({ success: false, message: 'Not found' });
        }
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async updateClientById(req: Request, res: Response): Promise<void> {
    const clientData: IClient = {
      id: parseInt(req.params.id, 10),
      user_id: 1,
      name: req.body.name,
    };
    try {
      const client: IClient = await updateClientById(clientData);
      res.status(204).json({
        success: true,
        data: client,
        message: 'Employee updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteClientById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    try {
      //TODO add 404 if employee with provided ID doesn't exist
      const client: IClient = await deleteClientById(id);
      res.status(204).json({
        success: true,
        data: client,
        message: 'Employee deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
