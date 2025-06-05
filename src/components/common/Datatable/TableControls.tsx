import { Table } from '@tanstack/react-table';
import { Button, Icon } from '@/components/ui';

interface TableControlsProps<T> {
  table: Table<T>;
  enableGlobalSearch: boolean;
  searchPlaceholder: string;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  selectedRowCount: number;
  selectedRows: T[];
  actionButtons: Array<{
    label: string;
    icon: string;
    onClick: (selectedRows: T[]) => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: (selectedRows: T[]) => boolean;
  }>;
  enableActions: boolean;
}

export function TableControls<T>({
  enableGlobalSearch,
  searchPlaceholder,
  globalFilter,
  setGlobalFilter,
  selectedRowCount,
  selectedRows,
  actionButtons,
  enableActions,
}: TableControlsProps<T>) {
  return (
    <div className="flex items-center justify-between">
      {enableGlobalSearch && (
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Icon 
              name="fas fa-search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          {globalFilter && (
            <Button variant="ghost" size="sm" onClick={() => setGlobalFilter('')}>
              <Icon name="fas fa-times" />
            </Button>
          )}
        </div>
      )}

      {enableActions && selectedRowCount > 0 && (
        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
          <span className="text-sm font-medium text-blue-700">
            {selectedRowCount} item{selectedRowCount !== 1 ? 's' : ''} selected
          </span>
          <div className="flex space-x-2">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || 'secondary'}
                size="sm"
                onClick={() => button.onClick(selectedRows)}
                disabled={button.disabled?.(selectedRows)}
              >
                <Icon name={button.icon} className="mr-1" />
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
