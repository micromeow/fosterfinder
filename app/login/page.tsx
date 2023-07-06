import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { UserAuthForm } from '@/components/auth/UserAuthForm';
import { authOptions } from '@/lib/auth/next-auth-config';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/app');
  return (
    <div className="container relative grid h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex  flex-col justify-center space-y-6 ">
        <div className="flex justify-center">
          <Icons.media className="h-16 w-16" />
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Foster Finder
          </h1>
          <p className="text-sm text-muted-foreground">
            An effort by Micro Meow
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
