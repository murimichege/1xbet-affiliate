import React, { useState, useMemo } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Input, Select } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { AffiliateLink, LinkGenerationForm } from '@/types/affiliate';
import { copyToClipboard, generateId } from '@/utils/helpers';
import { AFFILIATE_LINKS, WEBSITE_URLS, CURRENCIES, CAMPAIGNS } from '@/data/dummyData';

const INITIAL_FORM_DATA: LinkGenerationForm = {
  website: 'https://www.facebook.com/',
  currency: 'USD',
  campaign: 'World Wide',
  landingPage: '/live',
};

interface FormFieldConfig {
  key: keyof LinkGenerationForm;
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
  },
  {
    key: 'landingPage',
    label: 'Landing page',
    type: 'text',
    placeholder: '/live'
  }
];

const AffiliateLinksPage: React.FC = () => {
  const [links, setLinks] = useState<AffiliateLink[]>(AFFILIATE_LINKS);

  // 🎯 **DRY Form Management**
  const { values: formData, updateValue, reset } = useForm(INITIAL_FORM_DATA);

  // 🎯 **DRY Async Action**
  const { execute: generateLink, loading } = useAsyncAction(
    async () => {
      // 🔄 Simulate API call with 1000ms delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLink: AffiliateLink = {
        id: generateId(),
        website: formData.website,
        landingPage: formData.landingPage,
        campaign: formData.campaign,
        generatedLink: `https://refpa3267686.top/L?tag=d_${generateId()}m_1599c_&site=${generateId()}&ad=1599`,
        currency: formData.currency,
        status: 'active',
        clicks: 0,
        conversions: 0,
        createdAt: new Date().toISOString()
      };

      setLinks(prev => [newLink, ...prev]);
      reset();
      return newLink;
    }
  );

  // 🎯 **Reusable Field Renderer - DRY Principle**
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

  // 🎯 **Status Toggle Handler**
  const handleToggleStatus = (linkId: string) => {
    setLinks(prev =>
      prev.map(link =>
        link.id === linkId
          ? { ...link, status: link.status === 'active' ? 'hidden' : 'active' }
          : link
      )
    );
  };

  // 🎯 **Memoized Columns** - Performance optimized
  const linkColumns = useMemo<ColumnDef<AffiliateLink>[]>(() => [
    {
      accessorKey: 'id',
      header: 'NO.',
      size: 60,
      cell: ({ row }) => (
        <span className="font-mono text-sm text-gray-600">
          {row.index + 1}
        </span>
      )
    },
    {
      accessorKey: 'website',
      header: 'WEBSITE',
      size: 150,
      cell: ({ getValue }) => {
        const url = getValue() as string;
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 truncate block max-w-[140px]"
            title={url}
          >
            {url}
          </a>
        );
      }
    },
    {
      accessorKey: 'landingPage',
      header: 'LANDING PAGE',
      size: 100,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'campaign',
      header: 'CAMPAIGN',
      size: 120,
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-700">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'generatedLink',
      header: 'GENERATED LINK',
      size: 200,
      cell: ({ getValue }) => {
        const link = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm truncate max-w-[120px]" title={link}>
              {link}
            </span>
            <div className="flex gap-1 flex-shrink-0">
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-6 w-6 p-0"
                onClick={() => copyToClipboard(link)}
                title="Copy link"
              >
                <Icon name="fas fa-copy" className="text-xs" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-6 w-6 p-0"
                onClick={() => window.open(link, '_blank')}
                title="Open link"
              >
                <Icon name="fas fa-external-link-alt" className="text-xs" />
              </Button>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'currency',
      header: 'CURRENCY',
      size: 80,
      cell: ({ getValue }) => (
        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      size: 100,
      cell: ({ row }) => {
        const link = row.original;
        return (
          <Button 
            size="sm" 
            variant={link.status === 'active' ? 'primary' : 'ghost'}
            className="text-xs px-2 py-1"
            onClick={() => handleToggleStatus(link.id)}
            title={`${link.status === 'active' ? 'Hide' : 'Show'} link`}
          >
            <Icon 
              name={link.status === 'active' ? 'fas fa-eye-slash' : 'fas fa-eye'} 
              className="mr-1 text-xs" 
            />
            {link.status === 'active' ? 'HIDE' : 'SHOW'}
          </Button>
        );
      }
    }
  ], []);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Affiliate Link
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {FORM_FIELDS.map(renderFormField)}
            </div>
          </div>

          <div className="md:col-span-2">
            <Button 
              icon="fas fa-link"
              onClick={generateLink}
              loading={loading}
              disabled={loading}
              size="md"
            >
              {loading ? 'GENERATING Link...' : 'GENERATE LINK'}
            </Button>
          </div>
        </div>
      </Card>

      {/* 🎯 **Results Section** */}
      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Affiliate Links
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {links.length} total links
            </p>
          </div>
        </div>

        <div className="p-6">
          <DataTable
            data={links}
            columns={linkColumns}
            loading={false}
            emptyMessage="No affiliate links found. Generate your first link above."
            emptyIcon="fas fa-link"
            enableSorting={true}
            enableSelection={true}
            enableGlobalSearch={true}
            searchPlaceholder="Search by website, campaign, or status..."
            pageSize={10}
            showPagination={links.length > 10}
            tableClassName="min-w-full"
            density="normal"
          />
        </div>
      </Card>
    </div>
  );
};

export default AffiliateLinksPage;