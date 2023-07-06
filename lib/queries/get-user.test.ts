jest.mock('next-auth', () => ({
  getServerSession: jest.fn().mockResolvedValue({ user: { id: '123' } }),
}));

import { getUser } from '@/lib/queries/get-user';
import { prismaMock } from '@/prisma/prisma-fixture';
import { getServerSession } from 'next-auth';

describe('getUser', () => {
  it('returns user if there is a valid session and prisma has a valid user', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '123',
      username: 'test',
    });

    const user = await getUser();

    expect(user).toMatchObject({ id: '123', username: 'test' });
  });

  it('returns null if prisma does not have a valid user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const user = await getUser();

    expect(user).toBeNull();
  });
});
