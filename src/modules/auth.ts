import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { User } from '../models/models.js';
import { config } from '../../config.js';

export const createJWT = (user: User, expiresIn: string | number): string => {
  const { sign } = jwt;
  return sign({ id: user.id, username: user.username }, config.JWT_TOKEN, {  expiresIn });
};

export function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function hashPassword(password: string): Promise<string> {
  return hash(password, 5);
}
