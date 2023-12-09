import { User } from '../models/models.js';
import prisma, { handlePrismaError } from '../libs/prisma.js';
import { hashPassword } from '../modules/auth.js';
import { Prisma } from '@prisma/client';
// import { randomBytes } from 'crypto';

export async function createUser(user: User): Promise<User> {
  if (!user.username || !user.password) {
    throw new Error('Username and password are required.');
  }
  // TODO implement logic that generate verification token
  // const verifyToken = randomBytes(32).toString('hex')
  try {
    return await prisma.users.create({
      data: {
        username: user.username,
        password: await hashPassword(user.password),
        //mail: mail address,
        //verifyToken: verifyToken,
        //verified: false,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('Username is already in use.');
    } else {
      throw handlePrismaError(error);
    }
  }
}

export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  try {
    const user: User | null = await prisma.users.findUnique({
      where: { username: username },
    });
    return user ? user : null;
  } catch (error) {
    throw handlePrismaError(error);
  }
}

// export async function getUserByVerifyToken() {}
