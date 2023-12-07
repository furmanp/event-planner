import { describe, vi, test, expect } from 'vitest';
import prisma from '../src/libs/__mocks__/prisma.js';
import { createClients, getClients } from '../src/services/clients.service.js';
import { Client } from '../src/models/models.js';

vi.mock('../src/libs/prisma');

describe('clients.service', () => {
  describe('get All Clients', () => {
    test.skip('returns users successfully', async (): Promise<void> => {
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
        test.skip('should return user object', async (): Promise<void> => {
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
        test.skip('should throw an error', async (): Promise<void> => {
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
        test.skip('should return number of created users', async (): Promise<void> => {
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
        test.skip('should return user object', async (): Promise<void> => {
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
    describe('given record with provided ID exists', () => {});
    describe('given record with provided ID does not exist', () => {});
  });
  describe('create Client', () => {});
  describe('update Client', () => {});
  describe('delete Client', () => {});
});
