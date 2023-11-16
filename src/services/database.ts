import { Prisma, PrismaClient } from '@prisma/client';
import {
  Client,
  Employee,
  Inventory,
  PrismaError,
  Project,
  ProjectList,
  User,
} from '../models/models.js';
import { createJWT, hashPassword } from '../modules/auth.js';

const prisma: PrismaClient = new PrismaClient();

export async function getEmployees(
  page: number,
  pageSize: number,
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
    const employee: Employee = await prisma.employees.findUnique({
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

export function getClients(): Promise<Client[]>;
export function getClients(id: number): Promise<Client | null>;
export async function getClients(
  id?: number | null,
): Promise<Client[] | Client | null> {
  try {
    if (!id) {
      return await prisma.clients.findMany();
    } else {
      const client: Client = await prisma.clients.findUnique({
        where: {
          id: id,
        },
      });
      return client ? client : null;
    }
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function createClients(
  client: Client | Client[],
): Promise<Promise<Client> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(client)) {
      return await prisma.clients.create({
        data: client,
      });
    } else {
      return await prisma.clients.createMany({
        data: client,
      });
    }
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateClients(
  clients: Client[],
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.clients.updateMany({
      data: clients,
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteClients(): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.clients.deleteMany({});
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getClientById(id: number): Promise<Client | null> {
  try {
    const client: Client = await prisma.clients.findUnique({
      where: {
        id: id,
      },
    });
    return client ? client : null;
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function updateClientById(client: Client): Promise<Client> {
  try {
    return await prisma.clients.update({
      where: { id: client.id },
      data: {
        name: client.name,
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteClientById(id: number): Promise<Client> {
  try {
    return await prisma.clients.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

//TODO implement filtering functionality
export async function getInventory(
  page: number,
  pageSize: number,
  sortBy?: string,
): Promise<{
  data: Inventory[];
  totalItems: number;
}> {
  try {
    const skip: number =
      pageSize > 20 ? (page - 1) * 20 : (page - 1) * pageSize;
    const orderBy: object = {};

    if (sortBy) {
      orderBy[sortBy] = 'asc';
    }

    const data: Inventory[] = await prisma.inventory.findMany({
      skip,
      take: pageSize,
      orderBy,
    });

    const totalItems: number = await prisma.inventory.count();

    return {
      data,
      totalItems,
    };
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateInventory(
  inventory: Inventory[],
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.inventory.updateMany({
      data: inventory,
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteInventory(): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.inventory.deleteMany({});
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function createInventory(
  inventory: Inventory | Inventory[],
): Promise<Promise<Inventory> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(inventory)) {
      return await prisma.inventory.create({
        data: inventory,
      });
    } else {
      return await prisma.inventory.createMany({
        data: inventory,
      });
    }
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function getInventoryById(id: number): Promise<Inventory | null> {
  try {
    const inventory: Inventory = await prisma.inventory.findUnique({
      where: { id: id },
    });
    return inventory ? inventory : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateInventoryById(
  inventory: Inventory,
): Promise<Inventory> {
  try {
    return await prisma.inventory.update({
      where: { id: inventory.id },
      data: {
        name: inventory.name,
        stock: inventory.stock,
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteInventoryById(id: number): Promise<Inventory> {
  try {
    return await prisma.inventory.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getProjects(
  page: number,
  pageSize: number,
  sortBy?: string,
): Promise<{
  data: ProjectList[];
  totalItems: number;
}> {
  try {
    const skip: number =
      pageSize > 20 ? (page - 1) * 20 : (page - 1) * pageSize;
    const orderBy: object = {};

    if (sortBy) {
      orderBy[sortBy] = 'asc';
    }

    const data: ProjectList[] = await prisma.projects.findMany({
      select: {
        id: true,
        name: true,
        date: true,
      },
      skip,
      take: pageSize,
      orderBy,
    });

    const totalItems: number = await prisma.projects.count();

    return {
      data,
      totalItems,
    };
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function createProject(
  project: Project | Project[],
): Promise<Promise<Project> | Promise<Prisma.BatchPayload>> {
  try {
    if (!Array.isArray(project)) {
      return await prisma.projects.create({
        data: project,
      });
    } else {
      return await prisma.projects.createMany({
        data: project,
      });
    }
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function updateProjects(
  projects: Project[],
): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.projects.updateMany({
      data: projects,
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteProjects(): Promise<Prisma.BatchPayload> {
  try {
    return await prisma.projects.deleteMany({});
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  try {
    const project: Project = await prisma.projects.findUnique({
      where: { id: id },
    });
    return project ? project : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function updateProjectById(project: Project): Promise<Project> {
  try {
    return await prisma.projects.update({
      where: { id: project.id },
      data: {
        id: project.id,
        name: project.name,
        date: project.date,
        client_id: project.client_id,
        project_owner_id: project.project_owner_id,
      },
    });
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function deleteProjectById(id: number): Promise<Project> {
  try {
    return await prisma.projects.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log();
    throw error;
  }
}

export async function createUser(user: User): Promise<string> {
  try {
    const userData: User = await prisma.users.create({
      data: {
        username: user.username,
        password: await hashPassword(user.password),
      },
    });
    if (userData) {
      return createJWT(userData);
    } else {
      return 'no token';
    }
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

export async function getUserById(username: string): Promise<User | null> {
  try {
    const user: User = await prisma.users.findUnique({
      where: { username: username },
    });
    return user ? user : null;
  } catch (error) {
    console.log();
    throw handlePrismaError(error);
  }
}

function handlePrismaError(error: PrismaError): PrismaError {
  switch (error.constructor) {
    case Prisma.PrismaClientKnownRequestError:
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
    code: 999,
    message: 'unknown error',
  };
}
