import { Icons } from '../icons';
import { Button } from './Button';

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  onUpdate: (page: number, limit: number) => void;
};

/**
 * A pagination component
 * @param {number} total The total number of items
 * @param {number} page The current page
 * @param {number} limit The number of items per page
 * @param {function} onUpdate A function to call when the page is changed
 * @returns {React.ReactElement} The pagination component
 * @example
 * <Pagination
 *  page={1}
 *  limit={12}
 *  total={100}
 *  onUpdate={(page, limit) => console.log(page, limit)}
 * />
 */
function Pagination({
  page,
  limit,
  total,
  onUpdate: updateSearchParams,
}: PaginationProps) {
  function renderPageNumbers() {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <Button
        onClick={() => updateSearchParams(number, limit)}
        key={number}
        disabled={number === page}
      >
        {number}
      </Button>
    ));
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        onClick={() => updateSearchParams(page - 1, limit)}
        variant="ghost"
        disabled={page <= 1}
        className="px-2 trans"
      >
        <Icons.chevronLeft />
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => updateSearchParams(page + 1, limit)}
        variant="ghost"
        disabled={page >= Math.ceil(total / limit)}
        className="px-2 trans"
      >
        <Icons.chevronRight />
      </Button>
    </div>
  );
}

Pagination.displayName = 'Pagination';

export { Pagination, type PaginationProps };
