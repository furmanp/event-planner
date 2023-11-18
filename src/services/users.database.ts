import { User } from "../models/models.js";
import prisma, { handlePrismaError } from "../../libs/prisma.js";
import { hashPassword } from "../modules/auth.js";

export async function createUser(user: User): Promise<User> {
  try {
    return await prisma.users.create({
      data: {
        username: user.username,
        password: await hashPassword(user.password),
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
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
