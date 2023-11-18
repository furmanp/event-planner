import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { config } from "../../config.js";

export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}

export function protect(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
): void {
  const {verify} = jwt
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
      req.user = <string>verify(token, config.JWT_TOKEN);
      next();
  } catch (error) {
    res.status(401).json({ message: 'Wrong password.' });
  }
}
