import { Employee } from '../models/models.js';
import { Prisma } from '@prisma/client';
import prisma, { handlePrismaError } from '../libs/prisma.js';

export async function getEmployees(
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

export async function deleteEmployees(): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.employees.deleteMany({});
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getEmployeeById(id: number): Promise<Employee | null> {
  try {
    const employee: Employee | null = await prisma.employees.findUnique({
      where: { id: id },
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
      where: { id: employee.id },
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

export async function deleteEmployeeById(id: number): Promise<Employee> {
  try {
    return await prisma.employees.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}
