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
    <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Section */}
      {enableGlobalSearch && (
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Icon 
              name="fas fa-search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
            />
          </div>
          {globalFilter && (
            <Button variant="ghost" size="sm" onClick={() => setGlobalFilter('')}>
              <Icon name="fas fa-times" />
            </Button>
          )}
        </div>
      )}

      {/* Selection Actions Section */}
      {enableActions && selectedRowCount > 0 && (
        <div className="w-full sm:w-auto">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-2 px-3 sm:px-4 py-3 sm:py-2 rounded-lg bg-blue-50 border border-blue-200">
            {/* Selection count - Full width on mobile */}
            <span className="text-sm font-medium text-blue-700 text-center sm:text-left">
              {selectedRowCount} item{selectedRowCount !== 1 ? 's' : ''} selected
            </span>
            
            {/* Action buttons - Stack on mobile, row on desktop */}
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2 w-full sm:w-auto">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || 'secondary'}
                  size="sm"
                  onClick={() => button.onClick(selectedRows)}
                  disabled={button.disabled?.(selectedRows)}
                  className="w-full sm:w-auto justify-center sm:justify-start"
                >
                  <Icon name={button.icon} className="mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{button.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}