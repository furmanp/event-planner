import { Request, Response } from 'express';
import {
  Project as IProject,
  ProjectList as IProjectList,

  RequestBody,
  RequestParams,

  RequestQuery,
  ResponseBody,

} from '../models/models.js';
import {
  createProject,
  deleteProjectById,
  deleteProjects,
  getProjectById,
  getProjects,
  updateProjectById,
  updateProjects,
} from '../services/projects.service.js';
import { Prisma } from '@prisma/client';

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The project ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the project.
 *           example: "Project Alpha"
 *         client_id:
 *           type: integer
 *           description: The ID of the client associated with the project.
 *           example: 1
 *         date:
 *           type: string
 *           format: date
 *           description: The date the project was created or is set to start.
 *           example: "2024-01-10"
 *         company_id:
 *           type: integer
 *           description: The ID of the company owning the project.
 *           example: 1
 *         project_equipment:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProjectEquipment'
 *       required:
 *         - name
 *         - client_id
 *         - date
 *         - company_id
 *       uniqueItems:
 *         - name
 *         - company_id
 */

export class ProjectController {
  async getProjects(
    req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
    res: Response,
  ): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    try {
      const {
        query,
      }: Request<RequestParams, ResponseBody, RequestBody, RequestQuery> = req;
      if (!query.page || !query.pageSize) {
        res.status(400).json({
          success: false,
          error: 'Both page and pageSize parameters are required.',
        });
        return;
      } else {
        const projects: {
          data: IProjectList[];
          totalItems: number;
        } = await getProjects(
          company_id,
          parseInt(query.page, 10),
          parseInt(query.pageSize, 10),
          query.sortBy,
        );
        res.status(200).json({ success: true, data: projects });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async createProjects(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    let projectData: IProject | IProject[] = req.body;
    if (Array.isArray(projectData)) {
      projectData = projectData.map((project) => ({
        ...project,
        company_id: company_id,
      }));
    } else {
      projectData = {
        ...projectData,
        company_id: company_id,
      };
    }
    try {
      const result: IProject | Prisma.BatchPayload = await createProject(
        projectData,
      );

      if ('count' in result) {
        res.status(201).json({
          success: true,
          data: result,
          message: `${result.count} projects created.`,
        });
      } else {
        res
          .status(201)
          .json({ success: true, data: result, message: 'Project created.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  async updateProjects(req: Request, res: Response): Promise<void> {
    const projectsData: IProject[] = req.body;

    try {
      const projects: Prisma.BatchPayload = await updateProjects(projectsData);
      res.status(204).json({
        success: true,
        data: projects,
        message: 'Projects updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteProjects(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    try {
      const projects: Prisma.BatchPayload = await deleteProjects(company_id);
      res.status(204).json({
        success: true,
        data: projects,
        message: 'Projects deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getProjectById(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    try {
      if (req.params.id) {
        const project: IProject | null = await getProjectById(
          parseInt(req.params.id, 10),
          company_id,
        );
        if (project) {
          res.status(200).json({ success: true, data: project });
        } else {
          res.status(404).json({ success: false, message: 'Not found' });
        }
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async updateProjectById(req: Request, res: Response): Promise<void> {
    const projectData: IProject = {
      id: parseInt(req.params.id, 10),
      name: req.body.name,
      date: req.body.date,
      client_id: req.body.client_id,
      company_id: req.body.company_id,
    };
    try {
      const project: IProject = await updateProjectById(projectData);
      res.status(204).json({
        success: true,
        data: project,
        message: 'Inventory updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteProjectById(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10);
    const company_id = parseInt(<string>req.headers.company_id, 10);
    try {
      const project: IProject = await deleteProjectById(id, company_id);
      res.status(204).json({
        success: true,
        data: project,
        message: 'Item deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
