import { describe, vi, test, expect } from 'vitest';
import prisma from '../libs/__mocks__/prisma.js';
import { Company } from '../models/models.js';
import { createCompany, getCompanyByUserId } from './company.service.js';

vi.mock('../libs/prisma');

describe('company.service', () => {
  const mockCompany: Company = {
    id: 1,
    name: 'name',
    user_id: 1,
  };
  describe('get CompanyByUserId', () => {
    describe('given the user Id is correct', () => {
      test('should return a company', async (): Promise<void> => {
        prisma.company.findUniqueOrThrow.mockResolvedValue({
          id: mockCompany.id!,
          user_id: mockCompany.user_id,
          name: mockCompany.name,
        });
        const result = await getCompanyByUserId(mockCompany.user_id);
        expect(result).toStrictEqual(mockCompany);
      });
    });
    describe('given the provided userId does not exists', () => {
      test.todo('should throw an error', async () => {});
    });
  });
  describe('create Company', () => {
    describe('given the provided data is correct', () => {
      test('should return a company object', async () => {
        prisma.company.create.mockResolvedValue({
          id: mockCompany.id!,
          ...mockCompany,
        });
        const result = await createCompany(mockCompany);
        expect(result).toStrictEqual(mockCompany);
      });
    });
    describe('given the provided data is incorrect', () => {
      test('should throw an error', async () => {
        const wrongCompany: Company = { id: 1, name: '', user_id: 1 };
        await expect(() => createCompany(wrongCompany)).rejects.toThrowError(
          new Error("Company's name is required."),
        );
      });
    });
  });
});
