import {
  getEmployeesHandler,
  createEmployeesHandler,
  updateEmployeesHandler,
  deleteAllEmployeesHandler,
  getEmployeeByIdHandler,
  updateEmployeeByIdHandler,
  deleteEmployeeByIdHandler,
} from '../controllers/employees.js';
import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/employees', getEmployeesHandler);
router.post('/employees', createEmployeesHandler);
router.put('/employees', updateEmployeesHandler);
router.delete('/employees', deleteAllEmployeesHandler);
router.get('/employees/:id', getEmployeeByIdHandler);
router.post('/employees/:id'); // error
router.put('/employees/:id', updateEmployeeByIdHandler);
router.delete('/employees/:id', deleteEmployeeByIdHandler);

export default router;
