import React from 'react';
import { Card, Button, Icon } from '@/components/ui';
import { SummaryReportFilters } from '@/components/filters/FilterOptions';
import { useReportManager } from '@/hooks/useReportManager';
import type { QuickReportResponse } from '@/types/affiliate';

interface EmptyStateProps {
  type: 'no-report' | 'no-data';
  filters: { start: Date; end: Date };
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, filters }) => {
  if (type === 'no-data') {
    return (
      <div className="text-center py-16 text-gray-500">
        <Icon name="fas fa-search" className="text-gray-400 mx-auto text-4xl mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-2">No Data Found</h4>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
          No data was found for the selected filters and date range ({filters.start.toLocaleString()} to {filters.end.toLocaleString()}).
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-lg mx-auto">
          <h5 className="text-sm font-medium text-blue-900 mb-2">Try adjusting your filters:</h5>
          <ul className="text-xs text-blue-700 space-y-1 text-left">
            <li>• Expand the date range to include more days</li>
            <li>• Remove link or promo code filters to include all data</li>
            <li>• Check if the selected links/promos had activity during this period</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16 text-gray-500">
      <Icon name="fas fa-chart-bar" className="text-gray-400 mx-auto text-4xl mb-4" />
      <h4 className="text-lg font-medium text-gray-900 mb-2">No Report Generated</h4>
      <p className="text-sm text-gray-500 max-w-md mx-auto">
        Set a date range and optional filters above, then click "Generate Report" to view your affiliate performance metrics.
      </p>
    </div>
  );
};

interface ReportTableProps {
  data: QuickReportResponse;
  filters: { start: Date; end: Date };
  formattedMetrics: Array<{
    key: string;
    label: string;
    icon?: string;
    formattedValue: string;
  }>;
  onExport: () => void;
  isExporting: boolean;
}

const ReportTable: React.FC<ReportTableProps> = ({ 
  data, 
  filters, 
  formattedMetrics, 
  onExport, 
  isExporting 
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Quick Report</h3>
          <p className="text-sm text-gray-500 mt-1">
            Report from {filters.start.toLocaleString()} to {filters.end.toLocaleString()} • Currency: {data.currency}
          </p>
        </div>
        <Button
          variant="secondary"
          icon="fas fa-download"
          onClick={onExport}
          loading={isExporting}
          disabled={isExporting}
        >
          {isExporting ? 'EXPORTING...' : 'EXPORT CSV'}
        </Button>
      </div>

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
            {formattedMetrics.map(({ key, label, icon, formattedValue }) => (
              <tr 
                key={key} 
                className="hover:bg-blue-50 transition-colors"
              >
                <td className="text-sm font-medium text-gray-700 px-6 py-4">
                  <div className="flex items-center">
                    {icon && <Icon name={icon} className="mr-3 text-gray-400" />}
                    {label}
                  </div>
                </td>
                <td className="text-sm font-semibold text-gray-900 px-6 py-4 text-right">
                  {formattedValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};


const SummaryPage: React.FC = () => {
  const {
    // State
    filters,
    reportData,
    filterFields,
    formattedMetrics,
    
    // Loading states
    isGenerating,
    isExporting,
    loadingOptions,
    
    // Actions
    updateFilter,
    generateReport,
    exportReport,
    resetFilters,
    
    // Utilities
    hasData,
    isEmpty  } = useReportManager();

  return (
    <div className="space-y-6">
      <SummaryReportFilters
        filters={filters}
        onFilterChange={updateFilter}
        onApply={generateReport}
        onReset={resetFilters}
        fields={filterFields}
        isLoading={isGenerating || loadingOptions}
        title="Quick Report Filters"
      />

      <Card className="p-6">
        {hasData ? (
          <ReportTable
            data={reportData as QuickReportResponse}
            filters={filters}
            formattedMetrics={formattedMetrics}
            onExport={exportReport}
            isExporting={isExporting}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Quick Report</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Generate a report to view your affiliate metrics.
                </p>
              </div>
            </div>
            <EmptyState 
              type={isEmpty ? 'no-data' : 'no-report'} 
              filters={filters} 
            />
          </>
        )}
      </Card>
    </div>
  );
};

export default SummaryPage;