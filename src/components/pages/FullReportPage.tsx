import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
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

const FullReportPage: React.FC = () => {
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

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReportData([
        {
          websiteId: '4429642',
          website: 'https://mysite.com',
          registrations: 120,
          newDepositors: 45,
          totalDepositAmount: 56000,
          bonusAmount: 8000,
          companyProfit: 15000,
          commissionAmount: 5000
        },
        {
          websiteId: '4429643',
          website: 'https://sportsnews.com',
          registrations: 98,
          newDepositors: 30,
          totalDepositAmount: 42000,
          bonusAmount: 6000,
          companyProfit: 11000,
          commissionAmount: 3000
        }
      ]);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const reportColumns: ColumnDef<FullReportData>[] = [
    {
      accessorKey: 'websiteId',
      header: 'Website ID',
      cell: info => <span className="font-mono text-sm">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'website',
      header: 'Website',
      cell: info => {
        const url = info.getValue() as string;
        return (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 truncate">
            {url}
          </a>
        );
      }
      
    },
    {
      accessorKey: 'registrations',
      header: 'Registrations',
      cell: info => <span className="font-semibold">{(info.getValue() as number).toLocaleString()}</span>
    },
    {
      accessorKey: 'newDepositors',
      header: 'New depositors',
      cell: info => <span className="font-semibold text-green-600">{(info.getValue() as number).toLocaleString()}</span>
    },
    {
      accessorKey: 'totalDepositAmount',
      header: 'Total deposit amount',
      cell: ({ row }) => (
        <span className="font-semibold">
          {filters.currency} {(row.original.totalDepositAmount).toLocaleString()}
        </span>
      )
    },
    {
      accessorKey: 'bonusAmount',
      header: 'Bonus amount',
      cell: ({ row }) => (
        <span className="font-semibold text-orange-600">
          {filters.currency} {(row.original.bonusAmount).toLocaleString()}
        </span>
      )
    },
    {
      accessorKey: 'companyProfit',
      header: 'Company profit (total)',
      cell: ({ row }) => (
        <span className="font-semibold text-purple-600">
          {filters.currency} {(row.original.companyProfit).toLocaleString()}
        </span>
      )
    },
    {
      accessorKey: 'commissionAmount',
      header: 'Commission amount',
      cell: ({ row }) => (
        <span className="font-semibold text-blue-600">
          {filters.currency} {(row.original.commissionAmount).toLocaleString()}
        </span>
      )
    }
  ];
  

  return (
    <div className="space-y-6">
      <Card padding="md">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select label="Currency" value={filters.currency} onChange={(e) => updateFilter('currency', e.target.value)} options={CURRENCIES} />
              <Select label="Website" value={filters.website} onChange={(e) => updateFilter('website', e.target.value)} options={['All', ...WEBSITE_URLS]} />
              <Input label="Marketing tool ID" value={filters.marketingToolId} onChange={(e) => updateFilter('marketingToolId', e.target.value)} />
              <Select label="Time interval" value={filters.timeInterval} onChange={(e) => updateFilter('timeInterval', e.target.value)} options={TIME_INTERVALS} />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="space-y-2">
              <Input label="Date Range" type="date" value={filters.dateFrom} onChange={(e) => updateFilter('dateFrom', e.target.value)} />
              <div className="text-center"><Icon name="fas fa-arrow-down" className="text-gray-400" size="xs" /></div>
              <Input type="date" value={filters.dateTo} onChange={(e) => updateFilter('dateTo', e.target.value)} />
            </div>
          </div>

          <div className="md:col-span-1">
            <Select label="Registration Source" value={filters.registrationSource} onChange={(e) => updateFilter('registrationSource', e.target.value)} options={REGISTRATION_SOURCES} />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button onClick={handleGenerateReport} icon="fas fa-chart-line" loading={loading} size="lg">
            GENERATE REPORT
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Full Report Data</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">{reportData.length} items selected</div>
            <Button variant="secondary" icon="fas fa-download">EXPORT</Button>
          </div>
        </div>

        <div className="p-6">
          <DataTable
            data={reportData}
            columns={reportColumns}
            loading={loading}
            emptyMessage="No information available. Generate a report to see data."
            
          />
        </div>
      </Card>
    </div>
  );
};

export default FullReportPage;
