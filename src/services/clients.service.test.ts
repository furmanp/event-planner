import { describe, vi, test, expect } from 'vitest';
import { Prisma } from '@prisma/client';
import prisma from '../libs/__mocks__/prisma.js';
import {
  createClients,
  deleteClientById,
  deleteClients,
  getClientById,
  getClients,
} from './clients.service.js';
import { Client, Company } from '../models/models.js';
import { DataError } from '../models/errors.js';

vi.mock('../libs/prisma');

describe('clients.service', () => {
  describe('get All Clients', () => {
    test('returns list of Clients', async (): Promise<void> => {
      const mockClients = [
        { id: 1, name: 'Client A', company_id: 1 },
        { id: 2, name: 'Client B', company_id: 1 },
      ];
      prisma.clients.findMany.mockResolvedValueOnce(mockClients);
      const result: Client[] = await getClients(1);
      expect(result).toEqual(mockClients);
    });
  });
  describe('createClients', () => {
    describe('create single client', () => {
      describe('given provided data is correct', () => {
        test('should return Client object', async (): Promise<void> => {
          const newClient: Client = {
            company_id: 1,
            name: 'testName',
          };
          prisma.clients.create.mockResolvedValue({ id: 1, ...newClient });
          expect(await createClients(newClient)).toStrictEqual({
            ...newClient,
            id: 1,
          });
        });
      });
      describe('given clients name is an empty string', () => {
        test('should throw an error', async (): Promise<void> => {
          const newClient: Client = {
            company_id: 1,
            name: '',
          };
          await expect(() => createClients(newClient)).rejects.toThrowError(
            new Error('Name field cannot be empty.'),
          );
        });
      });
    });

    describe('create multiple clients', () => {
      describe('given provided data is correct', () => {
        test('should return number of created clients', async (): Promise<void> => {
          const newClient: Client[] = [
            { name: 'Client 1', company_id: 1 },
            { name: 'Client 2', company_id: 1 },
          ];

          prisma.clients.createMany.mockResolvedValueOnce({
            count: newClient.length,
          });
          const result = await createClients(newClient);
          expect(result).toEqual({ count: newClient.length });
        });
      });
      describe('given clients name is an empty string', () => {
        test('should return Client object', async (): Promise<void> => {
          const newClient: Client = {
            name: '',
            company_id: 1,
          };
          await expect(() => createClients(newClient)).rejects.toThrowError(
            new Error('Name field cannot be empty.'),
          );
        });
      });
    });
  });
  describe('get Client by Id', () => {
    const newClient: Client = {
      id: 1,
      company_id: 1,
      name: 'company name',
    };
    describe('given record with provided ID exists', () => {
      test('Should return Client object', async (): Promise<void> => {
        prisma.clients.findUnique.mockResolvedValue({
          id: 1,
          ...newClient,
        });
        const client: Client | null = await getClientById(
          newClient.id!,
          newClient.company_id,
        );
        expect(client).toStrictEqual(newClient);
      });
    });

    describe('given record with provided ID does not exist', () => {
      test('Should return null', async (): Promise<void> => {
        prisma.clients.findUnique.mockResolvedValue(null);
        const client: Client | null = await getClientById(
          newClient.id!,
          newClient.company_id,
        );
        expect(client).toBeNull();
      });
    });
  });
  describe('delete all Clients', () => {
    describe('Given the provided companyId is correct', () => {
      test('Should return number of clients deleted', async (): Promise<void> => {
        const mockClients: Client[] = [
          { id: 1, name: 'Client1', company_id: 1 },
          { id: 2, name: 'Client2', company_id: 1 },
          { id: 3, name: 'Client3', company_id: 1 },
        ];
        const batchPayload: Prisma.BatchPayload = {
          count: mockClients.length,
        };

        prisma.clients.deleteMany.mockResolvedValue(batchPayload);
        const result = await deleteClients(mockClients[0].company_id);
        expect(result).toStrictEqual(batchPayload);
      });
    });
  });
  describe('delete Client by ID', () => {
    describe('Given both client id and company id is correct', () => {
      test('Should return deleted client', async (): Promise<void> => {
        const mockCompany: Company = { id: 1, name: 'Company1', user_id: 1 };
        const mockClient: Client = { id: 1, name: 'Client1', company_id: 1 };
        prisma.company.findUnique.mockResolvedValueOnce({
          id: 1,
          ...mockCompany,
        });
        prisma.clients.delete.mockResolvedValue({ id: 1, ...mockClient });
        const result = await deleteClientById(
          mockClient.id!,
          mockClient.company_id,
        );
        expect(result).toStrictEqual(mockClient);
      });
    });
    describe('Given the client id is incorrect', () => {
      test.skip('Should throw an error', async (): Promise<void> => {
        const mockClient: Client = { id: 1, name: 'Client1', company_id: 1 };
        prisma.clients.delete.mockRejectedValue(mockClient);

        const result = await deleteClientById(
          mockClient.id!,
          mockClient.company_id,
        );
        console.log(result);
        await expect(() =>
          deleteClientById(mockClient.id!, mockClient.company_id),
        ).rejects.toThrowError(
          new DataError({
            name: 'P2025',
            message:
              'Operation failed because it depends on one or more recrds that were required but not found.',
          }),
        );
      });
    });
    describe('Given the company id is incorrect', () => {
      test.skip('Should throw an error', async (): Promise<void> => {
        const mockClient: Client = { id: 1, name: 'Client1', company_id: 1 };

        await expect(() =>
          deleteClientById(mockClient.id!, mockClient.company_id),
        ).rejects.toThrowError(
          new DataError({
            name: 'Wrong copmany ID',
            message: 'Company ID provided does not exist in the database.',
          }),
        );
      });
    });
  });
});
