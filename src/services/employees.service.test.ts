import { describe, vi, test, expect } from 'vitest';
import { Employee } from '../models/models.js';
import { createEmployee, getEmployees } from './employees.service.js';
import prisma from '../libs/__mocks__/prisma.js';
import { DataError } from '../models/errors.js';
import { objectContainsKey } from 'vitest-mock-extended';
vi.mock('../libs/prisma');

describe('employees.service', () => {
  const mockCompanyId: number = 1;
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
  describe('getEmployees', () => {
    describe('get All Employees', () => {
      describe('given all parameters are correct', () => {
        test('returns list of Employees', async (): Promise<void> => {
          prisma.employees.findMany.mockResolvedValue(mockEmployees);
          prisma.employees.count.mockResolvedValue(mockEmployees.length);
          const result: { data: Employee[]; totalItems: number } =
            await getEmployees(mockCompanyId);
          expect(result).toEqual({
            data: mockEmployees,
            totalItems: mockEmployees.length,
          });
        });
      });
      describe('given company ID does not exist', () => {
        test('should return an empty record', async () => {
          prisma.employees.findMany.mockResolvedValue([]);
          const result: { data: Employee[]; totalItems: number } =
            await getEmployees(mockCompanyId);
          expect(result).toEqual({
            data: [],
            totalItems: 0,
          });
        });
      });
      describe('given the pagination parameters are incorrect', () => {
        test('should throw an error', async () => {
          await expect(() =>
            getEmployees(mockCompanyId, 0, 0),
          ).rejects.toThrowError(
            new DataError({
              name: 'Pagination Data Mismatch',
              message: 'Check your pagination data',
            }),
          );
        });
      });
      describe('given the sortBy property does not exist', () => {
        test.todo('should throw an error', async () => {});
      });
    });
  });
  describe('createEmployee', () => {
    describe('create single Employee', () => {
      describe('given employee data is correct', () => {
        test('should return created user record', async () => {
          prisma.employees.create.mockResolvedValue({
            id: mockEmployee.id!,
            ...mockEmployee,
          });
          expect(await createEmployee(mockEmployee)).toStrictEqual(
            mockEmployee,
          );
        });
        describe('given employee data is incorrect', () => {
          test('should throw an error', async () => {
            const newEmployee: Employee = {
              first_name: '',
              last_name: 'test',
              company_id: 2,
            };
            await expect(() =>
              createEmployee(newEmployee),
            ).rejects.toThrowError(
              new DataError({
                name: 'Missing information error',
                message: 'One of required information is missing',
              }),
            );
          });
        });
      });
    });
    describe('create multiple Employees', () => {
      describe('given the data is correct', () => {
        test.todo(
          'should return array of employees and total number',
          async () => {},
        );
      });
      describe('given the employee data is incorrect', () => {
        test.todo('should throw an error', async () => {});
      });
    });
  });

  describe('deleteEmployees', () => {});
  describe('getEmployeeById', () => {});
  describe('updateEmployeeById', () => {});
  describe('deleteEmployeeById', () => {});
});
