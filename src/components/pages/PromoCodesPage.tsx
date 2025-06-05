import React, { useState, useMemo } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { PromoCode, PromoCodeForm } from '@/types/promo';
import { copyToClipboard, generateId } from '@/utils/helpers';
import {
  PROMO_CODES,
  WEBSITE_URLS,
  CURRENCIES,
  CAMPAIGNS
} from '@/data/dummyData';

const INITIAL_FORM_DATA: PromoCodeForm = {
  website: 'https://www.facebook.com/',
  currency: 'USD',
  campaign: 'World Wide',
};

interface FormFieldConfig {
  key: keyof PromoCodeForm;
  label: string;
  type: 'select' | 'text';
  options?: string[];
  placeholder?: string;
}

const FORM_FIELDS: FormFieldConfig[] = [
  {
    key: 'website',
    label: 'Website',
    type: 'select',
    options: WEBSITE_URLS
  },
  {
    key: 'currency',
    label: 'Currency',
    type: 'select',
    options: CURRENCIES
  },
  {
    key: 'campaign',
    label: 'Campaign',
    type: 'select',
    options: CAMPAIGNS
  }
];

const PromoCodesPage: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(PROMO_CODES);

  const { values: formData, updateValue, reset } = useForm(INITIAL_FORM_DATA);

  const { execute: generatePromoCode, loading } = useAsyncAction(
    
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPromoCode: PromoCode = {
        id: generateId(),
        website: formData.website,
        currency: formData.currency,
        promoCode: `1x_${generateId()}`,
        btag: `d_${generateId()}m_1599c_${generateId()}`,
        campaign: formData.campaign,
        usage: 0,
        maxUsage: 1000,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      setPromoCodes(prev => [newPromoCode, ...prev]);
      reset();
      return newPromoCode;
    }
  );

  const renderFormField = (field: FormFieldConfig) => {
    const value = formData[field.key];

    if (field.type === 'select') {
      return (
        <Select
          key={field.key}
          label={field.label}
          value={value as string}
          onChange={(e) => updateValue(field.key, e.target.value)}
          options={field.options?.map(option => ({ value: option, label: option })) || []}
        />
      );
    }

    return (
      <Input
        key={field.key}
        label={field.label}
        type="text"
        value={value as string}
        onChange={(e) => updateValue(field.key, e.target.value)}
        placeholder={field.placeholder}
      />
    );
  };

  const promoColumns = useMemo<ColumnDef<PromoCode>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 80,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm text-gray-600">
          {getValue() as string}
        </span>
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
      accessorKey: 'currency',
      header: 'Currency',
      size: 100,
      cell: ({ getValue }) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'promoCode',
      header: 'Promo Code',
      size: 150,
      cell: ({ getValue }) => {
        const code = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-blue-600 text-sm">
              {code}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => copyToClipboard(code)}
              title="Copy promo code"
            >
              <Icon name="fas fa-copy" className="text-xs" />
            </Button>
          </div>
        );
      }
    },
    {
      accessorKey: 'btag',
      header: 'BTAG',
      size: 180,
      cell: ({ getValue }) => {
        const btag = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className="max-w-[120px] truncate font-mono text-sm" title={btag}>
              {btag}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={() => copyToClipboard(btag)}
              title="Copy BTAG"
            >
              <Icon name="fas fa-copy" className="text-xs" />
            </Button>
          </div>
        );
      }
    },
    {
      accessorKey: 'campaign',
      header: 'Campaign',
      size: 120,
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-700">
          {getValue() as string}
        </span>
      )
    }
  ], []);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Promo Code
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FORM_FIELDS.map(renderFormField)}
            </div>
          </div>

          <div className="md:col-span-2">
            <Button
              icon="fas fa-plus"
              onClick={generatePromoCode}
              loading={loading}
              disabled={loading}
              size="sm"
            >
              {loading ? 'GENERATING CODE...' : 'GENERATE PROMO CODE'}
            </Button>
          </div>
        </div>
      </Card>

      {/* 🎯 **Results Section** */}
      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Promo Codes
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {promoCodes.length} total codes
            </p>
          </div>
        </div>

        <div className="p-6">
          <DataTable
            data={promoCodes}
            columns={promoColumns}
            loading={false}
            emptyMessage="No promo codes found. Generate your first promo code above."
            emptyIcon="fas fa-ticket-alt"
            enableSorting={true}
            enableSelection={true}
            enableGlobalSearch={true}
            searchPlaceholder="Search by code, website, or campaign..."
            pageSize={10}
            showPagination={true}
            tableClassName="min-w-full"
            density="normal"
          />
        </div>
      </Card>
    </div>
  );
};

export default PromoCodesPage;