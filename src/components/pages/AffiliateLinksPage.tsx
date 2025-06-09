import React, { useState, useMemo, useEffect } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { copyToClipboard } from '@/utils/helpers';
import { useCampaigns } from '@/hooks/useCampaign';
import { CampaignModal } from '@/components/ui/Modal';
import affiliateService, { AffiliateLinkResponse } from '@/services/affiliateService';

interface LinkGenerationForm {
  domain: string;
  landingPage: string;
  campaign: string;
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

interface ProfileDomain {
  domain: string;
  country: string;
}

interface UserProfile {
  user_id: number;
  currency: string;
  fixed_pay: number;
  rev_share: number;
  created_at: string;
  username: string;
  domains: ProfileDomain[];
  country: string;
  is_manager: boolean;
}

const INITIAL_FORM_DATA: LinkGenerationForm = {
  domain: '',
  landingPage: '',
  campaign: '',
};

const AffiliateLinksPage: React.FC = () => {
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [customLandingPages, setCustomLandingPages] = useState<string[]>([]);

  const { campaigns, loading: campaignsLoading, createCampaign } = useCampaigns();
  const { values: formData, updateValue, reset } = useForm(INITIAL_FORM_DATA);

  // Load user profile
  useEffect(() => {
    loadUserProfile();
  }, []);

  // Load initial data when profile and campaigns are ready
  useEffect(() => {
    if (!campaignsLoading && !profileLoading && Array.isArray(campaigns) && userProfile) {
      loadInitialData();
      // Set default domain if available
      if (userProfile.domains.length > 0 && !formData.domain) {
        updateValue('domain', userProfile.domains[0].domain);
      }
    }
  }, [campaigns, campaignsLoading, userProfile, profileLoading]);

  const loadUserProfile = async () => {
    try {
      setProfileLoading(true);
      const profile = await affiliateService.profile.get();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUserProfile(null);
    } finally {
      setProfileLoading(false);
    }
  };

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const linksData = await affiliateService.links.getAll().catch(() => []);
      
      const linksArray = Array.isArray(linksData) ? linksData : [];
      
      // Extract unique landing pages from existing links
      const existingLandingPages = [...new Set(
        linksArray.map((link: AffiliateLinkResponse) => link.landing_page)
      )].filter(Boolean);
      
      setCustomLandingPages(existingLandingPages);
      
      // Transform API response to match UI expectations
      const transformedLinks: AffiliateLink[] = linksArray.map((link: AffiliateLinkResponse) => ({
        xid: link.xid,
        userId: link.user_id,
        domain: link.domain,
        landingPage: link.landing_page,
        campaignId: link.campaign_id,
        campaignName: campaigns.find(c => c.xid === link.campaign_id)?.name || 'Unknown Campaign',
        generatedLink: link.url || `https://refpa3267686.top/L?tag=d_${link.xid}m_1599c_&site=${link.xid}&ad=1599`,
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

  // Combined landing page options (only from existing links + current input)
  const landingPageOptions = useMemo(() => {
    const allPages = [...customLandingPages];
    
    // Add current input if it's not in the list and not empty
    if (formData.landingPage && !allPages.includes(formData.landingPage)) {
      allPages.push(formData.landingPage);
    }
    
    return [...new Set(allPages)].map(page => ({
      value: page,
      label: page === '/' ? '/ (Home)' : page
    }));
  }, [customLandingPages, formData.landingPage]);

  // Normalize landing page input (ensure it starts with /)
  const normalizeLandingPage = (input: string): string => {
    if (!input) return '';
    const trimmed = input.trim();
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  };

  const handleLandingPageChange = (value: string) => {
    const normalized = normalizeLandingPage(value);
    updateValue('landingPage', normalized);
  };

  const handleLandingPageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateValue('landingPage', value);
  };

  const { execute: generateLink, loading: generatingLink } = useAsyncAction(async () => {
    if (!formData.campaign) {
      throw new Error('Please select a campaign first');
    }

    if (!formData.domain) {
      throw new Error('Please select a domain first');
    }

    if (!formData.landingPage.trim()) {
      throw new Error('Please enter a landing page');
    }

    const campaignsArray = Array.isArray(campaigns) ? campaigns : [];
    const selectedCampaign = campaignsArray.find(c => 
      c.xid?.toString() === formData.campaign || c.name === formData.campaign
    );
    
    if (!selectedCampaign) {
      throw new Error('Selected campaign not found');
    }

    const finalLandingPage = normalizeLandingPage(formData.landingPage);

    const linkRequest = {
      domain: formData.domain,
      landing_page: finalLandingPage,
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
      generatedLink: newLinkResponse.url || `https://refpa3267686.top/L?tag=d_${newLinkResponse.xid}m_1599c_&site=${newLinkResponse.xid}&ad=1599`,
      createdAt: newLinkResponse.created_at
    };

    // Add new landing page to custom list if it's not already there
    if (!customLandingPages.includes(finalLandingPage)) {
      setCustomLandingPages(prev => [...prev, finalLandingPage]);
    }

    setLinks(prev => [newLink, ...prev]);
    reset();
    // Reset domain to first available domain after reset
    if (userProfile && userProfile.domains.length > 0) {
      updateValue('domain', userProfile.domains[0].domain);
    }
    return newLink;
  });

  const handleCampaignCreated = (newCampaign: any) => {
    updateValue('campaign', newCampaign.xid?.toString() || newCampaign.name);
  };

  // Generate domain options from user profile
  const domainOptions = useMemo(() => {
    if (!userProfile || !userProfile.domains) {
      return [];
    }
    
    return userProfile.domains.map(domainObj => ({
      value: domainObj.domain,
      label: `${domainObj.domain} (${domainObj.country.toUpperCase()})`
    }));
  }, [userProfile]);

  const linkColumns = useMemo<ColumnDef<AffiliateLink>[]>(() => [
    {
      accessorKey: 'xid',
      header: 'ID',
      size: 80,
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

  if (loading || campaignsLoading || profileLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
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

  // Handle case where no domains are available
  if (!userProfile || !userProfile.domains || userProfile.domains.length === 0) {
    return (
      <div className="space-y-6 max-w-full">
        <Card className="p-6">
          <div className="text-center py-8">
            <Icon name="fas fa-exclamation-triangle" className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Domains Available
            </h3>
            <p className="text-gray-600">
              You don't have any domains configured in your profile. Please contact support to set up your domains.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full">
      {/* Form Section */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Generate Affiliate Link
          </h3>
          {userProfile && (
            <p className="text-sm text-gray-500 mt-1">
              Account: {userProfile.username} | Currency: {userProfile.currency}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {/* Form Fields Grid - Domain and Campaign */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="min-w-0">
              <Select
                label="Domain"
                value={formData.domain}
                onChange={(e) => updateValue('domain', e.target.value)}
                options={domainOptions}
                placeholder="Select a domain..."
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
                placeholder="Select a campaign..."
              />
            </div>
          </div>

          {/* Landing Page Section - Same Width as Above */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="min-w-0 sm:col-span-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Landing Page
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    value={formData.landingPage}
                    onChange={handleLandingPageInputChange}
                    placeholder="Enter landing page (e.g., /sports/tennis)"
                    className="h-10"
                  />
                  <Select
                    value={formData.landingPage}
                    onChange={(e) => handleLandingPageChange(e.target.value)}
                    options={landingPageOptions}
                    placeholder="Quick select..."
                    className="h-10"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Type a custom path or select from previously used options. "/" will be auto-prepended.
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          {formData.domain && formData.landingPage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Icon name="fas fa-eye" className="text-blue-600 text-sm" />
                <span className="text-sm font-medium text-blue-800">Preview URL:</span>
              </div>
              <div className="mt-1 font-mono text-sm text-blue-700">
                https://{formData.domain}{normalizeLandingPage(formData.landingPage)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              icon="fas fa-link"
              onClick={generateLink}
              loading={generatingLink}
              disabled={generatingLink || !formData.campaign || !formData.domain || !formData.landingPage.trim()}
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