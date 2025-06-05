import React, { useMemo } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button } from '@/components/ui';
import { CurrencyCell } from '@/components/ui/CurrencyCell';
import { PlayerIdCell } from '@/components/ui/PlayerIdCell';
import { WebsiteCell } from '@/components/ui/WebsiteCell';
import { ReportFilters } from '@/components/common/ReportFilters';
import { ColumnDef } from '@tanstack/react-table';
import { useFilters } from '@/hooks/useFilters';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { useCountries } from '@/hooks/useCountries'; 
import { 
  usePlayerReportData, 
  PlayerReportData 
} from '@/hooks/usePlayerReport';
import { 
  INITIAL_PLAYER_FILTERS, 
  PLAYER_FILTER_FIELDS 
} from '@/utils/ReportConfig';

const PlayerReportPage: React.FC = () => {
  const { countries, loading: countriesLoading } = useCountries();

  const { 
    playerData, 
    setPlayerData, 
    generateMockPlayerData, 
    clearPlayerData 
  } = usePlayerReportData();
  
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

  // 🎯 **Enhanced Filter Fields** - Dynamic country options from API
  const enhancedFilterFields = useMemo(() => {
    return PLAYER_FILTER_FIELDS.map(field => {
      if (field.key === 'country') {
        return {
          ...field,
          options: ['All Countries', ...countries.map(c => c.name)]
        };
      }
      return field;
    });
  }, [countries]);

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

  // 🎯 **Enhanced Analytics** - Now includes country distribution
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

    // Country distribution analysis
    const countryDistribution = playerData.reduce((acc, player) => {
      acc[player.country] = (acc[player.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCountry = Object.entries(countryDistribution)
      .sort(([,a], [,b]) => b - a)[0];

    return {
      totalPlayers: playerData.length,
      totalDeposits,
      totalProfit,
      avgDepositPerPlayer,
      avgProfitPerPlayer,
      profitMargin,
      topPlayer,
      countryDistribution,
      topCountry: topCountry ? { name: topCountry[0], count: topCountry[1] } : null
    };
  }, [playerData]);

  // 🎯 **Memoized Columns** - Simplified country display
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
        <span className="text-sm font-medium text-gray-700">
          {getValue() as string}
        </span>
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
      {countriesLoading && (
        <Card padding="sm" className="bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-2 text-blue-800">
            <span className="text-sm">🌍 Loading country data...</span>
          </div>
        </Card>
      )}

      {/* 🎯 **Enhanced Filter Component** - Now with API countries */}
      <ReportFilters
        filters={filters}
        onFilterChange={updateFilter}
        onApply={applyFilters}
        onReset={resetFilters}
        fields={enhancedFilterFields}
        isLoading={isApplying || countriesLoading}
        title="Generate Player Report"
      />

    
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
                  Filter: {filters.country !== 'All Countries' ? filters.country : 'All Countries'}
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