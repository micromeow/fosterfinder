import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/next-auth-config';

type Session = {
  user: {
    id: string;
  };
};

export async function verifyUserSession() {
  const session = (await getServerSession(authOptions)) as any;
  if (!isSessionValid(session)) throw new Error('invalid session');
  return session;
}

export function isSessionValid(session: any): session is Session {
  return !!session && !!session.user && typeof session.user.id === 'string';
}
