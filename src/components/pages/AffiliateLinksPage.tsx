import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Input, Select } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { AffiliateLink, LinkGenerationForm } from '@/types/affiliate';
import { copyToClipboard, generateId } from '@/utils/helpers';
import { AFFILIATE_LINKS, WEBSITE_URLS, CURRENCIES, CAMPAIGNS } from '@/data/dummyData';

const AffiliateLinksPage: React.FC = () => {
  const [links, setLinks] = useState<AffiliateLink[]>(AFFILIATE_LINKS);
  const [formData, setFormData] = useState<LinkGenerationForm>({
    website: 'https://www.facebook.com/',
    currency: 'USD',
    campaign: 'World Wide',
    landingPage: '/live',
  });
  const [loading, setLoading] = useState(false);

  const linkColumns: ColumnDef<AffiliateLink>[] = [
    {
      accessorKey: 'id',
      header: 'NO.',
      size: 60,
      cell: ({ row }) => <span className="font-mono text-sm">{row.index + 1}</span>
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
      accessorKey: 'landingPage',
      header: 'LANDING PAGE',
      size: 100,
      cell: ({ getValue }) => (
        <span className="text-sm">{getValue() as string}</span>
      )
    },
    {
      accessorKey: 'campaign',
      header: 'CAMPAIGN',
      size: 120,
      cell: ({ getValue }) => (
        <span className="text-sm">{getValue() as string}</span>
      )
    },
    {
      accessorKey: 'generatedLink',
      header: 'GENERATED LINK',
      size: 200,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm truncate max-w-[120px]" title={getValue() as string}>
            {getValue() as string}
          </span>
          <div className="flex gap-1 flex-shrink-0">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0"
              onClick={() => copyToClipboard(getValue() as string)}
            >
              <Icon name="fas fa-copy" className="text-xs" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0"
              onClick={() => window.open(getValue() as string, '_blank')}
            >
              <Icon name="fas fa-external-link-alt" className="text-xs" />
            </Button>
          </div>
        </div>
      )
    },
    {
      accessorKey: 'currency',
      header: 'CURRENCY',
      size: 80,
      cell: ({ getValue }) => (
        <span className="text-sm font-medium">{getValue() as string}</span>
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
            variant="secondary" 
            className="text-xs px-2 py-1"
            onClick={() => handleToggleStatus(link.id)}
          >
            <Icon name={link.status === 'active' ? 'fas fa-eye-slash' : 'fas fa-eye'} className="mr-1 text-xs" />
            {link.status === 'active' ? 'HIDE' : 'SHOW'}
          </Button>
        );
      }
    }
  ];

  const handleGenerateLink = async () => {
    setLoading(true);
    try {
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
      setFormData({
        website: 'https://www.facebook.com/',
        currency: 'USD',
        campaign: 'World Wide',
        landingPage: '/live'
      });
    } catch (error) {
      console.error('Error generating link:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (linkId: string) => {
    setLinks(prev =>
      prev.map(link =>
        link.id === linkId
          ? { ...link, status: link.status === 'active' ? 'hidden' : 'active' }
          : link
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Affiliate Link</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select
              label="Website"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              options={WEBSITE_URLS.map(url => ({ value: url, label: url }))}
            />
            <Select
              label="Currency"
              value={formData.currency}
              onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
              options={CURRENCIES.map(currency => ({ value: currency, label: currency }))}
            />
            <Select
              label="Campaign"
              value={formData.campaign}
              onChange={(e) => setFormData(prev => ({ ...prev, campaign: e.target.value }))}
              options={CAMPAIGNS.map(campaign => ({ value: campaign, label: campaign }))}
            />
            <Input
              label="Landing page"
              value={formData.landingPage}
              onChange={(e) => setFormData(prev => ({ ...prev, landingPage: e.target.value }))}
              placeholder="/live"
            />
          </div>
          <div className="flex items-end">
            <Button 
              className="w-full" 
              icon="fas fa-link" 
              onClick={handleGenerateLink} 
              loading={loading}
            >
              GENERATE LINK
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden p-6 space-y-6">
        <div className="p-0">
          <DataTable
            data={links}
            columns={linkColumns}
            emptyMessage="No links found"
            enableSelection={true}
            tableClassName="min-w-full table-fixed"
            className="overflow-x-auto"
          />
        </div>
      </Card>
    </div>
  );
};

export default AffiliateLinksPage;