import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaError } from '../models/models.js';

const prisma: PrismaClient = new PrismaClient();

export function handlePrismaError(error: PrismaError): PrismaError {
  switch (error.constructor) {
    case Prisma.PrismaClientKnownRequestError:
      if (error.code === 'P2002') {
        return {
          code: error.code,
          message: 'Provided record already exists in the database',
        };
      }
      break;
    case Prisma.PrismaClientUnknownRequestError:
    case Prisma.PrismaClientValidationError:
    case Prisma.PrismaClientInitializationError:
    case Prisma.PrismaClientRustPanicError:
      return {
        code: error.code,
        message: error.message,
      };
  }
  return {
    code: '999',
    message: 'unknown error',
  };
}

export default prisma;
