import { UsersController } from '../controllers/users.controller.js';
import { ProtectMiddleware } from './../middleware/auth.js';
import express, { Router } from 'express';

const router: Router = express.Router();

const userController: UsersController = new UsersController()
router.post(
  '/user',
  ProtectMiddleware.verifyPasswordSafety,
  userController.createUsersHandler,
);
router.post('/signin', userController.singIn);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:id/:token', userController.resetPassword);

export default router;
