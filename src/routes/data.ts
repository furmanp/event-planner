import express, { Router } from 'express';
import {
  createEmployeesHandler,
  deleteAllEmployeesHandler,
  deleteEmployeeByIdHandler,
  getEmployeeByIdHandler,
  getEmployeesHandler,
  updateEmployeeByIdHandler,
  updateEmployeesHandler,
} from '../handlers/employees.js';
import {
  createClientsHandler,
  deleteClientByIdHandler,
  deleteClientsHandler,
  getClientByIdHandler,
  getClientsHandler,
  updateClientByIdHandler,
  updateClientsHandler,
} from '../handlers/clients.js';
import {
  createInventoryHandler,
  deleteInventoryByIdHandler,
  deleteInventoryHandler,
  getInventoryByIdHandler,
  getInventoryHandler,
  updateInventoryHandler,
  updatesInventoryByIdHandler,
} from '../handlers/inventory.js';
import {
  createProjectsHandler,
  deleteProjectByIdHandler,
  deleteProjectsHandler,
  getProjectByIdHandler,
  getProjectsHandler,
  updateProjectByIdHandler,
  updateProjectsHandler,
} from '../handlers/projects.js';

const router: Router = express.Router();

router.get('/employees', getEmployeesHandler);
router.post('/employees', createEmployeesHandler);
router.put('/employees', updateEmployeesHandler);
router.delete('/employees', deleteAllEmployeesHandler);

router.get('/employees/:id', getEmployeeByIdHandler);
router.post('/employees/:id'); // error
router.put('/employees/:id', updateEmployeeByIdHandler);
router.delete('/employees/:id', deleteEmployeeByIdHandler);

router.get('/clients', getClientsHandler);
router.post('/client', createClientsHandler);
router.put('/client', updateClientsHandler);
router.delete('/client', deleteClientsHandler);

router.get('/clients/:id', getClientByIdHandler);
router.post('/clients/:id');
router.put('/client/:id', updateClientByIdHandler);
router.delete('/client/:id', deleteClientByIdHandler);

router.get('/inventory', getInventoryHandler);
router.post('/inventory', createInventoryHandler);
router.put('/inventory', updateInventoryHandler);
router.delete('/inventory', deleteInventoryHandler);

router.get('/inventory/:id', getInventoryByIdHandler);
router.post('/inventory/:id'); // error
router.put('/inventory/:id', updatesInventoryByIdHandler);
router.delete('/inventory/:id', deleteInventoryByIdHandler);

router.get('/projects', getProjectsHandler);
router.post('/projects', createProjectsHandler);
router.put('/projects', updateProjectsHandler);
router.delete('/projects', deleteProjectsHandler);

router.get('/projects/:id', getProjectByIdHandler);
router.post('/project/:id'); // error
router.put('/project/:id', updateProjectByIdHandler);
router.delete('/project/:id', deleteProjectByIdHandler);

export default router;
