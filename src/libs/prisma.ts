import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaError } from '../models/models.js';

const prisma: PrismaClient = new PrismaClient();

export function handlePrismaError(error: PrismaError): PrismaError {
  switch (error.constructor) {
    case Prisma.PrismaClientKnownRequestError:
      switch (error.code) {
        case 'P2002':
          return {
            code: error.code,
            message: 'Provided record already exists in the database',
          };
        case 'P2025':
          return {
            code: error.code,
            message:
              'Operation failed because it depends on one or more recrds that were required but not found.',
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
