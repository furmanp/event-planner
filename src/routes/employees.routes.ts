import { EmployeeController } from '../controllers/employees.controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();
const employeeController: EmployeeController = new EmployeeController();

/**
 * @swagger
 * /api/employees:
 *   get:
 *     tags:
 *       - Employees
 *     description: listing all the employees for a signed user. The request is using pagination.
 *     summary: Get a list of employees for a given company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: true
 *         description: Page number of the results to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         required: true
 *         description: Number of results to retrieve per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort the results by
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Employee'
 *                     totalItems:
 *                       type: number
 *                   example: { data: [{ id: 1, name: 'John Doe' }], totalItems: 1 }
 *                 message:
 *                   type: string
 *                   example: 'Employees retrieved successfully'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: 'Both page and pageSize parameters are required.'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
router.get('/employees', employeeController.getEmployees);
/**
 * @swagger
 * /api/employees:
 *   post:
 *     tags:
 *       - Employees
 *     description: Create one or more employees within a single request. If one employee is created, its data will be provided upon success. If multiple, total count will be returned instead.
 *     summary: Create one or more employees for a given company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Employee'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Employee'
 *           examples:
 *             single employee:
 *               summary: Create single employee
 *               value:
 *                 first_name: "John"
 *                 last_name: "Doe"
 *             multiple employees:
 *               summary: Create multiple employees
 *               value:
 *                 - first_name: "Uncle"
 *                   last_name: "Sam"
 *                 - first_name: "Aunt"
 *                   last_name: "Lily"
 *     responses:
 *       200:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: 'Employee created successfully'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
router.post('/employees', employeeController.createEmployees);
// router.put('/employees', employeeController.updateEmployees);
/**
 * @swagger
 * /api/employees:
 *   delete:
 *     tags:
 *       - Employees
 *     description: Deletes all the employees for singed user. Successful response returns number of records that got deleted.
 *     summary: Delete all employees for a given company
 *     parameters:
 *     responses:
 *       204:
 *         description: Employees deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: number
 *                   example: { count: 10 }
 *                 message:
 *                   type: string
 *                   example: 'Employees deleted successfully'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
router.delete('/employees', employeeController.deleteAllEmployees);
/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Get an employee by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the employee to retrieve
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: 'Employee retrieved successfully'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 'Not found'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees/:id'); // error
/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     tags:
 *       - Employees
 *     summary: Update an employee by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the employee to update
 *       - in: body
 *         name: employeeData
 *         description: Employee object that needs to be updated
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Employee'
 *     responses:
 *       204:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: 'Employee updated successfully'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
router.put('/employees/:id', employeeController.updateEmployeeById);
/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     tags:
 *       - Employees
 *     summary: Delete an employee by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the employee to delete
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: 'Employee deleted successfully'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
router.delete('/employees/:id', employeeController.deleteEmployeeById);

export default router;
