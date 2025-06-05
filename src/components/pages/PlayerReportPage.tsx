import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Select, Input } from '@/components/ui';
import { FILTER_CONFIGS, MOCK_PLAYER_REPORT_DATA } from '@/data/dummyData';
import { ColumnDef } from '@tanstack/react-table';

interface PlayerReportData {
  websiteId: string;
  website: string;
  playerId: string;
  registrationDate: string;
  country: string;
  sumOfAllDeposits: number;
  companyProfit: number;
}

const PlayerReportPage: React.FC = () => {
  const defaultFilters = FILTER_CONFIGS.player.reduce((acc, config) => {
    acc[config.name] = config.defaultValue || '';
    return acc;
  }, {} as Record<string, string | boolean>);

  const [reportData, setReportData] = useState<PlayerReportData[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  const updateFilter = (key: string, value: string | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReportData(MOCK_PLAYER_REPORT_DATA);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };
  const playerColumns:  ColumnDef<PlayerReportData>[] = [
    {
      accessorKey: 'websiteId',
      header: 'Website ID',
      cell: info => <span className="font-mono text-sm">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'website',
      header: 'Website',
      cell: info => (
        <a
          href={info.getValue() as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 truncate"
        >
          {info.getValue() as string}
        </a>
      )
    },
    {
      accessorKey: 'playerId',
      header: 'Player ID',
      cell: info => <span className="font-mono text-sm font-semibold">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'registrationDate',
      header: 'Registration Date',
      cell: info => new Date(info.getValue() as string).toLocaleDateString()
    },
    {
      accessorKey: 'country',
      header: 'Country',
      cell: info => (
        <div className="flex items-center space-x-2">
          <span className="text-lg">🌍</span>
          <span>{info.getValue() as string}</span>
        </div>
      )
    },
    {
      accessorKey: 'sumOfAllDeposits',
      header: 'Sum of All Deposits',
      cell: info => (
        <span className="font-semibold text-green-600">
          KES {(info.getValue() as number).toLocaleString()}
        </span>
      )
    },
    {
      accessorKey: 'companyProfit',
      header: 'Company Profit (Total)',
      cell: info => (
        <span className="font-semibold text-purple-600">
          KES {(info.getValue() as number).toLocaleString()}
        </span>
      )
    }
  ];
  

  return (
    <div className="space-y-6">
      <Card padding="md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {FILTER_CONFIGS.player.map(config => {
            const { type, label, name, options, placeholder } = config;
            if (type === 'select') {
              return (
                <Select
                  key={name}
                  label={label}
                  value={filters[name] as string}
                  onChange={(e) => updateFilter(name, e.target.value)}
                  options={options || []}
                  />
              );
            } else if (type === 'text') {
              return (
                <Input
                  key={name}
                  label={label}
                  type="text"
                  placeholder={placeholder}
                  value={filters[name] as string}
                  onChange={(e) => updateFilter(name, e.target.value)}
                />
              );
            } else if (type === 'checkbox') {
              return (
                <div key={name} className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    id={name}
                    checked={Boolean(filters[name])}
                    onChange={(e) => updateFilter(name, e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor={name} className="ml-2 text-sm text-gray-700">
                    {label}
                  </label>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <Button onClick={handleGenerateReport} icon="fas fa-chart-line" loading={loading} size="lg">
            GENERATE REPORT
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Player Report Data</h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">{reportData.length} items selected</div>
            <Button variant="secondary" icon="fas fa-download">EXPORT</Button>
          </div>
        </div>
        <div className="p-6">
          <DataTable
            data={reportData}
            columns={playerColumns}
            loading={loading}
            emptyMessage="No information available. Generate a report to see player data."
            
          />
        </div>
      </Card>
    </div>
  );
};

export default PlayerReportPage;
