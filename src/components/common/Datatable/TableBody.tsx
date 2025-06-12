import { flexRender, Table } from '@tanstack/react-table';

interface TableBodyProps<T> {
  table: Table<T>;
  onRowClick?: (row: T) => void;
  density: 'compact' | 'normal' | 'comfortable';
  densityClasses: Record<string, string>;
}

export function TableBody<T>({ 
  table, 
  onRowClick, 
  density, 
  densityClasses 
}: TableBodyProps<T>) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {table.getRowModel().rows.map(row => (
        <tr
          key={row.id}
          className={`transition-colors hover:bg-blue-50 ${onRowClick ? 'cursor-pointer' : ''} ${row.getIsSelected() ? 'bg-blue-50' : ''}`}
          onClick={() => onRowClick?.(row.original)}
        >
          {row.getVisibleCells().map(cell => (
            <td
              key={cell.id}
              className={`px-6 ${densityClasses[density]} whitespace-nowrap text-sm text-gray-900`}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}