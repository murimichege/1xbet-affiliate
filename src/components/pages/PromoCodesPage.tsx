import React, { useState, useMemo, useEffect } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { copyToClipboard } from '@/utils/helpers';
import { useCampaigns } from '@/hooks/useCampaign';
import affiliateService, { PromoCodeResponse } from '@/services/affiliateService';

// Form interface
interface PromoCodeForm {
  website: string;
  currency: string;
  campaign: string;
}

// UI interface for table display
interface PromoCode {
  id: string;
  website: string;
  currency: string;
  promoCode: string;
  btag: string;
  campaign: string;
  status: string;
  createdAt: string;
}

const INITIAL_FORM_DATA: PromoCodeForm = {
  website: 'https://www.facebook.com/',
  currency: 'KES',
  campaign: ''
};

// Available options
const WEBSITE_OPTIONS = [
  { value: 'https://www.facebook.com/', label: 'Facebook' },
  { value: 'https://www.instagram.com/', label: 'Instagram' },
  { value: 'https://1xbet.co.ke', label: '1xBet Kenya' },
  { value: 'https://betkumi.co.ke', label: 'BetKumi' }
];

const CURRENCY_OPTIONS = [
  { value: 'KES', label: 'KES' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' }
];

const PromoCodesPage: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { campaigns, createCampaign: createCampaignHook, loading: campaignsLoading } = useCampaigns();
  const { values: formData, updateValue, reset } = useForm(INITIAL_FORM_DATA);
  const {
    values: campaignForm,
    updateValue: updateCampaignValue,
    reset: resetCampaignForm,
    validate: validateCampaign
  } = useForm({
    name: ''
  });

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, [campaigns]);

  const loadInitialData = async () => {
    if (campaignsLoading || !Array.isArray(campaigns) || campaigns.length === 0) return;
    
    try {
      setLoading(true);
      const promoCodesData = await affiliateService.promoCodes.getAll().catch(() => []);
      
      // Ensure promoCodesData is an array
      const promoCodesArray = Array.isArray(promoCodesData) ? promoCodesData : [];
      
      // Transform API response to match UI expectations
      const transformedPromoCodes = promoCodesArray.map((code: PromoCodeResponse) => ({
        id: code.xid?.toString() || `pc_${Date.now()}`,
        website: formData.website,
        currency: formData.currency,
        promoCode: code.code,
        btag: `d_${code.xid}m_1599c_${code.code}`,
        campaign: campaigns.find(c => c.xid === code.campaign_id)?.name || 'Unknown',
        status: code.status,
        createdAt: code.created_at
      }));
      
      setPromoCodes(transformedPromoCodes);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setPromoCodes([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const { execute: createCampaign, loading: creatingCampaign } = useAsyncAction(async () => {
    if (!validateCampaign() || !campaignForm.name.trim()) {
      throw new Error('Campaign name is required');
    }

    const newCampaign = await createCampaignHook({
      name: campaignForm.name.trim()
    });
    
    updateValue('campaign', newCampaign.xid?.toString() || newCampaign.name);
    setIsModalOpen(false);
    resetCampaignForm();
    
    return newCampaign;
  });

  const { execute: generatePromoCode, loading: generatingPromo } = useAsyncAction(async () => {
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

    const promoRequest = {
      code: `PROMO_${Date.now()}`, // Generate unique code
      campaign_id: selectedCampaign.xid || 1
    };

    const newPromoCode = await affiliateService.promoCodes.create(promoRequest);
    
    // Transform API response to UI format
    const transformedPromoCode: PromoCode = {
      id: newPromoCode.xid?.toString() || `pc_${Date.now()}`,
      website: formData.website,
      currency: formData.currency,
      promoCode: newPromoCode.code,
      btag: `d_${newPromoCode.xid}m_1599c_${newPromoCode.code}`,
      campaign: selectedCampaign.name,
      status: newPromoCode.status,
      createdAt: newPromoCode.created_at
    };

    setPromoCodes(prev => [transformedPromoCode, ...prev]);
    reset();
    return newPromoCode;
  });

  const promoColumns = useMemo<ColumnDef<PromoCode>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 80,
      cell: ({ getValue }) => (
        <span className="font-mono text-sm text-gray-600">
          #{getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'website',
      header: 'Website',
      size: 180,
      cell: ({ getValue }) => {
        const url = getValue() as string;
        const displayName = WEBSITE_OPTIONS.find(opt => opt.value === url)?.label || url;
        return (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 truncate block max-w-[160px]" 
            title={url}
          >
            {displayName}
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
            <span className="font-mono font-semibold text-blue-600 text-sm">{code}</span>
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
            <div className="max-w-[120px] truncate font-mono text-sm" title={btag}>{btag}</div>
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
        <span className="text-sm text-gray-700 font-medium">
          {getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 100,
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const statusColor = status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                          status === 'active' ? 'bg-green-100 text-green-700' : 
                          'bg-red-100 text-red-700';
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
            {status.toUpperCase()}
          </span>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Promo Code</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select 
              label="Website" 
              value={formData.website} 
              onChange={e => updateValue('website', e.target.value)} 
              options={WEBSITE_OPTIONS}
            />
            <Select 
              label="Currency" 
              value={formData.currency} 
              onChange={e => updateValue('currency', e.target.value)} 
              options={CURRENCY_OPTIONS}
            />
            <Select 
              label="Campaign" 
              value={formData.campaign} 
              onChange={e => updateValue('campaign', e.target.value)} 
              options={Array.isArray(campaigns) ? campaigns.map(c => ({ 
                value: c.xid?.toString() || c.name, 
                label: c.name 
              })) : []}
            />
          </div>
          <div className="md:col-span-2 flex gap-2">
            <Button 
              icon="fas fa-plus" 
              onClick={generatePromoCode} 
              loading={generatingPromo} 
              disabled={generatingPromo || !formData.campaign} 
              size="sm"
              className="flex-1"
            >
              {generatingPromo ? 'GENERATING...' : 'GENERATE PROMO CODE'}
            </Button>
            <Button 
              variant="secondary" 
              icon="fas fa-bullhorn" 
              size="sm" 
              onClick={() => setIsModalOpen(true)}
            >
              New Campaign
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generated Promo Codes</h3>
            <p className="text-sm text-gray-500 mt-1">{promoCodes.length} total codes</p>
          </div>
        </div>
        <div className="p-6">
          <DataTable 
            data={promoCodes} 
            columns={promoColumns} 
            loading={false} 
            emptyMessage="No promo codes found. Generate your first promo code above." 
            emptyIcon="fas fa-ticket-alt" 
            enableSorting 
            enableSelection 
            enableGlobalSearch 
            searchPlaceholder="Search by code, website, or campaign..." 
            pageSize={10} 
            showPagination={promoCodes.length > 10}
            tableClassName="min-w-full" 
            density="normal" 
          />
        </div>
      </Card>

      {/* Campaign Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" 
              onClick={() => setIsModalOpen(false)}
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
            <div className="space-y-4">
              <Input
                label="Campaign Name"
                type="text"
                value={campaignForm.name}
                onChange={(e) => updateCampaignValue('name', e.target.value)}
                placeholder="Enter campaign name"
              />
              <div className="flex justify-end pt-4">
                <Button 
                  icon="fas fa-paper-plane" 
                  onClick={createCampaign} 
                  loading={creatingCampaign}
                  disabled={creatingCampaign || !campaignForm.name.trim()}
                  size="sm"
                >
                  {creatingCampaign ? 'Creating...' : 'Create Campaign'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodesPage;