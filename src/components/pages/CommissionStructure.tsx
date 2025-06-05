import React from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { CommissionStructure } from '@/types/commission';
import { mockCommissions } from '@/data/dummyData';



const CommissionStructurePage: React.FC = () => {
  const commissionColumns: ColumnDef<CommissionStructure>[] = [
    {
      accessorKey: 'currency',
      header: 'Currency'
    },
    {
      accessorKey: 'structure',
      header: 'Commission Structure'
    },
    {
      accessorKey: 'groupName',
      header: 'Commission Group Name'
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date'
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: info => (
        <div className="max-w-md truncate" title={info.getValue() as string}>
          {info.getValue() as string}
        </div>
      )
    },
    {
      accessorKey: 'endDate',
      header: 'End Date'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Structures</h3>
        <DataTable
          data={mockCommissions}
          columns={commissionColumns}
          emptyMessage="No commission structures found"
          enableSelection={false}
        />
      </Card>
    </div>
  );
};

export default CommissionStructurePage;
