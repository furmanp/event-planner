import { Prisma } from '@prisma/client';
import prisma, { handlePrismaError } from '../libs/prisma.js';
import { Project, ProjectList } from '../models/models.js';

// export const prisma: PrismaClient = new PrismaClient();

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
      const projectDate = new Date(project.date);
      return await prisma.projects.create({
        data: {
          name: project.name,
          client_id: project.client_id,
          date: projectDate,
          company_id: project.company_id,
        },
      });
    } else {
      const parsedInput: Project[] = [];
      project.forEach((singleProject) => {
        const projectDate = new Date(singleProject.date);
        parsedInput.push({
          name: singleProject.name,
          client_id: singleProject.client_id,
          date: projectDate,
          company_id: singleProject.company_id,
        });
      });
      return await prisma.projects.createMany({
        data: parsedInput,
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
    const project: Project | null = await prisma.projects.findUnique({
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
        company_id: project.company_id,
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
