import {Request, Response} from "express";
import {Client} from "../models/models.js";
import {Prisma} from "@prisma/client";
import {
    createClients,
    deleteClientById,
    deleteClients,
    getClientById, getClients,
    updateClientById,
    updateClients
} from "../services/clients.database.js";

export async function getClientsHandler(_req: Request, res: Response): Promise<void> {

    try {
        const clients: Client[] = await getClients()
        if (clients) {
            res.status(200).json({success: true, data: clients})

        }
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export async function createClientsHandler(req: Request, res: Response): Promise<void> {
    const clientData: Client | Client[] = req.body
    try {
        const result: Client | Prisma.BatchPayload = await createClients(clientData)

        if ('count' in result) {
            res.status(201).json({success: true, data: result, message: `${result.count} clients created.`})
        } else {
            res.status(201).json({success: true, data: result, message: 'Client created.'})
        }
    } catch (error) {
        res.status(500).json({success: false, error: error});
    }
}

export async function updateClientsHandler(req: Request, res: Response): Promise<void> {
    const clientsData: Client[] = req.body;

    try {
        const clients: Prisma.BatchPayload = await updateClients(clientsData)
        res.status(204).json({success: true, data: clients, message: "Client updated successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteClientsHandler(_req: Request, res: Response): Promise<void> {
    try {
        const client: Prisma.BatchPayload = await deleteClients()
        res.status(204).json({success: true, data: client, message: "Clients deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function getClientByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        if (req.params.id) {
            const client: Client | null = await getClientById(parseInt(req.params.id, 10))
            if (client) {
                res.status(200).json({success: true, data: client})
            } else {
                res.status(404).json({success: false, message: 'Not found'})
            }
        }
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export async function updateClientByIdHandler(req: Request, res: Response): Promise<void> {
    const clientData: Client = {
        id: parseInt(req.params.id, 10), name: req.body.name
    }
    try {
        const client: Client = await updateClientById(clientData)
        res.status(204).json({success: true, data: client, message: "Employee updated successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteClientByIdHandler(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10)
    try {
        //TODO add 404 if employee with provided ID doesn't exist
        const client: Client = await deleteClientById(id)
        res.status(204).json({success: true, data: client, message: "Employee deleted successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}
