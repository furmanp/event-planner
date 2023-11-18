import { expect, test, vi } from 'vitest'
import {createUser} from "../src/services/users.database.js";
import { User } from "../src/models/models.js";
import prisma from "../libs/__mocks__/prisma.js";

vi.mock('../libs/prisma')

test('createUser should return user Object', async () : Promise<void> => {
  const newUser : User = { username: 'testUser', password: 'testPassword' }
  prisma.users.create.mockResolvedValue({id: 1, ...newUser})
  const user: User= await createUser(newUser)
  expect(user).toStrictEqual({ ...newUser, id: 1})
})
