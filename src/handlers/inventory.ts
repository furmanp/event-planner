import {Request, Response} from "express";
import {Inventory, RequestBody, RequestParams, RequestQuery, ResponseBody} from "../models/models.js";
import {
    createInventory,
    deleteInventory,
    deleteInventoryById,
    getInventory,
    getInventoryById,
    updateInventory,
    updateInventoryById
} from "../services/database.js";
import {Prisma} from "@prisma/client";

//TODO add filtering and sorting the data
export async function getInventoryHandler(req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response): Promise<void> {
    try {
        const {query}: Request<RequestParams, ResponseBody, RequestBody, RequestQuery> = req
        if (!query.page || !query.pageSize) {
            res.status(400).json({success: false, error: 'Both page and pageSize parameters are required.'});
            return;
        } else {
            const inventory: {
                data: Inventory[],
                totalItems: number
            } = await getInventory(parseInt(query.page, 10), parseInt(query.pageSize, 10), query.sortBy)
            res.status(200).json({success: true, data: inventory})
        }
    } catch (error) {
        console.error('Error fetching inventory: ', error)
        res.status(500).json({success: false, error: 'Internal server error'})
    }
}

export async function updateInventoryHandler(req: Request, res: Response): Promise<void> {
    const inventoryData: Inventory[] = req.body;

    try {
        const inventory: Prisma.BatchPayload = await updateInventory(inventoryData)
        res.status(204).json({success: true, data: inventory, message: "Client updated successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteInventoryHandler(_req: Request, res: Response): Promise<void> {
    try {
        const inventory: Prisma.BatchPayload = await deleteInventory()
        res.status(204).json({success: true, data: inventory, message: "Clients deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function createInventoryHandler(req: Request, res: Response): Promise<void> {
    const inventoryData: Inventory | Inventory[] = req.body
    try {
        const result: Inventory | Prisma.BatchPayload = await createInventory(inventoryData)

        if ('count' in result) {
            res.status(201).json({success: true, data: result, message: `${result.count} items created.`})
        } else {
            res.status(201).json({success: true, data: result, message: 'Item created.'})
        }
    } catch (error) {
        res.status(500).json({success: false, error: error});

    }
}


export async function getInventoryByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        const id: number = parseInt(req.params.id)
        const inventory: Inventory = await getInventoryById(id)
        res.status(200).json({success: true, data: inventory})
    } catch (error) {
        console.error('Error fetching inventory: ', error)
        res.status(500).json({success: false, error: 'Internal server error'})

    }
}

export async function updatesInventoryByIdHandler(req: Request, res: Response): Promise<void> {
    const inventoryData: Inventory = {
        id: parseInt(req.params.id, 10), name: req.body.name, stock: req.body.stock
    }
    try {
        const inventory: Inventory = await updateInventoryById(inventoryData)
        res.status(204).json({success: true, data: inventory, message: "Inventory updated successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteInventoryByIdHandler(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10)
    try {
        const inventory: Inventory = await deleteInventoryById(id)
        res.status(204).json({success: true, data: inventory, message: "Item deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}
