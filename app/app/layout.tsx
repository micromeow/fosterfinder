import { Icons } from '@/components/icons';
import { getUser } from '@/lib/queries/get-user';
import Link from 'next/link';
import { ReactNode } from 'react';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getUser();
  return (
    <>
      <div className="border-b  flex flex-row items-center justify-between p-5">
        <div className="flex flex-row gap-2 items-center ">
          <Link href="/app" className="mr-3 flex flex-row gap-1 font-semibold">
            <Icons.media className="h-5 w-5" /> FosterFinder
          </Link>
          <Link href="/app/animals">Animals</Link>
        </div>
        <div className="flex flex-row gap-1 items-center font-medium">
          <Icons.user className="h-5 w-5" />@{user?.username}
          <Link
            href="/app/update-profile"
            className="mr-3 flex flex-row gap-1 font-semibold"
          >
            <Icons.settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
