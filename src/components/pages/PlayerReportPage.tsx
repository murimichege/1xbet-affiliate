import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { TableColumn } from '@/types/common';
import { 
  FILTER_CONFIGS, 
  CURRENCIES, 
  COUNTRIES, 
  WEBSITE_URLS, 
  TIME_INTERVALS,
  CAMPAIGNS,
  REGISTRATION_SOURCES
} from '@/data/dummyData';

interface PlayerReportData {
  websiteId: string;
  website: string;
  subId: string;
  playerId: string;
  registrationDate: string;
  country: string;
  sumOfAllDeposits: number;
  companyProfit: number;
}

interface PlayerReportPageProps {
  darkMode: boolean;
}

const PlayerReportPage: React.FC<PlayerReportPageProps> = ({ darkMode }) => {
  const [reportData, setReportData] = useState<PlayerReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    currency: 'USD',
    country: 'Select...',
    marketingToolId: '',
    website: 'All',
    timeInterval: 'Exact period',
    campaign: 'Select...',
    playerId: '',
    registrationSource: 'Select...',
    subId: '',
    dateFrom: '2025-06-04',
    dateTo: '2025-06-04',
    newPlayersOnly: false,
    nonDepositingOnly: false
  });

  const playerColumns: TableColumn<PlayerReportData>[] = [
    {
      key: 'websiteId',
      header: 'Website ID',
      sortable: true,
      width: 'w-24',
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'website',
      header: 'Website',
      sortable: true,
      render: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 truncate">
          {value}
        </a>
      )
    },
    {
      key: 'subId',
      header: 'SUBID',
      sortable: true,
      width: 'w-24',
      render: (value) => (
        <span className="font-mono text-sm">{value || '-'}</span>
      )
    },
    {
      key: 'playerId',
      header: 'Player ID',
      sortable: true,
      width: 'w-28',
      render: (value) => (
        <span className="font-mono text-sm font-semibold">{value}</span>
      )
    },
    {
      key: 'registrationDate',
      header: 'Registration date',
      sortable: true,
      width: 'w-32',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'country',
      header: 'Country',
      sortable: true,
      width: 'w-24',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <span className="text-lg">🌍</span>
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'sumOfAllDeposits',
      header: 'Sum of all deposits',
      sortable: true,
      width: 'w-36',
      render: (value) => (
        <span className="font-semibold text-green-600">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'companyProfit',
      header: 'Company profit (total)',
      sortable: true,
      width: 'w-40',
      render: (value) => (
        <span className="font-semibold text-purple-600">${value.toLocaleString()}</span>
      )
    }
  ];

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data
      const mockData: PlayerReportData[] = [];
      setReportData(mockData); // Empty for "No information" state as shown in image
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card darkMode={darkMode} padding="md">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <Select
            label="Currency"
            value={filters.currency}
            onChange={(e) => updateFilter('currency', e.target.value)}
            options={CURRENCIES}
            darkMode={darkMode}
          />
          
          <Select
            label="Country"
            value={filters.country}
            onChange={(e) => updateFilter('country', e.target.value)}
            options={COUNTRIES}
            darkMode={darkMode}
          />
          
          <Input
            label="Marketing tool ID"
            type="text"
            value={filters.marketingToolId}
            onChange={(e) => updateFilter('marketingToolId', e.target.value)}
            placeholder="Enter tool ID"
            darkMode={darkMode}
          />
          
          <Select
            label="Website"
            value={filters.website}
            onChange={(e) => updateFilter('website', e.target.value)}
            options={['All', ...WEBSITE_URLS]}
            darkMode={darkMode}
          />
          
          <Select
            label="Time interval"
            value={filters.timeInterval}
            onChange={(e) => updateFilter('timeInterval', e.target.value)}
            options={TIME_INTERVALS}
            darkMode={darkMode}
          />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Date Range
            </label>
            <div className="flex space-x-2 items-center">
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                darkMode={darkMode}
              />
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>→</span>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                darkMode={darkMode}
              />
            </div>
          </div>

          <Select
            label="Campaign"
            value={filters.campaign}
            onChange={(e) => updateFilter('campaign', e.target.value)}
            options={CAMPAIGNS}
            darkMode={darkMode}
          />

          <Input
            label="Player ID"
            type="text"
            value={filters.playerId}
            onChange={(e) => updateFilter('playerId', e.target.value)}
            placeholder="Enter player ID"
            darkMode={darkMode}
          />
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <Select
            label="Registration Source"
            value={filters.registrationSource}
            onChange={(e) => updateFilter('registrationSource', e.target.value)}
            options={REGISTRATION_SOURCES}
            darkMode={darkMode}
          />

          <Input
            label="Sub ID"
            type="text"
            value={filters.subId}
            onChange={(e) => updateFilter('subId', e.target.value)}
            placeholder="Enter Sub ID"
            darkMode={darkMode}
          />

          <div className="flex items-end space-x-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newPlayersOnly"
                checked={filters.newPlayersOnly}
                onChange={(e) => updateFilter('newPlayersOnly', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="newPlayersOnly" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                New players only
              </label>
            </div>
          </div>

          <div className="flex items-end space-x-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="nonDepositingOnly"
                checked={filters.nonDepositingOnly}
                onChange={(e) => updateFilter('nonDepositingOnly', e.target.checked)}
                className="rounded"
              />
              <label htmlFor="nonDepositingOnly" className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Non-depositing players only
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button 
            onClick={handleGenerateReport}
            icon="fas fa-chart-line"
            loading={loading}
            size="lg"
          >
            GENERATE REPORT
          </Button>
        </div>
      </Card>

      {/* Report Table */}
      <Card darkMode={darkMode} className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Player Report Data
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              8 items selected
            </div>
            <Button variant="secondary" icon="fas fa-download">
              EXPORT
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className={`h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4`}></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
                ))}
              </div>
            </div>
          ) : (
            <DataTable
              data={reportData}
              columns={playerColumns}
              darkMode={darkMode}
              emptyMessage="No information available. Generate a report to see player data."
              selectable={true}
            />
          )}
        </div>
      </Card>

      {/* Player Statistics */}
      {reportData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card darkMode={darkMode} padding="md">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="fas fa-users" color="#2563EB" size="xl" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.length.toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Players
                </p>
              </div>
            </div>
          </Card>

          <Card darkMode={darkMode} padding="md">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="fas fa-wallet" color="#16A34A" size="xl" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${reportData.reduce((sum, item) => sum + item.sumOfAllDeposits, 0).toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Deposits
                </p>
              </div>
            </div>
          </Card>

          <Card darkMode={darkMode} padding="md">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="fas fa-chart-line" color="#9333EA" size="xl" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${reportData.reduce((sum, item) => sum + item.companyProfit, 0).toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Profit
                </p>
              </div>
            </div>
          </Card>

          <Card darkMode={darkMode} padding="md">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon name="fas fa-calculator" color="#EA580C" size="xl" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${reportData.length > 0 ? Math.round(reportData.reduce((sum, item) => sum + item.sumOfAllDeposits, 0) / reportData.length).toLocaleString() : 0}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Avg per Player
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PlayerReportPage;