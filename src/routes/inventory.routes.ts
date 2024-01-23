import express, { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller.js';

const router: Router = express.Router();
const inventoryController: InventoryController = new InventoryController();
/**
 * @swagger
 * /api/inventory:
 *   get:
 *     tags:
 *       - Inventory
 *     description: Inventory is a set of items that company owns. Items are being borrowed/rented for a project as a project equipment.
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
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                    $ref: '#/components/schemas/Inventory'
 *                 totalItems:
 *                   type: integer
 *                   example: 1
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
router.get('/inventory', inventoryController.getInventory);
/**
 * @swagger
 * /api/inventory:
 *   post:
 *     tags:
 *       - Inventory
 *     description: Create one or more Inventory items. Items are bound do the users workspace.
 *     summary: Create inventory data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           oneOf:
 *             - $ref: '#/components/schemas/Inventory'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 *           examples:
 *             single item:
 *               summary: Create single item
 *               value:
 *                 name: "item 1"
 *                 stock: 100
 *             multiple items:
 *               summary: Create multiple items
 *               value:
 *                 - name: "item 1"
 *                   stock: 100
 *                 - name: "item 2"
 *                   stock: "456"
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
 *                   type: number
 *                   example: 5
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
 *       404:
 *         description: Inventory not found
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
 *                   example: 'Inventory not found'
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
 *     summary: Update an item by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the item to be updated
 *       - in: requestBody
 *         name: itemData
 *         schema:
 *           $ref: '#/components/schemas/Inventory'
 *         description: Client data to be updated
 *     responses:
 *       204:
 *         description: Item updated successfully
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
 *       404:
 *         description: Inventory not found
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
 *                   example: 'Inventory not found'
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
 *       404:
 *         description: Inventory not found
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
 *                   example: 'Inventory not found'
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
