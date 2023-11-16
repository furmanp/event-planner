import {Request, Response} from "express";
import {Project, ProjectList, RequestBody, RequestParams, RequestQuery, ResponseBody} from "../models/models.js";
import {
    createProject,
    deleteProjectById,
    deleteProjects,
    getProjectById,
    getProjects,
    updateProjectById,
    updateProjects
} from "../services/database.js";
import {Prisma} from "@prisma/client";

export async function getProjectsHandler(req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response): Promise<void> {
    try {
        const {query}: Request<RequestParams, ResponseBody, RequestBody, RequestQuery> = req
        if (!query.page || !query.pageSize) {
            res.status(400).json({success: false, error: 'Both page and pageSize parameters are required.'});
            return;
        } else {
            const projects: {
                data: ProjectList[],
                totalItems: number
            } = await getProjects(parseInt(query.page, 10), parseInt(query.pageSize, 10), query.sortBy)
            res.status(200).json({success: true, data: projects})
        }
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export async function createProjectsHandler(req: Request, res: Response): Promise<void> {
    const projectData: Project | Project[] = req.body
    try {
        const result: Project | Prisma.BatchPayload = await createProject(projectData)

        if ('count' in result) {
            res.status(201).json({success: true, data: result, message: `${result.count} projects created.`})
        } else {
            res.status(201).json({success: true, data: result, message: 'Project created.'})
        }
    } catch (error) {
        res.status(500).json({success: false, error: error});

    }
}

export async function updateProjectsHandler(req: Request, res: Response): Promise<void> {
    const projectsData: Project[] = req.body;

    try {
        const projects: Prisma.BatchPayload = await updateProjects(projectsData)
        res.status(204).json({success: true, data: projects, message: "Projects updated successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteProjectsHandler(_req: Request, res: Response): Promise<void> {
    try {
        const projects: Prisma.BatchPayload = await deleteProjects()
        res.status(204).json({success: true, data: projects, message: "Projects deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function getProjectByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        if (req.params.id) {
            const project: Project | null = await getProjectById(parseInt(req.params.id, 10))
            if (project) {
                res.status(200).json({success: true, data: project})
            } else {
                res.status(404).json({success: false, message: 'Not found'})
            }
        }
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}


export async function updateProjectByIdHandler(req: Request, res: Response): Promise<void> {
    const projectData: Project = {
        id: parseInt(req.params.id, 10),
        name: req.body.name,
        date: req.body.date,
        client_id: req.body.client_id,
        project_owner_id: req.body.project_owner_id
    }
    try {
        const project: Project = await updateProjectById(projectData)
        res.status(204).json({success: true, data: project, message: "Inventory updated successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteProjectByIdHandler(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10)
    try {
        const project: Project = await deleteProjectById(id)
        res.status(204).json({success: true, data: project, message: "Item deleted successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}
