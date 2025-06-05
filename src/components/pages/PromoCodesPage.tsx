import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { PromoCode, PromoCodeForm } from '@/types/promo';
import { copyToClipboard, generateId } from '@/utils/helpers';
import { 
  PROMO_CODES, 
  WEBSITE_URLS, 
  CURRENCIES, 
  CAMPAIGNS 
} from '@/data/dummyData';

const PromoCodesPage: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(PROMO_CODES);
  const [formData, setFormData] = useState<PromoCodeForm>({
    website: 'https://www.facebook.com/',
    currency: 'USD',
    campaign: 'World Wide',
    customCode: ''
  });
  const [loading, setLoading] = useState(false);

  const promoColumns: ColumnDef<PromoCode>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 80,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm">{getValue() as string}</span>
      )
    },
    {
      accessorKey: 'website',
      header: 'WEBSITE',
      size: 150,
      cell: ({ getValue }) => (
        <a 
          href={getValue() as string} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:text-blue-800 truncate block max-w-[140px]"
          title={getValue() as string}
        >
          {getValue() as string}
        </a>
      )
    },
    {
      accessorKey: 'currency',
      header: 'CURRENCY',
      size: 80,
      cell: ({ getValue }) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'promoCode',
      header: 'PROMO CODE',
      size: 150,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-blue-600 text-sm">
            {getValue() as string}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'btag',
      header: 'BTAG',
      size: 180,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <div className="max-w-[120px] truncate font-mono text-sm" title={getValue() as string}>
            {getValue() as string}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 w-6 p-0"
            onClick={() => copyToClipboard(getValue() as string)}
            title="Copy BTAG"
          >
            <Icon name="fas fa-copy" className="text-xs" />
          </Button>
        </div>
      ),
    }
  ];

  const handleGeneratePromoCode = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newPromoCode: PromoCode = {
        id: generateId(),
        website: formData.website,
        currency: formData.currency,
        promoCode: formData.customCode || `1x_${generateId()}`,
        btag: `d_${generateId()}m_1599c_${formData.customCode || generateId()}`,
        campaign: formData.campaign,
        usage: 0,
        maxUsage: 1000,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      setPromoCodes(prev => [newPromoCode, ...prev]);

      setFormData({
        website: 'https://www.facebook.com/',
        currency: 'USD',
        campaign: 'World Wide',
        customCode: ''
      });
    } catch (error) {
      console.error('Error generating promo code:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key: keyof PromoCodeForm, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Promo Code
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                label="Website"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                options={WEBSITE_URLS.map(url => ({ value: url, label: url }))}
              />
              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => updateFormData('currency', e.target.value)}
                options={CURRENCIES.map(currency => ({ value: currency, label: currency }))}
              />
              <Select
                label="Campaign"
                value={formData.campaign}
                onChange={(e) => updateFormData('campaign', e.target.value)}
                options={CAMPAIGNS.map(campaign => ({ value: campaign, label: campaign }))}
              />
              <Input
                label="Custom Code"
                type="text"
                value={formData.customCode}
                onChange={(e) => updateFormData('customCode', e.target.value)}
                placeholder="Optional custom code"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Button 
              // className="w-full" 
              icon="fas fa-plus"
              onClick={handleGeneratePromoCode}
              loading={loading}
              size='sm'
            >
              GENERATE PROMO CODE
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-6 space-y-6">
        
        <div className="flex justify-between items-center px-6 pt-6 pb-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Generated Promo Codes
          </h3>
          <div className="text-sm text-gray-500">
            {promoCodes.length} total codes
          </div>
        </div>

        <div className="p-0">
          <DataTable
            data={promoCodes}
            columns={promoColumns}
            emptyMessage="No promo codes found"
            enableSelection={true}
            tableClassName="min-w-full table-fixed"
            className="overflow-x-auto"
            density="compact"
          />
        </div>
      </Card>
    </div>
  );
};

export default PromoCodesPage;
