import { ColumnDef } from '@tanstack/react-table';

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  darkMode?: boolean;
  
  // Pagination
  showPagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  
  // Loading & Empty States
  loading?: boolean;
  emptyMessage?: string;
  emptyIcon?: string;
  
  // Interactions
  onRowClick?: (row: T) => void;
  enableSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  
  // Features
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableGlobalSearch?: boolean;
  searchPlaceholder?: string;
  
  // Styling
  className?: string;
  tableClassName?: string;
  density?: 'compact' | 'normal' | 'comfortable';
  
  // Actions
  enableActions?: boolean;
  actionButtons?: Array<{
    label: string;
    icon: string;
    onClick: (selectedRows: T[]) => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: (selectedRows: T[]) => boolean;
  }>;
}

export interface TableState {
  sorting: Array<{ id: string; desc: boolean }>;
  columnFilters: Array<{ id: string; value: unknown }>;
  globalFilter: string;
  rowSelection: Record<string, boolean>;
  pagination: { pageIndex: number; pageSize: number };
}