import express, { Router } from 'express';
import {
  getEquipmentHandler,
  createEquipmentHandler,
  updateEquipmentHandler,
  deleteEquipmentHandler,
  getEquipmentByIdHandler,
  updateEquipmentByIdHandler,
  deleteEquipmentByIdHandler,
} from '../controllers/equipment.handler.js';

export const router: Router = express.Router();

router.get('/equipment', getEquipmentHandler);
router.post('/equipment', createEquipmentHandler);
router.put('/equipment', updateEquipmentHandler);
router.delete('/equipment', deleteEquipmentHandler);

router.get('/equipment/:id', getEquipmentByIdHandler);
router.post('/equipment/:id'); // error
router.put('/equipment/:id', updateEquipmentByIdHandler);
router.delete('/equipment/:id', deleteEquipmentByIdHandler);

router.get('/equipemnt/:date'); //getEquipmentByDate
router.get('/equipemnt/:project_id'); //getEquipmentByProjectId

export default router;
