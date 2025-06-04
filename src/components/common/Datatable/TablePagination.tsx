import React from 'react';
import { Table } from '@tanstack/react-table';
import { Button, Icon } from '@/components/ui';

interface TablePaginationProps<T> {
  table: Table<T>;
  darkMode: boolean;
  pageSizeOptions: number[];
}

export function TablePagination<T>({ 
  table, 
  darkMode, 
  pageSizeOptions 
}: TablePaginationProps<T>) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  // Calculate page range for display
  const getPageNumbers = () => {
    const delta = 2;
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
    } else {
      rangeWithDots.push(pageCount);
    }

    return rangeWithDots;
  };

  const pageNumbers = pageCount > 1 ? getPageNumbers() : [];

  return (
    <div className="flex items-center justify-between px-2">
      {/* Items per page */}
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Show
        </span>
        <select
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className={`px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300'
          }`}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          entries
        </span>
      </div>

      {/* Page info */}
      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Showing {currentPage * pageSize + 1} to{' '}
        {Math.min((currentPage + 1) * pageSize, totalRows)} of{' '}
        {totalRows} entries
        {table.getFilteredRowModel().rows.length !== table.getCoreRowModel().rows.length && (
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            {' '}(filtered from {table.getCoreRowModel().rows.length} total entries)
          </span>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* First page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="p-2"
          title="First page"
        >
          <Icon name="fas fa-angle-double-left" />
        </Button>

        {/* Previous page */}
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

        {/* Page numbers */}
        <div className="flex space-x-1">
          {pageNumbers.map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === '...' ? (
                <span className={`px-3 py-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  ...
                </span>
              ) : (
                <Button
                  variant={pageNumber === currentPage + 1 ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => table.setPageIndex((pageNumber as number) - 1)}
                  className="min-w-[2.5rem]"
                >
                  {pageNumber}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next page */}
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

        {/* Last page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          className="p-2"
          title="Last page"
        >
          <Icon name="fas fa-angle-double-right" />
        </Button>
      </div>
    </div>
  );
}