import React, { useState, useMemo, useEffect } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { copyToClipboard } from '@/utils/helpers';
import { useCampaigns } from '@/hooks/useCampaign';
import { CampaignModal } from '@/components/ui/Modal';
import affiliateService, { AffiliateLinkResponse } from '@/services/affiliateService';

interface LinkGenerationForm {
  domain: string;
  currency: string;
  campaign: string;
  landingPage: string;
}

interface AffiliateLink {
  xid: number;
  userId: number;
  domain: string;
  landingPage: string;
  campaignId: number;
  campaignName: string;
  generatedLink: string;
  createdAt: string;
}

const INITIAL_FORM_DATA: LinkGenerationForm = {
  domain: 'betkumi.co.ke',
  currency: 'KES',
  campaign: '',
  landingPage: '/sports/football',
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { campaigns, loading: campaignsLoading, createCampaign } = useCampaigns();
  const { values: formData, updateValue, reset } = useForm(INITIAL_FORM_DATA);

  // Load initial data
  useEffect(() => {
    if (!campaignsLoading && Array.isArray(campaigns)) {
      loadInitialData();
    }
  }, [campaigns, campaignsLoading]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const linksData = await affiliateService.links.getAll().catch(() => []);
      
      const linksArray = Array.isArray(linksData) ? linksData : [];
      
      // Transform API response to match UI expectations
      const transformedLinks: AffiliateLink[] = linksArray.map((link: AffiliateLinkResponse) => ({
        xid: link.xid,
        userId: link.user_id,
        domain: link.domain,
        landingPage: link.landing_page,
        campaignId: link.campaign_id,
        campaignName: campaigns.find(c => c.xid === link.campaign_id)?.name || 'Unknown Campaign',
        generatedLink: `https://refpa3267686.top/L?tag=d_${link.xid}m_1599c_&site=${link.xid}&ad=1599`,
        createdAt: link.created_at
      }));
      
      setLinks(transformedLinks);
    } catch (error) {
      console.error('Error loading affiliate links:', error);
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  const { execute: generateLink, loading: generatingLink } = useAsyncAction(async () => {
    if (!formData.campaign) {
      throw new Error('Please select a campaign first');
    }

    const campaignsArray = Array.isArray(campaigns) ? campaigns : [];
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
    
    const newLink: AffiliateLink = {
      xid: newLinkResponse.xid,
      userId: newLinkResponse.user_id,
      domain: newLinkResponse.domain,
      landingPage: newLinkResponse.landing_page,
      campaignId: newLinkResponse.campaign_id,
      campaignName: selectedCampaign.name,
      generatedLink: `https://refpa3267686.top/L?tag=d_${newLinkResponse.xid}m_1599c_&site=${newLinkResponse.xid}&ad=1599`,
      createdAt: newLinkResponse.created_at
    };

    setLinks(prev => [newLink, ...prev]);
    reset();
    return newLink;
  });

  const handleCampaignCreated = (newCampaign: any) => {
    updateValue('campaign', newCampaign.xid?.toString() || newCampaign.name);
  };

  const linkColumns = useMemo<ColumnDef<AffiliateLink>[]>(() => [
    {
      accessorKey: 'xid',
      header: 'ID',
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm text-gray-600">
          #{getValue() as number}
        </span>
      )
    },
    {
      accessorKey: 'domain',
      header: 'DOMAIN',
      size: 150,
      minSize: 120,
      maxSize: 180,
      cell: ({ getValue }) => {
        const domain = getValue() as string;
        const fullUrl = `https://${domain}`;
        return (
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 block truncate"
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
      minSize: 120,
      maxSize: 180,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded block truncate">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'campaignName',
      header: 'CAMPAIGN',
      size: 120,
      minSize: 100,
      maxSize: 150,
      cell: ({ getValue }) => (
        <span className="text-sm text-gray-700 font-medium block truncate">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'generatedLink',
      header: 'GENERATED LINK',
      size: 300,
      minSize: 250,
      maxSize: 350,
      cell: ({ getValue }) => {
        const link = getValue() as string;
        return (
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-sm truncate flex-1 min-w-0" title={link}>
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
      accessorKey: 'createdAt',
      header: 'CREATED',
      size: 120,
      minSize: 100,
      maxSize: 140,
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <span className="text-sm text-gray-600 block">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 rounded flex-1"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full">
      {/* Form Section - Fixed Height */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Generate Affiliate Link
          </h3>
        </div>

        {/* Fixed Layout Structure */}
        <div className="space-y-4">
          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="min-w-0">
              <Select
                label="Domain"
                value={formData.domain}
                onChange={(e) => updateValue('domain', e.target.value)}
                options={DOMAIN_OPTIONS}
              />
            </div>
            
            <div className="min-w-0">
              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => updateValue('currency', e.target.value)}
                options={CURRENCY_OPTIONS}
              />
            </div>

            <div className="min-w-0">
              <Select
                label="Campaign"
                value={formData.campaign}
                onChange={(e) => updateValue('campaign', e.target.value)}
                options={Array.isArray(campaigns) ? campaigns.map(c => ({ 
                  value: c.xid?.toString() || c.name, 
                  label: c.name 
                })) : []}
              />
            </div>

            <div className="min-w-0">
              <Select
                label="Landing Page"
                value={formData.landingPage}
                onChange={(e) => updateValue('landingPage', e.target.value)}
                options={LANDING_PAGE_OPTIONS}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              icon="fas fa-link"
              onClick={generateLink}
              loading={generatingLink}
              disabled={generatingLink || !formData.campaign}
              size="md"
              className="flex-1 sm:flex-none sm:min-w-[200px]"
            >
              {generatingLink ? 'GENERATING...' : 'GENERATE LINK'}
            </Button>
            <Button 
              variant="secondary" 
              icon="fas fa-bullhorn" 
              size="md" 
              onClick={() => setIsModalOpen(true)}
              className="sm:min-w-[150px]"
            >
              New Campaign
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section - Fixed Structure */}
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
          <div className="min-w-0">
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
              tableClassName="w-full table-fixed"
              density="normal"
            />
          </div>
        </div>
      </Card>

      {/* Campaign Creation Modal */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCampaignCreated={handleCampaignCreated}
        createCampaign={createCampaign}
      />
    </div>
  );
};

export default AffiliateLinksPage;