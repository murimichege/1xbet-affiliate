import React, { useState, useMemo } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { MAIN_PAGE_STATS, STATS_TABLE_DATA } from '@/data/dummyData';
import { StatCard } from '../common';
import { Card } from '../ui';
import { ColumnDef } from '@tanstack/react-table';



interface StatsTableData {
  currency: string;
  views: number;
  clicks: number;
  directLinks: number;
  registrations: number;
  newDepositors: number;
  companyProfit: number;
  rs: number;
  cpa: number;
  commissionAmount: number;
}

const MainPage: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Yesterday');
  
  const statsTableColumns = useMemo<ColumnDef<StatsTableData>[]>(() => [
    {
      accessorKey: 'currency',
      header: 'CURRENCY',
      size: 80,
      cell: ({ getValue }) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: 'views',
      header: 'VIEWS',
      size: 100,
      cell: ({ getValue }) => (
        <span className="font-medium text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'clicks',
      header: 'CLICKS',
      size: 100,
      cell: ({ getValue }) => (
        <span className="font-medium text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'directLinks',
      header: 'DIRECT LINKS',
      size: 100,
      cell: ({ getValue }) => (
        <span className="font-medium text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'registrations',
      header: 'REGISTRATIONS',
      size: 120,
      cell: ({ getValue }) => (
        <span className="font-medium text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'newDepositors',
      header: 'NEW DEPOSITORS',
      size: 120,
      cell: ({ getValue }) => (
        <span className="font-medium text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'companyProfit',
      header: 'COMPANY PROFIT',
      size: 140,
      cell: ({ row }) => {
        const value = row.original.companyProfit;
        const currency = row.original.currency;
        return (
          <span className="font-semibold text-green-600 text-sm">
            {currency} {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        );
      }
    },    
    {
      accessorKey: 'rs',
      header: 'RS',
      size: 60,
      cell: ({ getValue }) => (
        <span className="text-sm">{getValue() as string}%</span>
      ),
    },
    {
      accessorKey: 'cpa',
      header: 'CPA',
      size: 80,
      cell: ({ row }) => {
        const value = row.original.cpa;
        const currency = row.original.currency;
        return (
          <span className="text-sm">
            {currency} {value.toFixed(2)}
          </span>
        );
      }
    },
    
    {
      accessorKey: 'commissionAmount',
      header: 'COMMISSION',
      size: 120,
      cell: ({ row }) => {
        const value = row.original.commissionAmount;
        const currency = row.original.currency;
        return (
          <span className="font-semibold text-blue-600 text-sm">
            {currency} {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        );
      }
    }
    ,
  ], []);

  return (
    <div className="space-y-6 w-full">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {MAIN_PAGE_STATS.map((card) => (
          <StatCard 
            key={card.id} 
            data={card} 
            // loading={loading}
          />
        ))}
      </div>

      {/* Stats Summary Section with DataTable */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Stats summary
          </h3>
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300"
          >
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <DataTable
            data={STATS_TABLE_DATA}
            columns={statsTableColumns}
            emptyMessage="No statistics data available"
            pageSize={10}
            enableGlobalSearch={true}
            enableSorting={true}
            showPagination={true}
            tableClassName="min-w-full table-fixed"
            className="w-full"
            density="compact"
          />
        </div>
      </Card>
    </div>
  );
};

export default MainPage;