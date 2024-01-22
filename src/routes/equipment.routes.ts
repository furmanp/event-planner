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
 *     description: listing all the equipment (reservations) for a signed user. List of equipment is returned with the number of total available items. The request is using pagination.
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
 *     summary: Create one or more equipment reservations in a single request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Equipment'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Equipment'
 *           examples:
 *             single reservation:
 *               summary: Create single reservation
 *               value:
 *                 project_id: 1
 *                 item_id: 1
 *                 check_in: "2024-01-01"
 *                 check_out: "2024-01-10"
 *             multiple reservations:
 *               summary: Create multiple reservations
 *               value:
 *                 -  project_id: 1
 *                    item_id: 1
 *                    check_in: "2024-01-01"
 *                    check_out: "2024-01-10"
 *                 -  project_id: 1
 *                    item_id: 2
 *                    check_in: "2024-01-01"
 *                    check_out: "2024-01-10"
 *     responses:
 *       201:
 *         description: Reservation(s) created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Equipment'
 *                 message:
 *                   type: string
 *                   example: "reservation created."
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
 * /api/equipment:
 *   delete:
 *     tags:
 *       - Equipment
 *     summary: Delete all equipments for a given company
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
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: number
 *                   example: { count: 10 }
 *                 message:
 *                   type: string
 *                   example: 'Equipment deleted successfully'
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
 *     summary: Get equipment by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the equipment to be retrieved
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
 *                   $ref: '#/components/schemas/Equipment'
 *                 message:
 *                   type: string
 *                   example: 'Equipment retrieved successfully'
 *       404:
 *         description: Equipment not found
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
 *                   example: 'Equipment not found'
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
 *                   example: Internal server error
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
 *       - in: requestBody
 *         name: equipment
 *         description: Equipment object that needs to be updated
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Equipment'
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
 *                       example: 1
 *                     item_id:
 *                       type: number
 *                       example: 1
 *                     project_id:
 *                       type: number
 *                       example: 1
 *                     check_in:
 *                       type: date
 *                       example: "2024-01-01"
 *                     check_out:
 *                       type: date
 *                       example: "2024-01-10"
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
 *                       type: number
 *                       example: 1
 *                     item_id:
 *                       type: number
 *                       example: 1
 *                     project_id:
 *                       type: number
 *                       example: 1
 *                     check_in:
 *                       type: date
 *                       example: "2024-01-01"
 *                     check_out:
 *                       type: date
 *                       example: "2024-01-10"
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.delete('/equipment/:id', equipmentController.deleteEquipmentById);

router.get('/equipment/:date'); //getEquipmentByDate
router.get('/equipment/:project_id'); //getEquipmentByProjectId

export default router;
