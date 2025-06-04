import React, { useState } from 'react';
import { FilterRow, TabNavigation } from '@/components/common';
import {  DataTable } from '@/components/common/Datatable';

import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { TableColumn } from '@/types/common';
import { PaymentRecord, PaymentRequest } from '@/types/payments';
import { formatCurrency, formatDate, getStatusColor } from '@/utils/helpers';
import { 
  PAYMENT_RECORDS, 
  FILTER_CONFIGS, 
  PAYMENT_METHODS, 
  CURRENCIES 
} from '@/data/dummyData';

interface PaymentsPageProps {
  darkMode: boolean;
}

const PaymentsPage: React.FC<PaymentsPageProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('request');
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>({
    amount: 0,
    currency: 'USD',
    method: 'Bank Transfer',
    notes: ''
  });

  const mockPayments: PaymentRecord[] = PAYMENT_RECORDS;
  const paymentFilters = FILTER_CONFIGS.payment;

  const paymentColumns: TableColumn<PaymentRecord>[] = [
    {
      key: 'id',
      header: 'Payment ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'currency',
      header: 'Currency',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'payout',
      header: 'Payout',
      sortable: true,
      render: (value, row) => (
        <span className="font-semibold text-green-600">
          {formatCurrency(value, row.currency)}
        </span>
      )
    },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      render: (value, row) => formatCurrency(value, row.currency)
    },
    {
      key: 'balance',
      header: 'Balance',
      sortable: true,
      render: (value, row) => formatCurrency(value, row.currency)
    },
    {
      key: 'method',
      header: 'Method',
      sortable: true
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          {row.transactionId && (
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(row.transactionId!)}
              title="Copy Transaction ID"
            >
              <Icon name="fas fa-copy" />
            </Button>
          )}
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => handleViewDetails(row)}
          >
            <Icon name="fas fa-eye" />
          </Button>
          {row.status === 'Failed' && (
            <Button 
              size="sm" 
              variant="secondary"
              onClick={() => handleRetryPayment(row)}
            >
              <Icon name="fas fa-redo" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const tabs = [
    { id: 'request', label: 'REQUEST PAYMENT', icon: 'fas fa-plus-circle' },
    { id: 'history', label: 'PAYMENT HISTORY', icon: 'fas fa-history', count: mockPayments.length }
  ];

  const handleViewDetails = (payment: PaymentRecord) => {
    console.log('View payment details:', payment);
    // Open modal or navigate to detail page
  };

  const handleRetryPayment = (payment: PaymentRecord) => {
    console.log('Retry payment:', payment);
    // Handle retry logic
  };

  const handleRequestPayment = () => {
    console.log('Request payment:', paymentRequest);
    // Handle payment request logic
  };

  const updatePaymentRequest = (key: keyof PaymentRequest, value: string | number) => {
    setPaymentRequest(prev => ({ ...prev, [key]: value }));
  };

  const getProcessingTime = (method: string) => {
    const paymentMethod = PAYMENT_METHODS.find(pm => pm.value === method);
    return paymentMethod?.processingTime || 'Unknown';
  };

  const PaymentRequestForm = () => (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
        Request Payment Withdrawal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Amount to Withdraw *"
          type="number"
          value={paymentRequest.amount.toString()}
          onChange={(e) => updatePaymentRequest('amount', parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          icon="fas fa-dollar-sign"
          darkMode={darkMode}
        />

        <Select
          label="Currency"
          value={paymentRequest.currency}
          onChange={(e) => updatePaymentRequest('currency', e.target.value)}
          options={CURRENCIES.map(currency => ({ 
            value: currency, 
            label: `${currency} - ${currency === 'USD' ? 'US Dollar' : currency === 'EUR' ? 'Euro' : currency === 'GBP' ? 'British Pound' : 'Bitcoin'}`
          }))}
          darkMode={darkMode}
        />

        <Select
          label="Payment Method *"
          value={paymentRequest.method}
          onChange={(e) => updatePaymentRequest('method', e.target.value)}
          options={PAYMENT_METHODS}
          darkMode={darkMode}
        />

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            Processing Time
          </label>
          <div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {getProcessingTime(paymentRequest.method)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Notes (Optional)
        </label>
        <textarea
          value={paymentRequest.notes}
          onChange={(e) => updatePaymentRequest('notes', e.target.value)}
          placeholder="Add any special instructions or notes..."
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
          }`}
        />
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="secondary">
          Cancel
        </Button>
        <Button 
          onClick={handleRequestPayment}
          disabled={paymentRequest.amount < 30}
          icon="fas fa-paper-plane"
        >
          Submit Request
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Icon name="fas fa-wallet" color="#16A34A" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                $1,247
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Available Balance
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon name="fas fa-chart-line" color="#2563EB" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                $2,494
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Earnings
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Icon name="fas fa-money-bill-wave" color="#9333EA" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                $1,250
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Withdrawn
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Icon name="fas fa-clock" color="#EA580C" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Pending Requests
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card darkMode={darkMode} className="overflow-hidden">
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          darkMode={darkMode} 
        />
        
        <div className="p-6">
          {activeTab === 'request' ? (
            <PaymentRequestForm />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <FilterRow 
                  filters={paymentFilters} 
                  darkMode={darkMode}
                  onApply={(filters) => console.log('Applied filters:', filters)}
                />
                
                <Button variant="secondary" icon="fas fa-download">
                  EXPORT
                </Button>
              </div>

              <DataTable
                data={mockPayments}
                columns={paymentColumns}
                darkMode={darkMode}
                emptyMessage="No payment history found"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Payment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card darkMode={darkMode} padding="md">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon name="fas fa-info-circle" color="#2563EB" size="xl" />
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Payment Information
              </h4>
              <ul className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
                <li>• Minimum withdrawal: $30 / €25 / £20</li>
                <li>• Processing time: 1-5 business days</li>
                <li>• No fees for standard withdrawals</li>
                <li>• Contact manager for payment setup</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Icon name="fas fa-headset" color="#16A34A" size="xl" />
            </div>
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Need Help?
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
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