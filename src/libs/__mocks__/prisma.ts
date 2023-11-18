import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() : void=> {
  mockReset(prisma)
})

const prisma : DeepMockProxy<PrismaClient>= mockDeep<PrismaClient>()
export default prisma
