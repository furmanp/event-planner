import { Request, Response } from 'express';
import { User } from '../models/models.js';
import { createUser, getUserById } from '../services/users.database.js';
import { comparePasswords, createJWT } from '../modules/auth.js';

export async function createUsersHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const userData: User = req.body;
  let token: string = ""
  try {
    const user: User= await createUser(userData);
    if(user) {
      token = createJWT(user)
    }
    res
      .status(201)
      .json({ success: true, token: token, message: 'User created.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}

export async function singIn(req: Request, res: Response): Promise<void> {
  try {
    const user: User | null = await getUserById(req.body.username);
    if(!user) {
     res.status(404).json({ success: false, message: 'User not found.'})
      return
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
