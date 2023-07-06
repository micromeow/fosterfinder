import { mock } from 'node:test';
import { getAnimals } from './get-animals';
import { prismaMock } from '@/prisma/prisma-fixture';

describe('getAnimals', () => {
  it('returns animals', async () => {
    const now = new Date();
    prismaMock.$transaction.mockResolvedValue([
      2,
      [
        {
          id: '123',
          createdAt: now,
          modifiedAt: null,
          name: 'Animal',
          category: 'Dog',
          status: 'Available',
          birthday: null,
          meta: null,
          shelterId: null,
        },
        {
          id: '124',
          createdAt: now,
          modifiedAt: null,
          name: 'Animal',
          category: 'Cat',
          status: 'Available',
          birthday: null,
          meta: null,
          shelterId: null,
        },
      ],
    ]);
    const animals = await getAnimals();
    expect(animals).toMatchObject([
      2,
      [
        {
          id: '123',
          createdAt: now,
          modifiedAt: null,
          name: 'Animal',
          category: 'Dog',
          status: 'Available',
          birthday: null,
          meta: null,
          shelterId: null,
        },
        {
          id: '124',
          createdAt: now,
          modifiedAt: null,
          name: 'Animal',
          category: 'Cat',
          status: 'Available',
          birthday: null,
          meta: null,
          shelterId: null,
        },
      ],
    ]);
  });
});
