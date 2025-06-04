import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { TableColumn } from '@/types/common';
import { 
  FILTER_CONFIGS, 
  CURRENCIES, 
  WEBSITE_URLS, 
  TIME_INTERVALS, 
  REGISTRATION_SOURCES 
} from '@/data/dummyData';

interface FullReportData {
  websiteId: string;
  website: string;
  registrations: number;
  newDepositors: number;
  totalDepositAmount: number;
  bonusAmount: number;
  companyProfit: number;
  commissionAmount: number;
}

interface FullReportPageProps {
  darkMode: boolean;
}

const FullReportPage: React.FC<FullReportPageProps> = ({ darkMode }) => {
  const [reportData, setReportData] = useState<FullReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    currency: 'USD',
    website: 'All',
    marketingToolId: '',
    timeInterval: 'Exact period',
    dateFrom: '2025-06-04',
    dateTo: '2025-06-04',
    registrationSource: 'Select...'
  });

  const reportFilters = FILTER_CONFIGS.report;

  const reportColumns: TableColumn<FullReportData>[] = [
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
      key: 'registrations',
      header: 'Registrations',
      sortable: true,
      width: 'w-24',
      render: (value) => (
        <span className="font-semibold">{value.toLocaleString()}</span>
      )
    },
    {
      key: 'newDepositors',
      header: 'New depositors',
      sortable: true,
      width: 'w-28',
      render: (value) => (
        <span className="font-semibold text-green-600">{value.toLocaleString()}</span>
      )
    },
    {
      key: 'totalDepositAmount',
      header: 'Total deposit amount',
      sortable: true,
      width: 'w-36',
      render: (value) => (
        <span className="font-semibold">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'bonusAmount',
      header: 'Bonus amount',
      sortable: true,
      width: 'w-28',
      render: (value) => (
        <span className="font-semibold text-orange-600">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'companyProfit',
      header: 'Company profit (total)',
      sortable: true,
      width: 'w-36',
      render: (value) => (
        <span className="font-semibold text-purple-600">${value.toLocaleString()}</span>
      )
    },
    {
      key: 'commissionAmount',
      header: 'Commission amount',
      sortable: true,
      width: 'w-32',
      render: (value) => (
        <span className="font-semibold text-blue-600">${value.toLocaleString()}</span>
      )
    }
  ];

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data
      const mockData: FullReportData[] = [];
      setReportData(mockData); // Empty for "No information" state as shown in image
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card darkMode={darkMode} padding="md">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                label="Currency"
                value={filters.currency}
                onChange={(e) => updateFilter('currency', e.target.value)}
                options={CURRENCIES}
                darkMode={darkMode}
              />
              
              <Select
                label="Website"
                value={filters.website}
                onChange={(e) => updateFilter('website', e.target.value)}
                options={['All', ...WEBSITE_URLS]}
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
                label="Time interval"
                value={filters.timeInterval}
                onChange={(e) => updateFilter('timeInterval', e.target.value)}
                options={TIME_INTERVALS}
                darkMode={darkMode}
              />
            </div>
          </div>
          
          {/* Date Range */}
          <div className="md:col-span-1">
            <div className="space-y-2">
              <Input
                label="Date Range"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                darkMode={darkMode}
              />
              <div className="text-center">
                <Icon name="fas fa-arrow-down" className="text-gray-400" size="xs" />
              </div>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Registration Source */}
          <div className="md:col-span-1">
            <Select
              label="Registration Source"
              value={filters.registrationSource}
              onChange={(e) => updateFilter('registrationSource', e.target.value)}
              options={REGISTRATION_SOURCES}
              darkMode={darkMode}
            />
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
            Full Report Data
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
              columns={reportColumns}
              darkMode={darkMode}
              emptyMessage="No information available. Generate a report to see data."
              enableSelection={true}
            />
          )}
        </div>
      </Card>

      {/* Report Summary */}
      {reportData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card darkMode={darkMode} padding="md">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="fas fa-users" color="#2563EB" size="xl" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.reduce((sum, item) => sum + item.registrations, 0).toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Registrations
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
                  {reportData.reduce((sum, item) => sum + item.newDepositors, 0).toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  New Depositors
                </p>
              </div>
            </div>
          </Card>

          <Card darkMode={darkMode} padding="md">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="fas fa-dollar-sign" color="#9333EA" size="xl" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${reportData.reduce((sum, item) => sum + item.totalDepositAmount, 0).toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Deposits
                </p>
              </div>
            </div>
          </Card>

          <Card darkMode={darkMode} padding="md">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon name="fas fa-chart-line" color="#EA580C" size="xl" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${reportData.reduce((sum, item) => sum + item.commissionAmount, 0).toLocaleString()}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Commission
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FullReportPage;