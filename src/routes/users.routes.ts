import { UsersController } from '../controllers/users.controller.js';
import { ProtectMiddleware } from './../middleware/auth.js';
import express, { Router } from 'express';

const router: Router = express.Router();

const userController: UsersController = new UsersController();
/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: This endpoint creates a new user and returns a JWT token upon successful creation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             user:
 *               summary: Example user
 *               value:
 *                 username: "newuser123"
 *                 password: "Password123!"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "User created."
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
router.post(
  '/user',
  ProtectMiddleware.verifyPasswordSafety,
  userController.createUsersHandler,
);
/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - Users
 *     summary: Sign in a user
 *     description: This endpoint signs in a user and returns a JWT token upon successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "Password123!"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Wrong password
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
 *                   example: "Wrong password"
 *       404:
 *         description: User not found
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
 *                   example: "User not found."
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
router.post('/signin', userController.singIn);
/**
 * @swagger
 * /forgot-password:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a one time link to reset user password
 *     description: Generates a password reset link for a user. Link is valid for 15 minutes.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: Username of the user
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               example: "user123"
 *     responses:
 *       201:
 *         description: Password reset link has been generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password reset link has been sent."
 *       404:
 *         description: Provided user does not exist in the database.
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
 *                   example: "User does not exist."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
router.post('/forgot-password', userController.forgotPassword);
/**
 * @swagger
 * /reset-password/{id}/{token}:
 *   post:
 *     tags:
 *       - Users
 *     summary: Reset forgotten password
 *     description: Resets the password for a user. ID and token are provided in the reset link.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the user
 *         in: path
 *         required: true
 *         type: integer
 *       - name: token
 *         description: Token for password reset
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         description: New password
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: "NewPassword123!"
 *       - name: repPassword
 *         description: Repeated new password
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             repPassword:
 *               type: string
 *               example: "NewPassword123!"
 *     responses:
 *       201:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully."
 *       401:
 *         description: Provided passwords are not the same.
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
 *                   example: "Provided passwords are different."
 *       404:
 *         description: User not found.
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
 *                   example: "Invalid user ID."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error."
 */
router.post('/reset-password/:id/:token', userController.resetPassword);

export default router;
