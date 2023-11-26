import express, { Router } from 'express';
import {
  getEquipmentHandler,
  createEquipmentHandler,
  updateEquipmentHandler,
  deleteEquipmentHandler,
  getEquipmentByIdHandler,
  updateEquipmentByIdHandler,
  deleteEquipmentByIdHandler,
} from '../handlers/equipment.handler.js';

export const router: Router = express.Router();

router.get('/equipment', getEquipmentHandler);
router.post('/equipment', createEquipmentHandler);
router.put('/equipment', updateEquipmentHandler);
router.delete('/equipment', deleteEquipmentHandler);

router.get('/equipment/:id', getEquipmentByIdHandler);
router.post('/equipment/:id'); // error
router.put('/equipment/:id', updateEquipmentByIdHandler);
router.delete('/equipment/:id', deleteEquipmentByIdHandler);

export default router;
