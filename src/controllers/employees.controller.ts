import { Request, Response } from 'express';
import {
  Employee as IEmployee,
  RequestBody,
  RequestParams,
  RequestQuery,
  ResponseBody,
} from '../models/models.js';
import {
  createEmployee,
  deleteEmployeeById,
  deleteEmployees,
  getEmployeeById,
  getEmployees,
  updateEmployeeById,
  updateEmployees,
} from '../services/employees.service.js';
import { Prisma } from '@prisma/client';

export class EmployeeController {
  async getEmployees(
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
        const employees: {
          data: IEmployee[];
          totalItems: number;
        } = await getEmployees(
          company_id,
          parseInt(query.page, 10),
          parseInt(query.pageSize, 10),
          query.sortBy,
        );
        res.status(200).json({ success: true, data: employees });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async createEmployees(req: Request, res: Response): Promise<void> {
    // TODO Add error handling in case wrong input is provided
    const company_id = parseInt(<string>req.headers.company_id, 10);
    let employeeData: IEmployee | IEmployee[] = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      company_id: company_id,
    };
    if (Array.isArray(employeeData)) {
      employeeData = employeeData.map((employee) => ({
        ...employee,
        company_id: company_id,
      }));
    } else {
      employeeData = {
        ...req.body,
        company_id: company_id,
      };
    }
    try {
      const result: IEmployee | Prisma.BatchPayload = await createEmployee(
        employeeData,
      );

      if ('count' in result) {
        res.location(`/employees/`);
        res.status(201).json({
          success: true,
          data: result,
          message: `${result.count} employees created.`,
        });
      } else {
        res.location(`/employees/${result.id}`);
        res
          .status(201)
          .json({ success: true, data: result, message: 'Employee created.' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  async updateEmployees(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    let employees: IEmployee[] = req.body;
    employees = employees.map((employee) => ({
      ...employee,
      company_id: company_id,
    }));
    try {
      const updatedEmployees: Prisma.BatchPayload = await updateEmployees(
        employees,
      );
      res.status(204).json({
        success: true,
        data: updatedEmployees,
        message: 'Employee updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteAllEmployees(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    try {
      const deletedEmployees = await deleteEmployees(company_id);
      res.status(204).json({
        success: true,
        data: deletedEmployees,
        message: 'Employees deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getEmployeeById(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    try {
      if (req.params.id) {
        const employee: IEmployee | null = await getEmployeeById(
          parseInt(req.params.id, 10),
          company_id,
        );
        if (employee) {
          res.status(200).json({ success: true, data: employee });
        } else {
          res.status(404).json({ success: false, message: 'Not found' });
        }
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async updateEmployeeById(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    const employeeData: IEmployee = {
      id: parseInt(req.params.id, 10),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      company_id: company_id,
    };
    try {
      const employee: IEmployee = await updateEmployeeById(employeeData);
      res.status(204).json({
        success: true,
        data: employee,
        message: 'Employee updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteEmployeeById(req: Request, res: Response): Promise<void> {
    const company_id = parseInt(<string>req.headers.company_id, 10);
    const id: number = parseInt(req.params.id, 10);
    try {
      //TODO add 404 if employee with provided ID doesn't exist
      const employee: IEmployee = await deleteEmployeeById(id, company_id);
      res.status(204).json({
        success: true,
        data: employee,
        message: 'Employee deleted successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
