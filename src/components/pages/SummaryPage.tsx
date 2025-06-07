import React, { useState, useMemo } from 'react';
import { Card, Button, Icon } from '@/components/ui';
import { SummaryReportFilters } from '@/components/common/ReportFilters';
import { useFilters } from '@/hooks/useFilters';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { SUMMARY_METRICS } from '@/data/dummyData';
import { exportToCSV } from '@/utils/csvExport';
import { SUMMARY_FILTER_FIELDS } from '@/utils/ReportConfig';

const INITIAL_SUMMARY_FILTERS = {
  currency: 'USD',
  website: 'All',
  marketingToolId: '',
  timeInterval: 'Exact period',
  dateFrom: '2025-06-04',
  dateTo: '2025-06-04'
};



interface SummaryData {
  views: number;
  clicks: number;
  directLinks: number;
  clicksViews: number;
  registrations: number;
  regClicksRatio: number;
  regWithDeposits: number;
  regDepositRatio: number;
  totalNewDepositAmount: number;
  newDepositors: number;
  accountsWithDeposits: number;
  sumAllDeposits: number;
  revenue: number;
  numberOfDeposits: number;
  activePlayers: number;
  avgProfitPerPlayer: number;
}

const SummaryPage: React.FC = () => {
  const [reportData, setReportData] = useState<SummaryData | null>(null);

  const {
    filters,
    updateFilter,
    applyFilters,
    resetFilters,
    isApplying
  } = useFilters(INITIAL_SUMMARY_FILTERS, {
    onApply: async (filters) => {
      const data = await generateMockSummaryData(filters);
      setReportData(data);
    },
    onReset: () => {
      setReportData(null);
    }
  });

  const generateMockSummaryData = async (filters: typeof INITIAL_SUMMARY_FILTERS): Promise<SummaryData> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
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
  };

  const { execute: handleExport, loading: isExporting } = useAsyncAction(
    async () => {
      if (!reportData) return;
      
      const rows = SUMMARY_METRICS.map(metric => ({
        Metric: metric.label,
        Value: reportData[metric.key as keyof SummaryData] !== undefined 
          ? reportData[metric.key as keyof SummaryData] 
          : '-'
      }));
      
      exportToCSV(rows, `summary-report-${new Date().toISOString().split('T')[0]}`);
    },
    {
      onSuccess: () => console.log('Summary report exported successfully'),
      onError: (error) => console.error('Export failed:', error)
    }
  );

  const formattedMetrics = useMemo(() => {
    if (!reportData) return [];

    return SUMMARY_METRICS.map(metric => {
      const value = reportData[metric.key as keyof SummaryData];
      let formattedValue = '-';

      if (value !== undefined) {
        // Format based on metric type
        if (metric.key.includes('Ratio') || metric.key.includes('Views')) {
          formattedValue = `${value.toFixed(1)}%`;
        } else if (metric.key.includes('Amount') || metric.key.includes('revenue') || metric.key.includes('sumAll')) {
          formattedValue = `${filters.currency} ${value.toLocaleString()}`;
        } else {
          formattedValue = value.toLocaleString();
        }
      }

      return {
        ...metric,
        formattedValue,
        rawValue: value
      };
    });
  }, [reportData, filters.currency]);

  return (
    <div className="space-y-6">
      <SummaryReportFilters
        filters={filters}
        onFilterChange={updateFilter}
        onApply={applyFilters}
        onReset={resetFilters}
        fields={SUMMARY_FILTER_FIELDS}
        isLoading={isApplying}
      />

   

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Detailed Summary Report</h3>
            <p className="text-sm text-gray-500 mt-1">
              {reportData 
                ? `Generated for ${filters.dateFrom} to ${filters.dateTo}` 
                : 'Generate a report to view detailed metrics'
              }
            </p>
          </div>
          
          {reportData && (
            <Button 
              variant="secondary" 
              icon="fas fa-download" 
              onClick={handleExport}
              loading={isExporting}
              disabled={isExporting}
            >
              {isExporting ? 'EXPORTING...' : 'EXPORT REPORT'}
            </Button>
          )}
        </div>

        {reportData ? (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-sm font-medium text-gray-700 px-6 py-3">
                    Metric
                  </th>
                  <th className="text-right text-sm font-medium text-gray-700 px-6 py-3">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {formattedMetrics.map((metric, index) => (
                  <tr 
                    key={metric.key} 
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}
                  >
                    <td className="text-sm font-medium text-gray-700 px-6 py-4">
                      {metric.label}
                    </td>
                    <td className="text-sm font-semibold text-gray-900 px-6 py-4 text-right">
                      {metric.formattedValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="mb-4">
              <Icon name="fas fa-chart-bar" size="md" className="text-gray-400 mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Report Generated</h4>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              Configure your filters above and click "Generate Report" to view your summary statistics and detailed metrics.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SummaryPage;