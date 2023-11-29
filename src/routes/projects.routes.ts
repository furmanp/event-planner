import express, { Router } from 'express';
import { ProjectController } from '../controllers/projects.controller.js';

const router: Router = express.Router();
const projectController: ProjectController = new ProjectController();

router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.createProjects);
router.put('/projects', projectController.updateProjects);
router.delete('/projects', projectController.deleteProjects);

router.get('/projects/:id', projectController.getProjectById);
router.post('/project/:id'); // error
router.put('/project/:id', projectController.updateProjectById);
router.delete('/project/:id', projectController.deleteProjectById);

export default router;
