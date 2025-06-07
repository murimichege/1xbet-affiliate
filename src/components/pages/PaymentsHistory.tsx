import React from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon } from '@/components/ui';
import { PaymentRecord } from '@/types/payments';
import { formatCurrency, formatDate, getStatusColor } from '@/utils/helpers';
import { PAYMENT_RECORDS } from '@/data/dummyData';
import { ColumnDef } from '@tanstack/react-table';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { exportToCSV } from '@/utils/csvExport';

const PaymentsPage: React.FC = () => {
  const paymentColumns: ColumnDef<PaymentRecord>[] = [
    {
      accessorKey: 'currency',
      header: 'Currency',
      cell: info => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
          {info.getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: info => formatDate(info.getValue() as string)
    },
   
    {
      accessorKey: 'payout',
      header: 'Payout',
      cell: ({ row }) => (
        <span className="font-semibold text-green-600">
          {formatCurrency(row.original.payout, row.original.currency)}
        </span>
      )
    },
    {
      accessorKey: 'revenue',
      header: 'Revenue',
      cell: ({ row }) => formatCurrency(row.original.revenue, row.original.currency)
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => formatCurrency(row.original.balance, row.original.currency)
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(info.getValue() as string)}`}>
          {info.getValue() as string}
        </span>
      )
    }
  ];
  const { execute: handleExport, loading: isExporting } = useAsyncAction(
    async () => {
      if (!PAYMENT_RECORDS.length) return;
  
      const rows = PAYMENT_RECORDS.map((record) => ({
        'Payout': record.payout,
        'Revenue': record.revenue,
        'Balance': record.balance,
        'Currency': record.currency,
        'Transaction ID': record.transactionId,
        'Date': record.date,
        'Status': record.status
      }));
  
      exportToCSV(rows, `payment-history-${new Date().toISOString().split('T')[0]}`);
    },
    {
      onSuccess: () => console.log('Payment history exported'),
      onError: (err) => console.error('Export failed:', err)
    }
  );
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
            <Button
  icon="fas fa-download"
  variant="secondary"
  onClick={handleExport}
  loading={isExporting}
  disabled={isExporting}
>
  {isExporting ? 'EXPORTING...' : 'EXPORT'}
</Button>

          </div>

          <DataTable
            data={PAYMENT_RECORDS}
            columns={paymentColumns}
            emptyMessage="No payment history found"
            enableSelection={false}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon name="fas fa-info-circle" color="#2563EB" size="xl" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Information</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Minimum withdrawal: $30 / €25 / £20</li>
                <li>• Processing time: 1-5 business days</li>
                <li>• No fees for standard withdrawals</li>
                <li>• Contact manager for payment setup</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Icon name="fas fa-headset" color="#16A34A" size="xl" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-700 mb-3">
                Contact our managers using their{' '}
                <a href="#" className="text-blue-600 hover:underline">contact details</a>,
                available on the Affiliate Program website.
              </p>
              <Button size="sm" variant="secondary" icon="fas fa-envelope">
                Contact Support
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentsPage;
