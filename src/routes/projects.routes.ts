import express, { Router } from 'express';
import {
  getProjectsHandler,
  createProjectsHandler,
  updateProjectsHandler,
  deleteProjectsHandler,
  getProjectByIdHandler,
  updateProjectByIdHandler,
  deleteProjectByIdHandler,
} from '../controllers/projects.js';

const router: Router = express.Router();

router.get('/projects', getProjectsHandler);
router.post('/projects', createProjectsHandler);
router.put('/projects', updateProjectsHandler);
router.delete('/projects', deleteProjectsHandler);
router.get('/projects/:id', getProjectByIdHandler);
router.post('/project/:id'); // error
router.put('/project/:id', updateProjectByIdHandler);
router.delete('/project/:id', deleteProjectByIdHandler);

export default router;
