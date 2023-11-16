import { Request, Response } from 'express';
import { User } from '../models/models.js';
import { createUser, getUserById } from '../services/database.js';
import { comparePasswords, createJWT } from '../modules/auth.js';

export async function createUsersHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const userData: User = req.body;
  try {
    const result: string = await createUser(userData);
    res
      .status(201)
      .json({ success: true, token: result, message: 'User created.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}

export async function singIn(req: Request, res: Response): Promise<void> {
  try {
    const user: User | null = await getUserById(req.body.username);
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
