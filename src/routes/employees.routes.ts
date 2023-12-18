import { EmployeeController } from '../controllers/employees.controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();
const employeeController: EmployeeController = new EmployeeController();

router.get('/employees', employeeController.getEmployees);
router.post('/employees', employeeController.createEmployees);
router.put('/employees', employeeController.updateEmployees);
router.delete('/employees', employeeController.deleteAllEmployees);

router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees/:id'); // error
router.put('/employees/:id', employeeController.updateEmployeeById);
router.delete('/employees/:id', employeeController.deleteEmployeeById);

export default router;
