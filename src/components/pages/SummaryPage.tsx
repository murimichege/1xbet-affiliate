import React, { useState } from 'react';
import { FilterRow } from '../common';
import { Card, Button, Icon, Input } from '../ui';
import { FILTER_CONFIGS, SUMMARY_METRICS } from '@/data/dummyData';

interface SummaryPageProps {
  darkMode: boolean;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ darkMode }) => {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<Record<string, number>>({});
  const [dateRange, setDateRange] = useState({
    from: '2025-06-04',
    to: '2025-06-04'
  });

  const summaryFilters = FILTER_CONFIGS.summary;
  const summaryMetrics = SUMMARY_METRICS;

  const handleGenerateReport = async (filters?: Record<string, string>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data generation
      const mockData: Record<string, number> = {
        views: Math.floor(Math.random() * 10000) + 1000,
        clicks: Math.floor(Math.random() * 1000) + 100,
        directLinks: Math.floor(Math.random() * 50) + 10,
        clicksViews: Math.random() * 10 + 2,
        registrations: Math.floor(Math.random() * 100) + 10,
        regClicksRatio: Math.random() * 20 + 5,
        regWithDeposits: Math.floor(Math.random() * 50) + 5,
        regDepositRatio: Math.random() * 50 + 10,
        totalNewDepositAmount: Math.floor(Math.random() * 50000) + 10000,
        newDepositors: Math.floor(Math.random() * 30) + 5,
        accountsWithDeposits: Math.floor(Math.random() * 80) + 20,
        sumAllDeposits: Math.floor(Math.random() * 100000) + 20000,
        revenue: Math.floor(Math.random() * 5000) + 1000,
        numberOfDeposits: Math.floor(Math.random() * 200) + 50,
        activePlayers: Math.floor(Math.random() * 150) + 30,
        avgProfitPerPlayer: Math.floor(Math.random() * 500) + 50
      };
      
      setReportData(mockData);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (key: string, value: number): string => {
    if (key.includes('Amount') || key.includes('revenue') || key.includes('Deposits') || key.includes('Profit')) {
      return `$${value.toLocaleString()}`;
    }
    if (key.includes('Ratio') || key.includes('Views')) {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString();
  };

  const updateDateRange = (key: 'from' | 'to', value: string) => {
    setDateRange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card darkMode={darkMode} padding="md">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-4">
            <FilterRow 
              filters={summaryFilters} 
              darkMode={darkMode}
              onApply={handleGenerateReport}
              loading={loading}
            />
          </div>
          
          {/* Date Range */}
          <div className="md:col-span-1">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Date Range
            </label>
            <div className="space-y-2">
              <Input
                type="date"
                value={dateRange.from}
                onChange={(e) => updateDateRange('from', e.target.value)}
                darkMode={darkMode}
              />
              <div className="text-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>→</span>
              </div>
              <Input
                type="date"
                value={dateRange.to}
                onChange={(e) => updateDateRange('to', e.target.value)}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button 
            onClick={() => handleGenerateReport({})}
            icon="fas fa-chart-line"
            loading={loading}
            size="lg"
          >
            GENERATE REPORT
          </Button>
        </div>
      </Card>

      {/* Summary Metrics */}
      <Card darkMode={darkMode} padding="md">
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Summary Report
          </h3>
          {Object.keys(reportData).length > 0 && (
            <Button variant="secondary" icon="fas fa-download">
              EXPORT REPORT
            </Button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryMetrics.map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                  <div className={`h-4 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded w-3/4 mb-2`}></div>
                  <div className={`h-8 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded w-1/2`}></div>
                </div>
              </div>
            ))}
          </div>
        ) : Object.keys(reportData).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryMetrics.map((metric) => (
              <Card
                key={metric.key}
                darkMode={darkMode}
                padding="md"
                hoverable
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`${metric.bgColor} p-2 rounded-lg`}>
                    <Icon name={metric.icon} className={metric.color} size="sm" />
                  </div>
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
                  {metric.label}
                </p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData[metric.key] !== undefined 
                    ? formatValue(metric.key, reportData[metric.key])
                    : '-'
                  }
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <Icon name="fas fa-chart-bar" size="xl" className="mb-4 block" />
            <p className="text-lg font-medium mb-2">No Report Generated</p>
            <p className="text-sm">Click "Generate Report" to view your summary statistics</p>
          </div>
        )}
      </Card>

      {/* Quick Stats Overview */}
      {Object.keys(reportData).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card darkMode={darkMode} padding="md">
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Conversion Funnel
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Views</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.views?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Clicks</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.clicks?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Registrations</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.registrations?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Depositors</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.newDepositors?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </Card>

          <Card darkMode={darkMode} padding="md">
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Revenue Overview
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Revenue</span>
                <span className={`font-medium text-green-600`}>
                  ${reportData.revenue?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Deposits</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${reportData.sumAllDeposits?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg per Player</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${reportData.avgProfitPerPlayer?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Players</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.activePlayers?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </Card>

          <Card darkMode={darkMode} padding="md">
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Performance Ratios
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Click Rate</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.clicksViews?.toFixed(1) || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Conversion Rate</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.regClicksRatio?.toFixed(1) || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Deposit Rate</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.regDepositRatio?.toFixed(1) || 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Deposits</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {reportData.numberOfDeposits?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SummaryPage;