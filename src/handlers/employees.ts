import {Request, Response} from "express";
import {Employee, RequestBody, RequestParams, RequestQuery, ResponseBody} from "../models/models.js";
import {
    createEmployee,
    deleteEmployeeById,
    deleteEmployees,
    getEmployeeById,
    getEmployees,
    updateEmployeeById,
    updateEmployees
} from "../services/database.js";
import {Prisma} from "@prisma/client";

export async function getEmployeesHandler(req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response): Promise<void> {
    try {
        const {query}: Request<RequestParams, ResponseBody, RequestBody, RequestQuery> = req
        if (!query.page || !query.pageSize) {
            res.status(400).json({success: false, error: 'Both page and pageSize parameters are required.'});
            return;
        } else {
            const employees: {
                data: Employee[],
                totalItems: number
            } = await getEmployees(parseInt(query.page, 10), parseInt(query.pageSize, 10), query.sortBy)
            res.status(200).json({success: true, data: employees})
        }

    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export async function createEmployeesHandler(req: Request, res: Response): Promise<void> {

    // TODO Add error handling in case wrong input is provided
    const employeeData: Employee | Employee[] = req.body
    try {
        const result: Employee | Prisma.BatchPayload = await createEmployee(employeeData)

        if ('count' in result) {
            res.location(`/employees/`)
            res.status(201).json({success: true, data: result, message: `${result.count} employees created.`})
        } else {
            res.location(`/employees/${result.id}`)
            res.status(201).json({success: true, data: result, message: 'Employee created.'})
        }
    } catch (error) {
        res.status(500).json({success: false, error: error});


    }
}

export async function updateEmployeesHandler(req: Request, res: Response): Promise<void> {
    const employees: Employee[] = req.body
    try {
        const updatedEmployees: Prisma.BatchPayload = await updateEmployees(employees)
        res.status(204).json({success: true, data: updatedEmployees, message: "Employee updated successfully"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteAllEmployeesHandler(_req: Request, res: Response): Promise<void> {
    try {
        const deletedEmployees = await deleteEmployees()
        res.status(204).json({success: true, data: deletedEmployees, message: 'Employees deleted successfully'})
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function getEmployeeByIdHandler(req: Request, res: Response): Promise<void> {
    try {
        if (req.params.id) {
            const employee: Employee | null = await getEmployeeById(parseInt(req.params.id, 10))
            if (employee) {
                res.status(200).json({success: true, data: employee})
            } else {
                res.status(404).json({success: false, message: 'Not found'})
            }
        }
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}


export async function updateEmployeeByIdHandler(req: Request, res: Response): Promise<void> {
    const employeeData: Employee = {
        id: parseInt(req.params.id, 10), first_name: req.body.first_name, last_name: req.body.last_name
    }
    try {
        const employee: Employee = await updateEmployeeById(employeeData)
        res.status(204).json({success: true, data: employee, message: "Employee updated successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}

export async function deleteEmployeeByIdHandler(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id, 10)
    try {
        //TODO add 404 if employee with provided ID doesn't exist
        const employee: Employee = await deleteEmployeeById(id)
        res.status(204).json({success: true, data: employee, message: "Employee deleted successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}
