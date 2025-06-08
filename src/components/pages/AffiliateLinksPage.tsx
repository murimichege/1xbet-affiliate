import React, { useState, useMemo, useEffect } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { copyToClipboard } from '@/utils/helpers';
import { useCampaigns } from '@/hooks/useCampaign';
import affiliateService, { AffiliateLinkResponse } from '@/services/affiliateService';

// Form interface based on actual usage
interface LinkGenerationForm {
  domain: string;
  currency: string;
  campaign: string;
  landingPage: string;
}

// UI interface for table display
interface AffiliateLink {
  id: string;
  domain: string;
  landingPage: string;
  campaign: string;
  generatedLink: string;
  currency: string;
  createdAt: string;
}

const INITIAL_FORM_DATA: LinkGenerationForm = {
  domain: 'betkumi.co.ke',
  currency: 'KES',
  campaign: '',
  landingPage: '/sports/football',
};

// Available options
const DOMAIN_OPTIONS = [
  { value: 'betkumi.co.ke', label: 'betkumi.co.ke' },
  { value: 'betkumi.com', label: 'betkumi.com' }
];

const CURRENCY_OPTIONS = [
  { value: 'KES', label: 'KES' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' }
];

const LANDING_PAGE_OPTIONS = [
  { value: '/sports/football', label: '/sports/football' },
  { value: '/sports/basketball', label: '/sports/basketball' },
  { value: '/casino', label: '/casino' },
  { value: '/live-casino', label: '/live-casino' },
  { value: '/', label: '/ (Home)' }
];

const AffiliateLinksPage: React.FC = () => {
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [loading, setLoading] = useState(true);

  const { campaigns, loading: campaignsLoading } = useCampaigns();
  const { values: formData, updateValue, reset } = useForm(INITIAL_FORM_DATA);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, [campaigns]);

  const loadInitialData = async () => {
    if (campaignsLoading || !Array.isArray(campaigns) || campaigns.length === 0) return;
    
    try {
      setLoading(true);
      const linksData = await affiliateService.links.getAll().catch(() => []);
      
      // Ensure linksData is an array
      const linksArray = Array.isArray(linksData) ? linksData : [];
      
      // Transform API response to match UI expectations
      const transformedLinks = linksArray.map((link: AffiliateLinkResponse) => ({
        id: link.xid?.toString() || `link_${Date.now()}`,
        domain: link.domain,
        landingPage: link.landing_page,
        campaign: campaigns.find(c => c.xid === link.campaign_id)?.name || 'Unknown',
        generatedLink: `https://refpa3267686.top/L?tag=d_${link.xid}m_1599c_&site=${link.xid}&ad=1599`,
        currency: formData.currency,
        createdAt: link.created_at
      }));
      
      setLinks(transformedLinks);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setLinks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const { execute: generateLink, loading: generatingLink } = useAsyncAction(async () => {
    if (!formData.campaign) {
      throw new Error('Please select a campaign first');
    }

    // Ensure campaigns is an array
    const campaignsArray = Array.isArray(campaigns) ? campaigns : [];
    
    // Find campaign by xid
    const selectedCampaign = campaignsArray.find(c => 
      c.xid?.toString() === formData.campaign || c.name === formData.campaign
    );
    
    if (!selectedCampaign) {
      throw new Error('Selected campaign not found');
    }

    const linkRequest = {
      domain: formData.domain,
      landing_page: formData.landingPage,
      campaign_id: selectedCampaign.xid || 1
    };

    const newLinkResponse = await affiliateService.links.create(linkRequest);
    
    // Transform API response to UI format
    const newLink: AffiliateLink = {
      id: newLinkResponse.xid?.toString() || `link_${Date.now()}`,
      domain: newLinkResponse.domain,
      landingPage: newLinkResponse.landing_page,
      campaign: selectedCampaign.name,
      generatedLink: `https://refpa3267686.top/L?tag=d_${newLinkResponse.xid}m_1599c_&site=${newLinkResponse.xid}&ad=1599`,
      currency: formData.currency,
      createdAt: newLinkResponse.created_at
    };

    setLinks(prev => [newLink, ...prev]);
    reset();
    return newLink;
  });

  const linkColumns = useMemo<ColumnDef<AffiliateLink>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 60,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm text-gray-600">
          #{getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'domain',
      header: 'DOMAIN',
      size: 150,
      cell: ({ getValue }) => {
        const domain = getValue() as string;
        const fullUrl = `https://${domain}`;
        return (
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 truncate block max-w-[140px]"
            title={fullUrl}
          >
            {domain}
          </a>
        );
      }
    },
    {
      accessorKey: 'landingPage',
      header: 'LANDING PAGE',
      size: 150,
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
        <span className="text-sm text-gray-700 font-medium">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'generatedLink',
      header: 'GENERATED LINK',
      size: 250,
      cell: ({ getValue }) => {
        const link = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm truncate max-w-[180px]" title={link}>
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
      accessorKey: 'createdAt',
      header: 'CREATED',
      size: 120,
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <span className="text-sm text-gray-600">
            {date.toLocaleDateString()}
          </span>
        );
      }
    }
  ], []);

  if (loading || campaignsLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Affiliate Link
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
          <div className="md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                label="Domain"
                value={formData.domain}
                onChange={(e) => updateValue('domain', e.target.value)}
                options={DOMAIN_OPTIONS}
              />
              
              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => updateValue('currency', e.target.value)}
                options={CURRENCY_OPTIONS}
              />

              <Select
                label="Campaign"
                value={formData.campaign}
                onChange={(e) => updateValue('campaign', e.target.value)}
                options={Array.isArray(campaigns) ? campaigns.map(c => ({ 
                  value: c.xid?.toString() || c.name, 
                  label: c.name 
                })) : []}
              />

              <Select
                label="Landing Page"
                value={formData.landingPage}
                onChange={(e) => updateValue('landingPage', e.target.value)}
                options={LANDING_PAGE_OPTIONS}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <Button 
              icon="fas fa-link"
              onClick={generateLink}
              loading={generatingLink}
              disabled={generatingLink || !formData.campaign}
              size="md"
              className="w-full"
            >
              {generatingLink ? 'GENERATING...' : 'GENERATE LINK'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section */}
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
            searchPlaceholder="Search by domain, campaign, or landing page..."
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