import React, { useState, useMemo, useEffect } from 'react';
import { Card, Button, Icon } from '@/components/ui';
import { SummaryReportFilters, FilterField } from '@/components/filters/FilterOptions';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { exportToCSV } from '@/utils/csvExport';
import affiliateService from '@/services/affiliateService';
import { QuickReportResponse, AffiliateLinkResponse, PromoCodeResponse } from '@/types/affiliate';

interface ReportFilters {
  links: string[];
  promos: string[];
  start: string;
  end: string;
}

const INITIAL_FILTERS: ReportFilters = {
  links: [],
  promos: [],
  start: new Date().toISOString().split('T')[0],
  end: new Date().toISOString().split('T')[0]
};

interface MetricDefinition {
  key: keyof QuickReportResponse;
  label: string;
  type: 'number' | 'currency';
}

const METRICS: MetricDefinition[] = [
  { key: 'new_account_count', label: 'New Accounts', type: 'number' },
  { key: 'new_account_with_deposit_count', label: 'New Accounts with Deposits', type: 'number' },
  { key: 'new_deposit_count', label: 'New Deposit Count', type: 'number' },
  { key: 'new_deposit_sum', label: 'New Deposit Sum', type: 'currency' },
  { key: 'new_deposit_account_count', label: 'New Deposit Account Count', type: 'number' },
  { key: 'deposit_sum', label: 'Total Deposit Sum', type: 'currency' },
  { key: 'deposit_count', label: 'Total Deposit Count', type: 'number' },
  { key: 'deposit_account_count', label: 'Deposit Account Count', type: 'number' },
  { key: 'active_account_count', label: 'Active Accounts', type: 'number' },
  { key: 'commission', label: 'Commission', type: 'currency' }
];

const SummaryPage: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilters>(INITIAL_FILTERS);
  const [reportData, setReportData] = useState<QuickReportResponse | null | 'empty'>(null);
  const [availableLinks, setAvailableLinks] = useState<AffiliateLinkResponse[]>([]);
  const [availablePromos, setAvailablePromos] = useState<PromoCodeResponse[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoadingOptions(true);
        const [links, promos] = await Promise.all([
          affiliateService.links.getAll().catch(() => []),
          affiliateService.promoCodes.getAll().catch(() => [])
        ]);
        setAvailableLinks(Array.isArray(links) ? links : []);
        setAvailablePromos(Array.isArray(promos) ? promos : []);
      } catch (err) {
        console.error('Error loading filter options:', err);
      } finally {
        setLoadingOptions(false);
      }
    };
    loadOptions();
  }, []);

  // Generate options for dropdowns
  const linkOptions = useMemo(() => 
    availableLinks.map(link => `${link.xid}:${link.url || `${link.domain}${link.landing_page}`}`)
  , [availableLinks]);

  const promoOptions = useMemo(() => 
    availablePromos.map(promo => `${promo.xid}:${promo.code}`)
  , [availablePromos]);

  // Filter field definitions
  const filterFields: FilterField[] = useMemo(() => [
    {
      key: 'links',
      label: 'Filter by Links (Optional)',
      type: 'multiselect',
      options: linkOptions,
      placeholder: 'Select affiliate links...'
    },
    {
      key: 'promos',
      label: 'Filter by Promo Codes (Optional)',
      type: 'multiselect',
      options: promoOptions,
      placeholder: 'Select promo codes...'
    },
    { key: 'start', label: 'Start Date', type: 'date' },
    { key: 'end', label: 'End Date', type: 'date' }
  ], [linkOptions, promoOptions]);

  // Convert selected string values back to numbers for API
  const parseSelectedIds = (selectedValues: string[]): number[] => {
    return selectedValues
      .map(value => {
        // Handle "xid:label" format - extract just the xid part
        const id = value.includes(':') ? value.split(':')[0] : value;
        return parseInt(id, 10);
      })
      .filter(id => !isNaN(id));
  };

  const { execute: generateReport, loading: isGenerating } = useAsyncAction(
    async () => {
      const linkIds = parseSelectedIds(filters.links);
      const promoIds = parseSelectedIds(filters.promos);
      
      const response = await affiliateService.reports.getQuickReport({
        links: linkIds.length > 0 ? linkIds : undefined,
        promos: promoIds.length > 0 ? promoIds : undefined,
        start: filters.start,
        end: filters.end
      });

      // Handle different response scenarios
      if (!Array.isArray(response)) {
        setReportData(null);
        return;
      }

      if (response.length === 0) {
        // Empty array - set a special state to differentiate from null
        setReportData('empty');
        return;
      }

      setReportData(response[0]);
    },
    {
      onSuccess: () => console.log('Report generated successfully'),
      onError: (err) => {
        console.error('Report generation failed:', err);
        setReportData(null);
      }
    }
  );

  const { execute: handleExport, loading: isExporting } = useAsyncAction(
    async () => {
      if (!reportData || reportData === 'empty') return;

      const validReportData = reportData as QuickReportResponse;
      const rows = METRICS.map(({ key, label, type }) => ({
        Metric: label,
        Value: formatValue(validReportData[key], type, validReportData.currency)
      }));

      exportToCSV(rows, `quick-report-${filters.start}-to-${filters.end}`);
    },
    {
      onSuccess: () => console.log('Export successful'),
      onError: err => console.error('Export failed:', err)
    }
  );

  const formatValue = (val: number | string, type: 'number' | 'currency', currency: string): string => {
    if (typeof val !== 'number') return '-';
    
    if (type === 'currency') {
      return `${currency} ${val.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    }
    
    return val.toLocaleString();
  };

  const formattedMetrics = useMemo(() => {
    if (!reportData || reportData === 'empty') return [];
    
    return METRICS.map(({ key, label, type }) => ({
      key: key as string,
      label,
      formattedValue: formatValue((reportData as QuickReportResponse)[key], type, (reportData as QuickReportResponse).currency)
    }));
  }, [reportData]);

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setReportData(null);
  };

  const updateFilter = (key: keyof ReportFilters, value: ReportFilters[keyof ReportFilters]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Quick Report</h3>
            <p className="text-sm text-gray-500 mt-1">
              {reportData && reportData !== 'empty'
                ? `Report from ${filters.start} to ${filters.end} • Currency: ${(reportData as QuickReportResponse).currency}`
                : 'Generate a report to view your affiliate metrics.'}
            </p>
          </div>
          {reportData && reportData !== 'empty' && (
            <Button
              variant="secondary"
              icon="fas fa-download"
              onClick={handleExport}
              loading={isExporting}
              disabled={isExporting}
            >
              {isExporting ? 'EXPORTING...' : 'EXPORT CSV'}
            </Button>
          )}
        </div>

        {reportData && reportData !== 'empty' ? (
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
                {formattedMetrics.map(({ key, label, formattedValue }, idx) => (
                  <tr 
                    key={key} 
                    className={`hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                    }`}
                  >
                    <td className="text-sm font-medium text-gray-700 px-6 py-4">
                      {label}
                    </td>
                    <td className="text-sm font-semibold text-gray-900 px-6 py-4 text-right">
                      {formattedValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : reportData === 'empty' ? (
          <div className="text-center py-16 text-gray-500">
            <Icon name="fas fa-search" className="text-gray-400 mx-auto text-4xl mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Data Found</h4>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
              No data was found for the selected filters and date range ({filters.start} to {filters.end}).
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
        ) : (
          <div className="text-center py-16 text-gray-500">
            <Icon name="fas fa-chart-bar" className="text-gray-400 mx-auto text-4xl mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Report Generated</h4>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Set a date range and optional filters above, then click "Generate Report" to view your affiliate performance metrics.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SummaryPage;