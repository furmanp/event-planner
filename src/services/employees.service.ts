import { Employee } from '../models/models.js';
import { Prisma } from '@prisma/client';
import prisma, { handlePrismaError } from '../libs/prisma.js';

export async function getEmployees(
  user: number,
  page: number = 1,
  pageSize: number = 20,
  sortBy: string = 'id',
): Promise<{
  data: Employee[];
  totalItems: number;
}> {
  try {
    const skip: number =
      pageSize > 20 ? (page - 1) * 20 : (page - 1) * pageSize;
    const orderBy: object = {};
    if (sortBy) {
      orderBy[sortBy] = 'asc';
    }
    const data: Employee[] = await prisma.employees.findMany({
      where: {
        user_id: user,
      },
      skip,
      take: pageSize,
      orderBy,
    });
    const totalItems: number = await prisma.employees.count();
    return {
      data,
      totalItems,
    };
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function createEmployee(
  employee: Employee | Employee[],
): Promise<Promise<Employee> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(employee)) {
      return await prisma.employees.create({
        data: employee,
      });
    } else {
      return await prisma.employees.createMany({
        data: employee,
      });
    }
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateEmployees(
  employees: Employee[],
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.employees.updateMany({
      data: employees,
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteEmployees(
  user_id: number,
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.employees.deleteMany({
      where: {
        user_id: user_id,
      },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getEmployeeById(
  id: number,
  user_id: number,
): Promise<Employee | null> {
  try {
    const employee: Employee | null = await prisma.employees.findUnique({
      where: { id: id, user_id: user_id },
    });
    return employee ? employee : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateEmployeeById(
  employee: Employee,
): Promise<Employee> {
  try {
    return await prisma.employees.update({
      where: { id: employee.id, user_id: employee.user_id },
      data: {
        first_name: employee.first_name,
        last_name: employee.last_name,
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteEmployeeById(
  id: number,
  user_id: number,
): Promise<Employee> {
  try {
    return await prisma.employees.delete({
      where: { id: id, user_id: user_id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}
