'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from './Pagination';

/**
 * A pagination component that uses hooks to get the current page and limit from the URL search params and update the URL search params when the page is changed.
 * @param {number} total The total number of items
 * @returns {React.ReactElement} The pagination component
 * @example
 * <PaginationWithHooks total={100} />
 */
function PaginationWithHooks({ total }: { total: number }) {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  const router = useRouter();
  const path = usePathname();

  const onUpdate = (page: number, limit: number) => {
    router.push(`${path}?page=${page}&limit=${limit}`);
  };

  return (
    <Pagination page={page} limit={limit} total={total} onUpdate={onUpdate} />
  );
}

PaginationWithHooks.displayName = 'PaginationWithHooks';

export { PaginationWithHooks };
