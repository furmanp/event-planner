import { User } from "../models/models.js";
import prisma, { handlePrismaError } from "../libs/prisma.js";
import { hashPassword } from "../modules/auth.js";
import { Prisma } from "@prisma/client";

export async function createUser(user: User): Promise<User> {
  if(!user.username || !user.password) {
    throw new Error("Username and password are required.")
  }
  try {
    return await prisma.users.create({
      data: {
        username: user.username,
        password: await hashPassword(user.password),
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

export async function getUserById(username: string): Promise<User | null> {
  try {
    const user: User | null = await prisma.users.findUnique({
      where: { username: username },
    });
    return user ? user : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}
