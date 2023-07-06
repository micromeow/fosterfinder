import { LoginButton, LogoutButton, ProfileButton } from '@/components/auth';
import { authOptions } from '@/lib/auth/next-auth-config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { User } from '@/components/user.component';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/app');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginButton />
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>

      <User />
    </main>
  );
}
