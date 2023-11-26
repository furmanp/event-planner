import {
  getClientsHandler,
  createClientsHandler,
  updateClientsHandler,
  deleteClientsHandler,
  getClientByIdHandler,
  updateClientByIdHandler,
  deleteClientByIdHandler,
} from '../handlers/clients.js';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/clients', getClientsHandler);
router.post('/client', createClientsHandler);
router.put('/client', updateClientsHandler);
router.delete('/client', deleteClientsHandler);
router.get('/clients/:id', getClientByIdHandler);
router.post('/clients/:id');
router.put('/client/:id', updateClientByIdHandler);
router.delete('/client/:id', deleteClientByIdHandler);

export default router;
