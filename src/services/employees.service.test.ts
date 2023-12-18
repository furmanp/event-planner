import { describe, vi, test, expect } from 'vitest';
import { Employee } from '../models/models.js';
import { getEmployees } from './employees.service.js';
import prisma from '../libs/__mocks__/prisma.js';
vi.mock('../libs/prisma');

describe('employees.service', () => {
  describe('getEmployees', () => {
    const mockEmployee: Employee = {
      id: 1,
      first_name: 'firstName',
      last_name: 'lastName',
      company_id: 1,
    };

    const mockEmployees = [
      { id: 1, first_name: 'firstName', last_name: 'lastName', company_id: 1 },
      {
        id: 2,
        first_name: 'anotherName',
        last_name: 'anotherLast',
        company_id: 1,
      },
    ];

    describe('get All Employees', () => {
      test('returns list of Employees', async (): Promise<void> => {
        prisma.employees.findMany.mockResolvedValue(mockEmployees);
        prisma.employees.count.mockResolvedValue(mockEmployees.length);
        const result: { data: Employee[]; totalItems: number } =
          await getEmployees(mockEmployee.company_id);
        expect(result).toEqual({
          data: mockEmployees,
          totalItems: mockEmployees.length,
        });
      });
    });
  });
  describe('createEmployee', () => {});
  describe('deleteEmployees', () => {});
  describe('getEmployeeById', () => {});
  describe('updateEmployeeById', () => {});
  describe('deleteEmployeeById', () => {});
});
