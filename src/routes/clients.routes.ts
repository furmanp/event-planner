import { ClientController } from '../controllers/clients.controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();
const clientController: ClientController = new ClientController();

router.get('/clients', clientController.getClients);
router.post('/client', clientController.createClients);
router.put('/client', clientController.updateClients);
router.delete('/client', clientController.deleteClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients/:id');
router.put('/client/:id', clientController.updateClientById);
router.delete('/client/:id', clientController.updateClientById);

export default router;
