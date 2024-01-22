import express, { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller.js';
export const router: Router = express.Router();

const equipmentController = new EquipmentController();
/**
 * @swagger
 * /api/equipment:
 *   get:
 *     tags:
 *       - Equipment
 *     summary: Get equipment for a given company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: true
 *         description: Page number of the equipment to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *         required: true
 *         description: Number of equipment items to retrieve per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         required: false
 *         description: Field to sort the equipment by
 *     responses:
 *       200:
 *         description: Equipment retrieved successfully
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
 *                         $ref: '#/components/schemas/Equipment'
 *                     totalItems:
 *                       type: number
 *                   example:
 *                     data: {
 *                       "data": [
 *                         {
 *                           "id": 1,
 *                           "name": "Equipment 1",
 *                           "description": "Description of equipment 1",
 *                           "company_id": 1
 *                         },
 *                         {
 *                           "id": 2,
 *                           "name": "Equipment 2",
 *                           "description": "Description of equipment 2",
 *                           "company_id": 1
 *                         }
 *                       ],
 *                       "totalItems": 2
 *                     }
 *                 message:
 *                   type: string
 *                   example: 'Equipment retrieved successfully'
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
 */
router.get('/equipment', equipmentController.getEquipment);
/**
 * @swagger
 * /api/equipment:
 *   post:
 *     tags:
 *       - Equipment
 *     summary: Create a new employee or multiple employees
 *     parameters:
 *       - in: body
 *         name: employeeData
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             company_id:
 *               type: number
 *         required: true
 *         description: Employee data to be created
 *     responses:
 *       201:
 *         description: Employee(s) created successfully
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
 *                     id:
 *                       type: number
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     company_id:
 *                       type: number
 *                   example:
 *                     count: 2
 *                     data: [
 *                       {
 *                         "id": 1,
 *                         "first_name": "John",
 *                         "last_name": "Doe",
 *                         "company_id": 1
 *                       },
 *                       {
 *                         "id": 2,
 *                         "first_name": "Jane",
 *                         "last_name": "Doe",
 *                         "company_id": 1
 *                       }
 *                     ]
 *                 message:
 *                   type: string
 *                   example: "2 employees created."
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
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                   example:
 *                     message: "Internal server error."
 */
router.post('/equipment', equipmentController.createEquipment);

// router.put('/equipment', equipmentController.updateEquipment);

/**
 * @swagger
 * /api/employees:
 *   delete:
 *     tags:
 *       - Employees
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
 */
router.delete('/equipment', equipmentController.deleteEquipment);
/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     tags:
 *       - Equipment
 *     summary: Get an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     first_name:
 *                       type: string
 *                     last_name:
 *                       type: string
 *                     company_id:
 *                       type: number
 *                   example: { id: 1, first_name: 'John', last_name: 'Doe', company_id: 1 }
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
 */
router.get('/equipment/:id', equipmentController.getEquipmentById);

router.post('/equipment/:id'); // error
/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     tags:
 *       - Equipment
 *     summary: Update equipment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the equipment to update
 *       - in: body
 *         name: equipment
 *         description: Equipment object that needs to be updated
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             item_id:
 *               type: string
 *             project_id:
 *               type: string
 *             check_in:
 *               type: string
 *             check_out:
 *               type: string
 *     responses:
 *       204:
 *         description: Equipment updated successfully
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
 *                     id:
 *                       type: number
 *                     item_id:
 *                       type: string
 *                     company_id:
 *                       type: number
 *                     project_id:
 *                       type: string
 *                     check_in:
 *                       type: date
 *                     check_out:
 *                       type: date
 *                 message:
 *                   type: string
 *                   example: Equipment updated successfully
 */
router.put('/equipment/:id', equipmentController.updateEquipmentById);
/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     tags:
 *       - Equipment
 *     summary: Delete equipment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the equipment to delete
 *     responses:
 *       204:
 *         description: Equipment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     item_id:
 *                       type: string
 *                     company_id:
 *                       type: integer
 *                     project_id:
 *                       type: string
 *                     check_in:
 *                       type: string
 *                     check_out:
 *                       type: string
 *                 message:
 *                   type: string
 */
router.delete('/equipment/:id', equipmentController.deleteEquipmentById);

router.get('/equipment/:date'); //getEquipmentByDate
router.get('/equipment/:project_id'); //getEquipmentByProjectId

export default router;
