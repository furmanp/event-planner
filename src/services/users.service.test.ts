import { describe, expect, test, vi } from 'vitest';
import { User } from '../models/models.js';
import prisma from '../libs/__mocks__/prisma.js';
import { createUser, getUserByUsername } from './users.service.js';

vi.mock('../libs/prisma');

describe('users.service', () => {
  describe('createUser', () => {
    describe('given the username and password are valid', () => {
      describe('username does not exist in the database', () => {
        test('Should return User object', async (): Promise<void> => {
          const newUser: User = {
            username: 'testUser',
            password: 'testPassword',
          };
          prisma.users.create.mockResolvedValue({ id: 1, ...newUser });
          const user: User = await createUser(newUser);
          expect(user).toStrictEqual({ ...newUser, id: 1 });
        });
      });
    });

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
          new Error('Username and password are required.'),
        );
      });
    });
  });

  describe('getUserById', () => {
    describe('given user with provided username exitsts', () => {
      test('Should return User object', async (): Promise<void> => {
        const newUser: User = {
          username: 'testUser',
          password: 'testPassword',
        };
        prisma.users.findUnique.mockResolvedValue({ id: 1, ...newUser });
        const user: User | null = await getUserByUsername(newUser.username);
        expect(user).toStrictEqual({ ...newUser, id: 1 });
      });
    });
    describe('given user with provided username does not exitst', () => {
      test('Should return null', async (): Promise<void> => {
        const wrongUsername = 'wrong username';
        const user: User | null = await getUserByUsername(wrongUsername);
        expect(user).toBeNull();
      });
    });

    describe('given the username is an empty string', () => {
      test('Should return null', async (): Promise<void> => {
        const wrongUsername = '';
        const user: User | null = await getUserByUsername(wrongUsername);
        expect(user).toBeNull();
      });
    });
  });
});
