
import { DataTable } from '@/components/common/Datatable';
import { Card } from '@/components/ui';

interface ResourceTableProps<TResource> {
  resources: TResource[];
  columns: any[];
  tableTitle: string;
  emptyMessage: string;
  emptyIcon: string;
  searchPlaceholder: string;
  isLoading?: boolean;
  pageSize?: number;
  className?: string;
}

export const ResourceTable = <TResource,>({
  resources,
  columns,
  tableTitle,
  emptyMessage,
  emptyIcon,
  searchPlaceholder,
  isLoading = false,
  pageSize = 10,
  className = ""
}: ResourceTableProps<TResource>) => (
  <Card className={className}>
    <div className="p-6 border-b">
      <h3 className="text-lg font-semibold text-gray-900">{tableTitle}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {resources.length} total items
      </p>
    </div>

    <div className="p-6">
      <DataTable
        data={resources}
        columns={columns}
        loading={isLoading}
        emptyMessage={emptyMessage}
        emptyIcon={emptyIcon}
        enableSorting
        enableSelection
        enableGlobalSearch
        searchPlaceholder={searchPlaceholder}
        pageSize={pageSize}
        showPagination
        tableClassName="w-full"
      />
    </div>
  </Card>
);