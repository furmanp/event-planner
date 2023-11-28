import express, { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller.js';
export const router: Router = express.Router();

const equipmentController = new EquipmentController();

router.get('/equipment', equipmentController.getEquipment);
router.post('/equipment', equipmentController.createEquipment);
router.put('/equipment', equipmentController.updateEquipment);
router.delete('/equipment', equipmentController.deleteEquipment);

router.get('/equipment/:id', equipmentController.getEquipmentById);
router.post('/equipment/:id'); // error
router.put('/equipment/:id', equipmentController.updateEquipmentById);
router.delete('/equipment/:id', equipmentController.deleteEquipmentById);

router.get('/equipemnt/:date'); //getEquipmentByDate
router.get('/equipemnt/:project_id'); //getEquipmentByProjectId

export default router;
