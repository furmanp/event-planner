import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}

export function protect(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
): void {
  const bearer: string = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }
  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401).json({ message: 'Bearer token invalid.' });
    return;
  }
  try {
    req.user = <string>verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Wrong password.' });
  }
}
