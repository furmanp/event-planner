import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { User } from '../models/models.js';

export const createJWT = (user: User) => {
  return sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
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
