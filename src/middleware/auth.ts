import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';

export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}

export class ProtectMiddleware {
  static protect(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ): void {
    const { verify } = jwt;
    const bearer: string | undefined = req.headers.authorization;

    if (!bearer) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }
    const [, token] = bearer.split(' ');

    if (!token) {
      res.status(401).json({ message: 'Bearer token invalid.' });
      return;
    }
    try {
      const user = <jwt.JwtPayload>verify(token, config.JWT_TOKEN);
      req.headers['user_id'] = user.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Wrong password.' });
    }
  }
  static verifyPasswordSafety(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const password = req.body.password;

    if (!password) {
      res.status(400).json({ error: 'Password is required.' });
      return;
    }

    const isSafe = ProtectMiddleware.isPasswordSafe(password);

    if (!isSafe) {
      res
        .status(400)
        .json({ error: 'Password does not meet safety requirements.' });
      return;
    }

    next();
  }

  static isPasswordSafe(password: string): boolean {
    const minLength: number = 8;
    const hasUpperCase: boolean = /[A-Z]/.test(password);
    const hasLowerCase: boolean = /[a-z]/.test(password);
    const hasNumbers: boolean = /\d/.test(password);

    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
    );
  }
}
