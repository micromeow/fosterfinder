import { AnimalCard } from '@/components/ui/AnimalCard';
import { CenterMessage } from '@/components/ui/CenterMessage';
import { PaginationWithHooks } from '@/components/ui/PaginationWithHooks';
import { verifyUserSession } from '@/lib/auth/verify-user-session';
import { getAnimals } from '@/lib/queries/get-animals';
import { getUser } from '@/lib/queries/get-user';
import { nullsToUndefined } from '@/lib/utils/nulls-to-undefined';
import { NextPage } from 'next';

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const { page = '1', limit = '12' } = searchParams;
  const limitInt = parseInt(limit);
  const skip = (parseInt(page) - 1) * limitInt;
  const [total, animals] = await getAnimals(skip, limitInt);

  if (!animals || animals.length <= 0)
    return <CenterMessage>No animals found</CenterMessage>;

  return (
    <div className="flex flex-col gap-2  h-screen items-center p-3">
      <h1 className="text-3xl ">Animals</h1>
      <PaginationWithHooks total={total} />
      <div className="grid grid-cols-1 w-full md:w-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {animals.map((animal) => (
          <AnimalCard {...nullsToUndefined(animal)} key={animal.id} />
        ))}
      </div>
      <PaginationWithHooks total={total} />
    </div>
  );
}
