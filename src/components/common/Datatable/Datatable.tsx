import { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  RowSelectionState,
  PaginationState,
} from '@tanstack/react-table';
import { DataTableProps } from './types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';
import { TableControls } from './TableControls';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

function DataTable<T>({
  data,
  columns,
  showPagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  loading = false,
  emptyMessage = "No data available",
  emptyIcon = "fas fa-inbox",
  onRowClick,
  enableSelection = false,
  onSelectionChange,
  enableSorting = true,
  enableGlobalSearch = true,
  searchPlaceholder = "Search all columns...",
  className = "",
  tableClassName = "",
  density = 'normal',
  enableActions = false,
  actionButtons = [],
}: DataTableProps<T>) {
  // Table state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  // Enhanced columns with selection
  const enhancedColumns = useMemo(() => {
    const cols: ColumnDef<T>[] = [...columns];
    
    if (enableSelection) {
      cols.unshift({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="rounded focus:ring-2 focus:ring-blue-500"
            aria-label="Select all rows"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="rounded focus:ring-2 focus:ring-blue-500"
            aria-label={`Select row ${row.index + 1}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      });
    }
    
    return cols;
  }, [columns, enableSelection]);

  // Table instance
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
      pagination,
    },
    enableRowSelection: enableSelection,
    enableSorting,
    enableGlobalFilter: enableGlobalSearch,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
    autoResetPageIndex: false,
  });

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange && enableSelection) {
      const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, onSelectionChange, enableSelection, table]);

  // Reset pagination when data changes
  useEffect(() => {
    table.setPageIndex(0);
  }, [data, table]);

  // Density classes
  const densityClasses = {
    compact: 'py-2',
    normal: 'py-3',
    comfortable: 'py-4',
  };

  const selectedRowCount = Object.keys(rowSelection).length;
  const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table Controls */}
      <TableControls
        table={table}
        enableGlobalSearch={enableGlobalSearch}
        searchPlaceholder={searchPlaceholder}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        selectedRowCount={selectedRowCount}
        selectedRows={selectedRows}
        actionButtons={actionButtons}
        enableActions={enableActions}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className={`w-full divide-y divide-gray-200 dark:divide-gray-700 ${tableClassName}`}>
            <TableHeader
              table={table}
              enableSorting={enableSorting}
            />
            <TableBody
              table={table}
              onRowClick={onRowClick}
              density={density}
              densityClasses={densityClasses}
            />
          </table>
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <EmptyState
          message={emptyMessage}
          icon={emptyIcon}
        />
      )}

      {/* Pagination */}
      {showPagination && data.length > 0 && (
        <TablePagination
          table={table}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}

export default DataTable;