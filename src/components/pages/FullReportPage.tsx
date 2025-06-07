import React, { useMemo } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button } from '@/components/ui';
import { CurrencyCell } from '@/components/ui/CurrencyCell';
import { ReportFilters, FilterField } from '@/components/common/ReportFilters';
import { ColumnDef } from '@tanstack/react-table';
import { useFilters } from '@/hooks/useFilters';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { useReportData, ReportData, ReportFilters as ReportFiltersType } from '@/hooks/useReportData';
import { exportToCSV } from '@/utils/csvExport';

import {
  CURRENCIES,
  WEBSITE_URLS,
  TIME_INTERVALS,
  REGISTRATION_SOURCES
} from '@/data/dummyData';

const INITIAL_FILTERS: ReportFiltersType = {
  currency: 'USD',
  website: 'All',
  marketingToolId: '',
  timeInterval: 'Exact period',
  dateFrom: '2025-06-04',
  dateTo: '2025-06-04',
  registrationSource: 'Select...'
};

const FILTER_FIELDS: FilterField[] = [
  {
    key: 'currency',
    label: 'Currency',
    type: 'select',
    options: CURRENCIES
  },
  {
    key: 'website',
    label: 'Website',
    type: 'select',
    options: ['All', ...WEBSITE_URLS]
  },
  {
    key: 'marketingToolId',
    label: 'Marketing tool ID',
    type: 'text',
    placeholder: 'Enter tool ID'
  },
  {
    key: 'timeInterval',
    label: 'Time interval',
    type: 'select',
    options: TIME_INTERVALS
  },
  {
    key: 'dateFrom',
    label: 'Date Range',
    type: 'date'
  },
  {
    key: 'dateTo',
    label: '',
    type: 'date'
  },
  {
    key: 'registrationSource',
    label: 'Registration Source',
    type: 'select',
    options: REGISTRATION_SOURCES
  }
];

const FullReportPage: React.FC = () => {
  const { reportData, setReportData, generateMockReportData } = useReportData();
  
  const {
    filters,
    updateFilter,
    applyFilters,
    resetFilters,
    isApplying
  } = useFilters(INITIAL_FILTERS, {
    onApply: async (filters) => {
      const data = await generateMockReportData(filters);
      setReportData(data);
    },
    onReset: () => setReportData([])
  });

  const { execute: handleExport, loading: isExporting } = useAsyncAction(
    async () => {
      if (!reportData.length) return;
  
      const rows = reportData.map(row => ({
        'Website ID': row.websiteId,
        'Website': row.website,
        'Registrations': row.registrations,
        'New Depositors': row.newDepositors,
        'Total Deposit Amount': row.totalDepositAmount,
        'Bonus Amount': row.bonusAmount,
        'Company Profit': row.companyProfit,
        'Commission Amount': row.commissionAmount
      }));
  
      exportToCSV(rows, `full-report-${new Date().toISOString().split('T')[0]}`);
    },
    {
      onSuccess: () => console.log('Export completed successfully'),
      onError: (error) => console.error('Export failed:', error)
    }
  );
  

  const reportColumns = useMemo<ColumnDef<ReportData>[]>(() => [
    {
      accessorKey: 'websiteId',
      header: 'Website ID',
      size: 120,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm">{getValue() as string}</span>
      )
    },
    {
      accessorKey: 'website',
      header: 'Website',
      size: 200,
      cell: ({ getValue }) => {
        const url = getValue() as string;
        return (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 truncate block max-w-[180px]"
            title={url}
          >
            {url}
          </a>
        );
      }
    },
    {
      accessorKey: 'registrations',
      header: 'Registrations',
      size: 120,
      cell: ({ getValue }) => (
        <span className="font-semibold">{(getValue() as number).toLocaleString()}</span>
      )
    },
    {
      accessorKey: 'newDepositors',
      header: 'New depositors',
      size: 140,
      cell: ({ getValue }) => (
        <span className="font-semibold text-green-600">
          {(getValue() as number).toLocaleString()}
        </span>
      )
    },
    {
      accessorKey: 'totalDepositAmount',
      header: 'Total deposit amount',
      size: 180,
      cell: ({ row }) => (
        <CurrencyCell 
          amount={row.original.totalDepositAmount}
          currency={filters.currency}
          colorClass="text-blue-600"
        />
      )
    },
    {
      accessorKey: 'bonusAmount',
      header: 'Bonus amount',
      size: 150,
      cell: ({ row }) => (
        <CurrencyCell 
          amount={row.original.bonusAmount}
          currency={filters.currency}
          colorClass="text-orange-600"
        />
      )
    },
    {
      accessorKey: 'companyProfit',
      header: 'Company profit (total)',
      size: 180,
      cell: ({ row }) => (
        <CurrencyCell 
          amount={row.original.companyProfit}
          currency={filters.currency}
          colorClass="text-purple-600"
        />
      )
    },
    {
      accessorKey: 'commissionAmount',
      header: 'Commission amount',
      size: 170,
      cell: ({ row }) => (
        <CurrencyCell 
          amount={row.original.commissionAmount}
          currency={filters.currency}
          colorClass="text-blue-600"
        />
      )
    }
  ], [filters.currency]); 

  return (
    <div className="space-y-6">
      <ReportFilters
        filters={filters}
        onFilterChange={updateFilter}
        onApply={applyFilters}
        onReset={resetFilters}
        fields={FILTER_FIELDS}
        isLoading={isApplying}
        title="Generate Full Report"
      />

      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Full Report Data</h3>
            <p className="text-sm text-gray-500 mt-1">
              {reportData.length} record{reportData.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {reportData.length > 0 && (
              <>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
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
            data={reportData}
            columns={reportColumns}
            loading={isApplying}
            emptyMessage="No information available. Generate a report to see data."
            emptyIcon="fas fa-chart-line"
            enableSorting={true}
            enableGlobalSearch={true}
            searchPlaceholder="Search report data..."
            pageSize={10}
            showPagination={reportData.length > 10}
            tableClassName="min-w-full"
            density="normal"
          />
        </div>
      </Card>
    </div>
  );
};

export default FullReportPage;