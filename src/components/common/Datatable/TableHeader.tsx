import React from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import { Icon } from '@/components/ui';

interface TableHeaderProps<T> {
  table: Table<T>;
  darkMode: boolean;
  enableSorting: boolean;
}

export function TableHeader<T>({ table, darkMode, enableSorting }: TableHeaderProps<T>) {
  const getSortIcon = (isSorted: false | "asc" | "desc") => {
    if (!isSorted) {
      return <Icon name="fas fa-sort" className="ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return isSorted === 'asc' 
      ? <Icon name="fas fa-sort-up" className="ml-1 text-blue-600" />
      : <Icon name="fas fa-sort-down" className="ml-1 text-blue-600" />;
  };

  return (
    <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th
              key={header.id}
              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}
              style={{ width: header.getSize() }}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={`flex items-center ${
                    header.column.getCanSort() && enableSorting
                      ? 'cursor-pointer select-none group hover:text-blue-600 transition-colors'
                      : ''
                  }`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && enableSorting && 
                    getSortIcon(header.column.getIsSorted())
                  }
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}