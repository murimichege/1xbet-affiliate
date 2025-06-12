import React, { useState, useMemo } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { STATS_TABLE_DATA } from '@/data/dummyData';
import { StatCard } from '../common';
import { Card } from '../ui';
import { ColumnDef } from '@tanstack/react-table';
import { useResourceManager } from '@/hooks/useResourceManager';
import { formatCurrency } from '@/utils/formatters';

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
  
  const { 
    profileStats, 
    summaryStats, 
    profileInfo, 
    isLoading,
    profileLoading, 
    summaryLoading 
  } = useResourceManager('main-page-stats');

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
        <span className="font-medium text-xs sm:text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'clicks',
      header: 'CLICKS',
      size: 100,
      cell: ({ getValue }) => (
        <span className="font-medium text-xs sm:text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'directLinks',
      header: 'DIRECT LINKS',
      size: 100,
      cell: ({ getValue }) => (
        <span className="font-medium text-xs sm:text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'registrations',
      header: 'REGISTRATIONS',
      size: 120,
      cell: ({ getValue }) => (
        <span className="font-medium text-xs sm:text-sm">
          {(getValue() as number).toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: 'newDepositors',
      header: 'NEW DEPOSITORS',
      size: 120,
      cell: ({ getValue }) => (
        <span className="font-medium text-xs sm:text-sm">
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
          <span className="font-semibold text-green-600 text-xs sm:text-sm">
            {formatCurrency(value, currency)}
          </span>
        );
      }
    },    
    {
      accessorKey: 'rs',
      header: 'RS',
      size: 60,
      cell: ({ getValue }) => (
        <span className="text-xs sm:text-sm">{getValue() as number}%</span>
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
          <span className="text-xs sm:text-sm">
            {formatCurrency(value, currency)}
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
          <span className="font-semibold text-blue-600 text-xs sm:text-sm">
            {formatCurrency(value, currency)}
          </span>
        );
      }
    },
  ], []);

  // Show loading state if main data is loading
  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 w-full max-w-full">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-20 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-200 rounded-lg h-24"></div>
            <div className="bg-gray-200 rounded-lg h-24"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Welcome Message */}
      {profileInfo && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Welcome, {profileInfo.username}!
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Affiliate Dashboard - {profileInfo.country} ({profileInfo.domain}) | Member since {profileInfo.memberSince}
          </p>
        </div>
      )}
      
      {/* Statistics Cards - Profile Stats (Fixed Pay and Revenue Share) */}
      {profileStats && profileStats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {profileStats.map((card) => (
            <StatCard 
              key={card.id} 
              data={card} 
              loading={profileLoading}
            />
          ))}
        </div>
      )}

      {/* Summary Statistics Cards */}
      {summaryStats && summaryStats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {summaryStats.map((card) => (
            <StatCard 
              key={card.id} 
              data={card} 
              loading={summaryLoading}
            />
          ))}
        </div>
      )}

      {/* Stats Summary Table */}
      <Card className="p-4 sm:p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Stats summary
          </h3>
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300 text-sm w-full sm:w-auto"
          >
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
        
        {/* Mobile-friendly table wrapper */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="px-4 sm:px-0">
              <DataTable
                data={STATS_TABLE_DATA}
                columns={statsTableColumns}
                emptyMessage="No statistics data available"
                pageSize={10}
                enableGlobalSearch={true}
                enableSorting={true}
                enableSelection={true}
                showPagination={true}
                tableClassName="min-w-full"
                className="w-full"
                density="compact"
                searchPlaceholder="Search stats..."
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainPage;