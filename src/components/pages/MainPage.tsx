import React, { useState, useMemo, useEffect } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { STATS_TABLE_DATA } from '@/data/dummyData';
import { StatCard } from '../common';
import { Card } from '../ui';
import { ColumnDef } from '@tanstack/react-table';
import affiliateService from '@/services/affiliateService';

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

interface ProfileStats {
  username: string;
  currency: string;
  country: string;
  fixedPay: number;
  revShare: number;
  domain: string;
  memberSince: number;
}

interface StatCardData {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  bgColor: string;
}

const MainPage: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Yesterday');
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile data
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const profile = await affiliateService.profile.get();
        
        // Map profile data to stats
        const stats: ProfileStats = {
          username: profile.username,
          currency: profile.currency,
          country: profile.country?.toUpperCase() || 'N/A',
          fixedPay: profile.fixed_pay,
          revShare: profile.rev_share, // Keep as decimal: 0.25
          domain: profile.domains?.[0]?.domain || 'N/A',
          memberSince: new Date(profile.created_at).getFullYear()
        };

        setProfileStats(stats);
      } catch (error) {
        console.error('Error loading stats:', error);
        setProfileStats({
          username: 'Unknown',
          currency: 'USD',
          country: 'N/A',
          fixedPay: 0,
          revShare: 0,
          domain: 'N/A',
          memberSince: new Date().getFullYear()
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Generate stat cards from profile data (only fixed_pay and rev_share)
  const getMainPageStats = (): StatCardData[] => {
    if (!profileStats) return [];

    return [
      {
        id: 'fixed-pay',
        label: 'FIXED PAY',
        value: `${profileStats.currency} ${profileStats.fixedPay.toFixed(2)}`,
        icon: 'fas fa-money-bill',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 'rev-share',
        label: 'REVENUE SHARE',
        value: `${profileStats.revShare}`,
        icon: 'fas fa-percentage',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      }
    ];
  };

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
          <span className="font-semibold text-blue-600 text-xs sm:text-sm">
            {currency} {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </span>
        );
      }
    },
  ], []);

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Welcome Message */}
      {profileStats && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Welcome, {profileStats.username}!
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Affiliate Dashboard - {profileStats.country} ({profileStats.domain})
          </p>
        </div>
      )}
      
      {/* Statistics Cards - Only Fixed Pay and Revenue Share */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {getMainPageStats().map((card) => (
          <StatCard 
            key={card.id} 
            data={card} 
            loading={loading}
          />
        ))}
      </div>

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