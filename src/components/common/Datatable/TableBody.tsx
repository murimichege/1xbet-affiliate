import { flexRender, Table } from '@tanstack/react-table';

interface TableBodyProps<T> {
  table: Table<T>;
  darkMode: boolean;
  onRowClick?: (row: T) => void;
  density: 'compact' | 'normal' | 'comfortable';
  densityClasses: Record<string, string>;
}

export function TableBody<T>({ 
  table, 
  darkMode, 
  onRowClick, 
  density, 
  densityClasses 
}: TableBodyProps<T>) {
  return (
    <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
      {table.getRowModel().rows.map(row => (
        <tr
          key={row.id}
          className={`transition-colors ${
            onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''
          } ${
            row.getIsSelected() 
              ? darkMode ? 'bg-blue-900/20' : 'bg-blue-50' 
              : ''
          }`}
          onClick={() => onRowClick?.(row.original)}
        >
          {row.getVisibleCells().map(cell => (
            <td
              key={cell.id}
              className={`px-6 ${densityClasses[density]} whitespace-nowrap text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-900'
              }`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}