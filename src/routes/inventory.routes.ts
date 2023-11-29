import { InventoryController } from '../controllers/inventory.controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();
const inventoryController: InventoryController = new InventoryController();

router.get('/inventory', inventoryController.getInventory);
router.post('/inventory', inventoryController.createInventory);
router.put('/inventory', inventoryController.updateInventory);
router.delete('/inventory', inventoryController.deleteInventory);
router.get('/inventory/:id', inventoryController.getInventoryById);
router.post('/inventory/:id'); // error
router.put('/inventory/:id', inventoryController.updatesInventoryById);
router.delete('/inventory/:id', inventoryController.deleteInventoryById);

export default router;
