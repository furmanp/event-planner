import { describe, expect, test, vi} from 'vitest';
import { createUser } from '../src/services/users.service.js';
import { User } from '../src/models/models.js';
import prisma from '../src/libs/__mocks__/prisma.js';

vi.mock('../src/libs/prisma');

describe('users.service', () => {
  describe('createUser', () => {
    describe.sequential('given the username and password are valid', () => {
        test('Should return User object', async (): Promise<void> => {
          const newUser: User = {
            username: 'testUser',
            password: 'testPassword',
          };
          prisma.users.create.mockResolvedValue({ id: 1, ...newUser });
          const user: User = await createUser(newUser);
          expect(user).toStrictEqual({ ...newUser, id: 1 });
        });
      })

    describe('given the username is an empty string', () => {
      test('Should throw an error', async (): Promise<void> => {
        const newUser: User = { username: '', password: 'testPassword' };
        await expect(() => createUser(newUser)).rejects.toThrowError(
          new Error('Username and password are required.'),
        );
      });
    });
    describe('given the password is an empty string', () => {
      test('Should throw an error', async (): Promise<void> => {
        const newUser: User = { username: 'testUsername', password: '' };
        await expect(() => createUser(newUser)).rejects.toThrowError(
          new Error('Username and password are required.'),
        );
      });
    });
    describe('given both username and password are empty strings', () => {
      test('Should throw an error', async (): Promise<void> => {
        const newUser: User = { username: '', password: '' };
        await expect(() => createUser(newUser)).rejects.toThrowError(
          new Error('Username and password are required.'));
      });
    });
  });

})
