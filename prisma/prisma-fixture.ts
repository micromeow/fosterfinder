import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/next-auth-config';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

jest.mock('@/lib/auth/next-auth-config', () => ({
  __esModule: true,
  authOptions: mockDeep<typeof authOptions>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});
