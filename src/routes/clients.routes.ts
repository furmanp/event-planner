import { ClientController } from '../controllers/clients.controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();
const clientController: ClientController = new ClientController();
/**
 * @swagger
 * /api/clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Retrieve clients for a given company
 *     responses:
 *       200:
 *         description: Clients retrieved successfully
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
 *                     $ref: '#/components/schemas/Client'
 *       401:
 *         description: Bearer token wrong/not provided
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
 *                   example: "Unauthorized"
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
 *                   example: "Internal server error"
 */
router.get('/clients', clientController.getClients);
/**
 * @swagger
 * /api/clients:
 *   post:
 *     tags:
 *       - Clients
 *     description: Create one or more clients within a single request. If one client is created, its data will be provided upon success. If multiple, total count will be returned instead.
 *     summary: Create one or more clients for a given company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Client'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Client'
 *           examples:
 *             single client:
 *               summary: Create single client
 *               value:
 *                 name: "Client 1"
 *                 user_id: "123"
 *             multiple clients:
 *               summary: Create multiple clients
 *               value:
 *                 - name: "Client 1"
 *                   user_id: "123"
 *                 - name: "Client 2"
 *                   user_id: "456"
 *     responses:
 *       200:
 *         description: Clients created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                     $ref: '#/components/schemas/Client'
 *                 message:
 *                   type: string
 *                   example: 'Clients created successfully'
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
router.post('/clients', clientController.createClients);
// router.put('/clients', clientController.updateClients);
/**
 * @swagger
 * /api/clients:
 *   delete:
 *     tags:
 *       - Clients
 *     description: All clients for a signed user are deleted.
 *     summary: Delete all clients for a given company
 *     responses:
 *       204:
 *         description: Clients deleted successfully
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
 *                   example: 'Clients deleted successfully'
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
router.delete('/clients', clientController.deleteClients);
/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Get a client by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the client to be retrieved
 *     responses:
 *       200:
 *         description: Client retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *                 message:
 *                   type: string
 *                   example: 'Client retrieved successfully'
 *       404:
 *         description: Client not found
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
 *                   example: 'Client not found'
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
router.get('/clients/:id', clientController.getClientById);
// router.post('/clients/:id');

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     tags:
 *       - Clients
 *     summary: Update a client by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the client to be updated
 *       - in: requestBody
 *         name: clientData
 *         schema:
 *           $ref: '#/components/schemas/Client'
 *         description: Client data to be updated
 *     responses:
 *       204:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *                 message:
 *                   type: string
 *                   example: 'Client updated successfully'
 *       404:
 *         description: Client not found
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
 *                   example: 'Client not found'
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
router.put('/clients/:id', clientController.updateClientById);
/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     tags:
 *       - Clients
 *     summary: Delete a client by ID for a given company
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the client to be deleted
 *     responses:
 *       204:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Client'
 *                 message:
 *                   type: string
 *                   example: 'Client deleted successfully'
 *       404:
 *         description: Client not found
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
 *                   example: 'Client not found'
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
router.delete('/clients/:id', clientController.deleteClientById);

export default router;
