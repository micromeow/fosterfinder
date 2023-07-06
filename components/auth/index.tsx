'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

export const LoginButton = () => {
  const router = useRouter();
  return <Button onClick={() => router.push('/login')}>Sign in</Button>;
};

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
