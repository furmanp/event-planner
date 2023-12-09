import { Request, Response } from 'express';
import { User } from '../models/models.js';
import { createUser, getUserByUsername } from '../services/users.service.js';
import { comparePasswords, createJWT } from '../modules/auth.js';

export class UsersController {
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
}
