import React from 'react';
import { Table } from '@tanstack/react-table';
import { Button, Icon } from '@/components/ui';

interface TablePaginationProps<T> {
  table: Table<T>;
  pageSizeOptions: number[];
}

export function TablePagination<T>({ 
  table, 
  pageSizeOptions 
}: TablePaginationProps<T>) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  const getPageNumbers = () => {
    const delta = 1; // Reduced for mobile
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(pageCount - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < pageCount - 1) {
      rangeWithDots.push('...', pageCount);
    } else if (pageCount > 1) {
      rangeWithDots.push(pageCount);
    }

    return rangeWithDots;
  };

  const pageNumbers = pageCount > 1 ? getPageNumbers() : [];

  return (
    <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between px-2">
      {/* Items per page - Mobile: Full width, Desktop: Left side */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-sm text-gray-700 whitespace-nowrap">Show</span>
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 border rounded bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-20"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700 whitespace-nowrap">entries</span>
        </div>

        {/* Page info - Shows on mobile below the page size selector */}
        <div className="text-sm text-gray-700 w-full sm:w-auto">
          <span className="block sm:inline">
            Showing {currentPage * pageSize + 1} to{' '}
            {Math.min((currentPage + 1) * pageSize, totalRows)} of{' '}
            {totalRows} entries
          </span>
          {table.getFilteredRowModel().rows.length !== table.getCoreRowModel().rows.length && (
            <span className="text-gray-500 block sm:inline">
              {' '}(filtered from {table.getCoreRowModel().rows.length} total entries)
            </span>
          )}
        </div>
      </div>

      {/* Pagination controls - Mobile: Full width, Desktop: Right side */}
      <div className="flex items-center justify-center sm:justify-end space-x-1 w-full sm:w-auto">
        {/* First page button - Hidden on mobile when space is tight */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="p-2 hidden sm:flex"
          title="First page"
        >
          <Icon name="fas fa-angle-double-left" />
        </Button>

        {/* Previous page button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2"
          title="Previous page"
        >
          <Icon name="fas fa-angle-left" />
        </Button>

        {/* Page numbers - Responsive display */}
        <div className="flex space-x-1 max-w-full overflow-x-auto">
          {pageNumbers.slice(0, window.innerWidth < 640 ? 3 : pageNumbers.length).map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === '...' ? (
                <span className="px-2 sm:px-3 py-2 text-sm text-gray-500 whitespace-nowrap">...</span>
              ) : (
                <Button
                  variant={pageNumber === currentPage + 1 ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => table.setPageIndex((pageNumber as number) - 1)}
                  className="min-w-[2rem] sm:min-w-[2.5rem] text-xs sm:text-sm"
                >
                  {pageNumber}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next page button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2"
          title="Next page"
        >
          <Icon name="fas fa-angle-right" />
        </Button>

        {/* Last page button - Hidden on mobile when space is tight */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          className="p-2 hidden sm:flex"
          title="Last page"
        >
          <Icon name="fas fa-angle-double-right" />
        </Button>
      </div>
    </div>
  );
}