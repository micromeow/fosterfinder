import { LogoutButton } from '@/components/auth';
import { Icons } from '@/components/icons';
import { AnimalCard } from '@/components/ui/AnimalCard';
import { Button } from '@/components/ui/Button';
import { getAnimals } from '@/lib/queries/get-animals';
import { getUser } from '@/lib/queries/get-user';
import { nullsToUndefined } from '@/lib/utils/nulls-to-undefined';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default async function Page() {
  const user = await getUser();
  const [total, animals] = await getAnimals(0, 3);

  if (!user)
    return (
      <div>
        Something went wrong.
        <LogoutButton />
      </div>
    );

  return (
    <div className="flex flex-col gap-6  items-center">
      <h1 className="bg-landing w-full px-8  py-16 border-b">
        <div className="text-5xl text-rose-100">
          Welcome back <br />
          <b>{user.name}</b>
        </div>
      </h1>
      {animals.length > 0 && (
        <div className="flex flex-col gap-2 w-full lg:w-auto p-8">
          <h2 className="text-2xl w-full">Recently Added</h2>
          <div className="grid grid-cols-1 w-full  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {animals.map((animal) => (
              <AnimalCard {...nullsToUndefined(animal)} key={animal.id} />
            ))}
            <Link
              href="app/animals"
              className="w-full h-full flex items-center"
            >
              <Button className="cursor-pointer p-5 border rounded-3xl flex flex-col gap-2 bg-muted w-full text-foreground">
                See More Animals...
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div>
        Signed in as <b>@{user.name}</b>
      </div>
      <LogoutButton />
    </div>
  );
}
