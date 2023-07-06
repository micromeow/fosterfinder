import { prisma } from '../prisma';
import { verifyUserSession } from '../auth/verify-user-session';

export async function getUser() {
  const session = await verifyUserSession();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  console.log('session', session, user);
  return user;
}
