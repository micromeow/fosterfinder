import { getServerSession } from 'next-auth';
import { prisma } from '../prisma';
import { authOptions } from '../auth/next-auth-config';
import { verifyUserSession } from '../auth/verify-user-session';
import { nullsToUndefined } from '../utils/nulls-to-undefined';

/**
 * Get animals with pagination
 * @param skip - number of animals to skip (default 0)
 * @param take - number of animals to return (default 6)
 * @returns [total, animals]
 * @example
 * const [total, animals] = await getAnimals();
 * const [total, animals] = await getAnimals(0, 16);
 */
export async function getAnimals(skip = 0, take = 12) {
  return await prisma.$transaction([
    prisma.animal.count(),
    prisma.animal.findMany({
      skip,
      take,
      orderBy: { name: 'asc' },
    }),
  ]);
}
