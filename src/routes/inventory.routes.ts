import { InventoryController } from '../controllers/inventory.controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();
const inventoryController: InventoryController = new InventoryController();
/**
 * @swagger
 * /api/inventory:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Get inventory data
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number of the inventory data to retrieve
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: true
 *         description: Number of items per page in the inventory data
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort the inventory data by a specific field
 *     responses:
 *       200:
 *         description: Inventory data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       item_id:
 *                         type: string
 *                       company_id:
 *                         type: integer
 *                       project_id:
 *                         type: string
 *                       check_in:
 *                         type: string
 *                       check_out:
 *                         type: string
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of items in the inventory
 */
router.get('/inventory', inventoryController.getInventory);
/**
 * @swagger
 * /api/inventory:
 *   post:
 *     tags:
 *       - Inventory
 *     summary: Create inventory data
 *     parameters:
 *       - in: body
 *         name: inventoryData
 *         schema:
 *           oneOf:
 *             - $ref: '#/components/schemas/Inventory'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 *         required: true
 *         description: Inventory data to be created
 *     responses:
 *       201:
 *         description: Inventory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/Inventory'
 *                     - $ref: integer
 *                 message:
 *                   type: string
 *                   example: 'Item created.'
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
 *                   example: 'Error message'
 */
router.post('/inventory', inventoryController.createInventory);
// router.put('/inventory', inventoryController.updateInventory);

/**
 * @swagger
 * /api/inventory:
 *   delete:
 *     tags:
 *       - Inventory
 *     summary: Delete inventory data
 *     parameters:
 *     responses:
 *       204:
 *         description: Inventory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: integer
 *                 message:
 *                   type: string
 *                   example: 'Inventory deleted successfully'
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
 *                     message: "Internal server error"
 */
router.delete('/inventory', inventoryController.deleteInventory);
/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     tags:
 *       - Inventory
 *     summary: Get inventory data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the inventory to retrieve
 *     responses:
 *       200:
 *         description: Inventory retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Inventory'
 *                 message:
 *                   type: string
 *                   example: 'Inventory retrieved successfully'
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
 *                   example: 'Internal server error'
 */
router.get('/inventory/:id', inventoryController.getInventoryById);

router.post('/inventory/:id'); // error
/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     tags:
 *       - Inventory
 *     summary: Update inventory data by ID
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the inventory to update
 *       - in: body
 *         name: inventoryData
 *         schema:
 *           $ref: '#/components/schemas/Inventory'
 *         required: true
 *         description: Inventory object containing updated data
 *     responses:
 *       204:
 *         description: Inventory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Inventory'
 *                 message:
 *                   type: string
 *                   example: 'Inventory updated successfully'
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
 *                   example: 'Internal server error'
 */
router.put('/inventory/:id', inventoryController.updatesInventoryById);
/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     tags:
 *       - Inventory
 *     summary: Delete inventory data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the inventory to delete
 *     responses:
 *       204:
 *         description: Inventory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Inventory'
 *                 message:
 *                   type: string
 *                   example: 'Item deleted successfully'
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
 *                   example: 'Internal server error'
 */
router.delete('/inventory/:id', inventoryController.deleteInventoryById);

export default router;
