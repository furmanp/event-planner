import { ClientController } from '../controllers/clients.controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();
const clientController: ClientController = new ClientController();

router.get('/clients', clientController.getClients);
router.post('/clients', clientController.createClients);
// router.put('/clients', clientController.updateClients);
router.delete('/clients', clientController.deleteClients);
router.get('/clients/:id', clientController.getClientById);
router.post('/clients/:id');
router.put('/clients/:id', clientController.updateClientById);
router.delete('/clients/:id', clientController.updateClientById);

export default router;
