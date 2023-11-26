import {
  getInventoryHandler,
  createInventoryHandler,
  updateInventoryHandler,
  deleteInventoryHandler,
  getInventoryByIdHandler,
  updatesInventoryByIdHandler,
  deleteInventoryByIdHandler,
} from '../controllers/inventory.js';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/inventory', getInventoryHandler);
router.post('/inventory', createInventoryHandler);
router.put('/inventory', updateInventoryHandler);
router.delete('/inventory', deleteInventoryHandler);
router.get('/inventory/:id', getInventoryByIdHandler);
router.post('/inventory/:id'); // error
router.put('/inventory/:id', updatesInventoryByIdHandler);
router.delete('/inventory/:id', deleteInventoryByIdHandler);

export default router;
