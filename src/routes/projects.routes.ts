import express, { Router } from 'express';
import { ProjectController } from '../controllers/projects.controller.js';

const router: Router = express.Router();
const projectController: ProjectController = new ProjectController();
/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get a list of projects for signed user.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: The page number to fetch
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: The field to sort by
 *     responses:
 *       200:
 *         description: A list of projects retrieved successfully
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
 *                     $ref: '#/components/schemas/ProjectList'
 *                 message:
 *                   type: string
 *                   example: 'Projects retrieved successfully'
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
 *                   example: 'Both page and pageSize parameters are required'
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
router.get('/projects', projectController.getProjects);
/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create a new project or multiple projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/Project'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project(s) created successfully
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
 *                     - $ref: '#/components/schemas/Project'
 *                     - $ref: integer
 *                 message:
 *                   type: string
 *                   example: 'Project(s) created successfully'
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
router.post('/projects', projectController.createProjects);

// router.put('/projects', projectController.updateProjects);
/**
 * @swagger
 * /api/projects:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete all projects for a company
 *     parameters:
 *       - in: header
 *         name: company_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the company for which the projects will be deleted
 *     responses:
 *       204:
 *         description: Projects deleted successfully
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
 *                   example: 'Projects deleted successfully'
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

router.delete('/projects', projectController.deleteProjects);
/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Get a project by ID
 *     parameters:
 *       - in: header
 *         name: company_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the company for which the project will be retrieved
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the project to retrieve
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *                 message:
 *                   type: string
 *                   example: 'Project retrieved successfully'
 *       404:
 *         description: Project not found
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
 *                   example: 'Internal server error'
 */
router.get('/projects/:id', projectController.getProjectById);
router.post('/project/:id'); // error
/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     description: Updates a project by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: The ID of the project to update
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: projectData
 *         description: The project data to update
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Project'
 *     responses:
 *       204:
 *         description: Project updated successfully
 */
router.put('/project/:id', projectController.updateProjectById);
/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete a project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the project to delete
 *       - in: header
 *         name: company_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the company for which the project will be deleted
 *     responses:
 *       204:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Project'
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
router.delete('/project/:id', projectController.deleteProjectById);

export default router;
