import React, { useState } from 'react';
import { Card, Button, Icon, Input, Select } from '../ui';
import { FILTER_CONFIGS, SUMMARY_METRICS } from '@/data/dummyData';
import { exportToCSV } from '@/utils/csvExport';

const SummaryPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<Record<string, number>>({});
  const [filters, setFilters] = useState<Record<string, string>>({
    currency: 'USD',
    website: 'All',
    marketingToolId: '',
    timeInterval: 'Exact period',
    dateFrom: '2025-06-04',
    dateTo: '2025-06-04'
  });

  const summaryFilters = FILTER_CONFIGS.summary;
  const summaryMetrics = SUMMARY_METRICS;

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockData: Record<string, number> = {
        views: 3489,
        clicks: 754,
        directLinks: 27,
        clicksViews: 9.8,
        registrations: 102,
        regClicksRatio: 13.5,
        regWithDeposits: 62,
        regDepositRatio: 60.7,
        totalNewDepositAmount: 28974,
        newDepositors: 21,
        accountsWithDeposits: 49,
        sumAllDeposits: 75400,
        revenue: 3540,
        numberOfDeposits: 123,
        activePlayers: 87,
        avgProfitPerPlayer: 174
      };
      setReportData(mockData);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const rows = summaryMetrics.map(metric => ({
      Metric: metric.label,
      Value: reportData[metric.key] !== undefined ? reportData[metric.key] : '-'
    }));
    exportToCSV(rows, 'summary-report');
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card padding="md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {summaryFilters.map(filter => (
            <div key={filter.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{filter.label}</label>
              {filter.type === 'select' ? (
                <Select 
                  options={(filter.options || []).map(opt => ({ value: opt, label: opt }))} 
                  value={filters[filter.name]} 
                  onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                />
              ) : (
                <Input 
                  type={filter.type} 
                  value={filters[filter.name] || ''} 
                  onChange={(e) => handleFilterChange(filter.name, e.target.value)} 
                  placeholder={filter.placeholder || ''}
                />
              )}
            </div>
          ))}
        </div>

        {filters.timeInterval === 'Exact period' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <Input 
                type="date" 
                value={filters.dateFrom} 
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <Input 
                type="date" 
                value={filters.dateTo} 
                onChange={(e) => handleFilterChange('dateTo', e.target.value)} 
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
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

      {/* Summary Report */}
      <Card padding="md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Summary Report</h3>
          {Object.keys(reportData).length > 0 && (
            <Button variant="secondary" icon="fas fa-download" onClick={handleExportCSV}>
              EXPORT REPORT
            </Button>
          )}
        </div>

        {Object.keys(reportData).length > 0 ? (
          <table className="w-full table-auto border border-gray-200">
            <tbody>
              {summaryMetrics.map(metric => (
                <tr key={metric.key} className="even:bg-gray-50 border-b">
                  <td className="text-sm font-medium text-gray-700 px-4 py-3 w-1/2">
                    {metric.label}
                  </td>
                  <td className="text-sm font-semibold text-gray-900 px-4 py-3 text-right">
                    {reportData[metric.key] !== undefined ? reportData[metric.key].toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Icon name="fas fa-chart-bar" size="xl" className="mb-4 block" />
            <p className="text-lg font-medium mb-2">No Report Generated</p>
            <p className="text-sm">Click "Generate Report" to view your summary statistics</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SummaryPage;
