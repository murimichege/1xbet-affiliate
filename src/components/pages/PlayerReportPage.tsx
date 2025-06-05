// src/components/pages/PlayerReportPage.tsx
import React, { useMemo } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button } from '@/components/ui';
import { CurrencyCell } from '@/components/ui/CurrencyCell';
import { PlayerIdCell } from '@/components/ui/PlayerIdCell';
import { CountryCell } from '@/components/ui/CountryCell';
import { WebsiteCell } from '@/components/ui/WebsiteCell';
import { ReportFilters } from '@/components/common/ReportFilters';
import { ColumnDef } from '@tanstack/react-table';
import { useFilters } from '@/hooks/useFilters';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { 
  usePlayerReportData, 
  PlayerReportData 
} from '@/hooks/usePlayerReportData';
import { 
  INITIAL_PLAYER_FILTERS, 
  PLAYER_FILTER_FIELDS 
} from '@/utils/playerReportConfig';

const PlayerReportPage: React.FC = () => {
  // 🎯 **Reusable Business Logic** - Same pattern as FullReportPage
  const { 
    playerData, 
    setPlayerData, 
    generateMockPlayerData, 
    clearPlayerData 
  } = usePlayerReportData();
  
  // 🎯 **DRY Filter Management** - Exact same hook as FullReportPage
  const {
    filters,
    updateFilter,
    applyFilters,
    resetFilters,
    isApplying
  } = useFilters(INITIAL_PLAYER_FILTERS, {
    onApply: async (filters) => {
      const data = await generateMockPlayerData(filters);
      setPlayerData(data);
    },
    onReset: () => {
      clearPlayerData();
    }
  });

  // 🎯 **DRY Async Actions** - Same pattern for export functionality
  const { execute: handleExport, loading: isExporting } = useAsyncAction(
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const csvData = playerData.map(player => ({
        'Website ID': player.websiteId,
        'Website': player.website,
        'Player ID': player.playerId,
        'Registration Date': new Date(player.registrationDate).toLocaleDateString(),
        'Country': player.country,
        'Sum of All Deposits': `${filters.currency} ${player.sumOfAllDeposits.toLocaleString()}`,
        'Company Profit': `${filters.currency} ${player.companyProfit.toLocaleString()}`
      }));
      
      console.log('Exporting player data:', csvData);
      return csvData;
    },
    {
      onSuccess: () => console.log('Player report export completed'),
      onError: (error) => console.error('Player report export failed:', error)
    }
  );

  // 🎯 **Advanced Analytics Hook** - Value-added functionality
  const playerAnalytics = useMemo(() => {
    if (playerData.length === 0) return null;

    const totalDeposits = playerData.reduce((sum, player) => sum + player.sumOfAllDeposits, 0);
    const totalProfit = playerData.reduce((sum, player) => sum + player.companyProfit, 0);
    const avgDepositPerPlayer = totalDeposits / playerData.length;
    const avgProfitPerPlayer = totalProfit / playerData.length;
    const profitMargin = totalDeposits > 0 ? (totalProfit / totalDeposits) * 100 : 0;
    
    const topPlayer = playerData.reduce((top, current) => 
      current.sumOfAllDeposits > top.sumOfAllDeposits ? current : top
    );

    return {
      totalPlayers: playerData.length,
      totalDeposits,
      totalProfit,
      avgDepositPerPlayer,
      avgProfitPerPlayer,
      profitMargin,
      topPlayer
    };
  }, [playerData]);

  // 🎯 **Memoized Columns** - Performance optimized, only recreates when currency changes
  const playerColumns = useMemo<ColumnDef<PlayerReportData>[]>(() => [
    {
      accessorKey: 'websiteId',
      header: 'Website ID',
      size: 120,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm text-gray-600">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'website',
      header: 'Website',
      size: 200,
      cell: ({ getValue }) => (
        <WebsiteCell url={getValue() as string} maxLength={30} />
      )
    },
    {
      accessorKey: 'playerId',
      header: 'Player ID',
      size: 120,
      cell: ({ getValue }) => (
        <PlayerIdCell playerId={getValue() as string} />
      )
    },
    {
      accessorKey: 'registrationDate',
      header: 'Registration Date',
      size: 150,
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <span className="text-sm text-gray-700">
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        );
      }
    },
    {
      accessorKey: 'country',
      header: 'Country',
      size: 140,
      cell: ({ getValue }) => (
        <CountryCell country={getValue() as string} />
      )
    },
    {
      accessorKey: 'sumOfAllDeposits',
      header: 'Sum of All Deposits',
      size: 180,
      cell: ({ row }) => (
        <CurrencyCell 
          amount={row.original.sumOfAllDeposits}
          currency={filters.currency}
          colorClass="text-green-600"
        />
      )
    },
    {
      accessorKey: 'companyProfit',
      header: 'Company Profit (Total)',
      size: 180,
      cell: ({ row }) => (
        <CurrencyCell 
          amount={row.original.companyProfit}
          currency={filters.currency}
          colorClass="text-purple-600"
        />
      )
    }
  ], [filters.currency]);

  return (
    <div className="space-y-6">
      {/* 🎯 **Reusable Filter Component** - Same as FullReportPage */}
      <ReportFilters
        filters={filters}
        onFilterChange={updateFilter}
        onApply={applyFilters}
        onReset={resetFilters}
        fields={PLAYER_FILTER_FIELDS}
        isLoading={isApplying}
        title="Generate Player Report"
      />

      {/* 🎯 **Analytics Summary Card** - Value-added insights */}
      {playerAnalytics && (
        <Card padding="md">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {playerAnalytics.totalPlayers}
              </div>
              <div className="text-sm text-gray-600">Total Players</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filters.currency} {playerAnalytics.totalDeposits.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Deposits</div>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {filters.currency} {playerAnalytics.totalProfit.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Profit</div>
            </div>
            
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {playerAnalytics.profitMargin.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Profit Margin</div>
            </div>
            
            <div className="text-center p-3 bg-cyan-50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-600">
                {filters.currency} {Math.round(playerAnalytics.avgDepositPerPlayer).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Avg Deposit</div>
            </div>
            
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
              <div className="text-xl font-bold text-indigo-600">
                {playerAnalytics.topPlayer.playerId}
              </div>
              <div className="text-sm text-gray-600">Top Player</div>
            </div>
          </div>
        </Card>
      )}

      {/* 🎯 **Results Section** - Enhanced with better UX */}
      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Player Report Data</h3>
            <p className="text-sm text-gray-500 mt-1">
              {playerData.length > 0 
                ? `${playerData.length} player${playerData.length !== 1 ? 's' : ''} found` 
                : 'No players found with current filters'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {playerData.length > 0 && (
              <>
                <div className="text-sm text-gray-500">
                  Filter: {filters.country !== 'Select...' ? filters.country : 'All Countries'}
                </div>
                <Button 
                  variant="secondary" 
                  icon="fas fa-download"
                  onClick={handleExport}
                  loading={isExporting}
                  disabled={isExporting}
                >
                  {isExporting ? 'EXPORTING...' : 'EXPORT'}
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          <DataTable
            data={playerData}
            columns={playerColumns}
            loading={isApplying}
            emptyMessage="No information available. Generate a report to see player data."
            emptyIcon="fas fa-users"
            enableSorting={true}
            enableGlobalSearch={true}
            searchPlaceholder="Search players by ID, country, or website..."
            pageSize={15}
            showPagination={playerData.length > 15}
            tableClassName="min-w-full"
            density="normal"
          />
        </div>
      </Card>
    </div>
  );
};

export default PlayerReportPage;