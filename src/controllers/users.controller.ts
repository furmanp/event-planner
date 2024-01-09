import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/models.js';
import {
  createUser,
  getUserById,
  getUserByUsername,
  updateUserPassword,
} from '../services/users.service.js';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth.js';
import { config } from '../../config.js';
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */
export class UsersController {
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the given username, password, and company.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User object that needs to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 message:
 *                   type: string
 *                   example: User created.
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
 *                   example: Internal server error message.
 */
async createUsersHandler(req: Request, res: Response): Promise<void> {
    const userData: User = req.body;
    let token: string = '';
    try {
      const user: User = await createUser(userData);
      if (user) {
        token = createJWT(user);
      }
      res
        .status(201)
        .json({ success: true, token: token, message: 'User created.' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async singIn(req: Request, res: Response): Promise<void> {
    try {
      const user: User | null = await getUserByUsername(req.body.username);
      if (!user) {
        res.status(404).json({ success: false, message: 'User not found.' });
        return;
      }
      const isValid: boolean = await comparePasswords(
        req.body.password,
        user.password,
      );

      if (!isValid) {
        res.status(401).json({ success: false, message: 'Wrong password' });
        return;
      } else {
        const token: string = createJWT(user);
        res.status(200).json({ success: true, token: token });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { userName } = req.body;
      const user = await getUserByUsername(userName);
      if (!user) {
        res
          .status(404)
          .json({ success: false, message: 'User does not exists' });
      } else {
        const secret = config.JWT_TOKEN + user.password;
        const { sign } = jwt;
        const token = sign({ id: user.id, username: user.username }, secret, {
          expiresIn: '15m',
        });
        const link = `http://localhost:8080/reset-password/${user.id}/${token}`;
        console.log(link);
        res.status(201).json({
          success: true,
          message: 'Password reset link has been sent',
          userId: user.id,
          token: token,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const { id, token } = req.params;
    const { password, repPassword } = req.body;

    const user = await getUserById(2);
    console.log(user);
    if (password !== repPassword) {
      res
        .status(401)
        .json({ success: false, message: 'Provided passwords are different' });
    }

    try {
      const user = await getUserById(parseInt(id, 10));

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Invalid user Id',
        });
        return;
      }

      const isPasswordValid: boolean = await comparePasswords(
        password,
        user!.password,
      );
      if (isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'New password cannot be the same as the old one.',
        });
        return;
      }

      const secret: string = config.JWT_TOKEN + user?.password;
      const isTokenValid = jwt.verify(token, secret);

      if (isTokenValid) {
        const hashedPassword = await hashPassword(password);
        const user: User = await updateUserPassword(
          parseInt(id, 10),
          hashedPassword,
        );

        if (user) {
          res
            .status(201)
            .json({ success: true, message: `Password updated succesfully.` });
        }
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }
}
