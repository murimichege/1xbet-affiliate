import React, { useState, useMemo, useEffect } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { ColumnDef } from '@tanstack/react-table';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { copyToClipboard } from '@/utils/helpers';
import { useCampaigns } from '@/hooks/useCampaign';
import { CampaignModal } from '@/components/ui/Modal';
import affiliateService, { PromoCodeResponse } from '@/services/affiliateService';

interface PromoCodeForm {
  campaign: string;
  code: string;
}

interface PromoCode {
  xid: number;
  userId: number;
  code: string;
  campaignId: number;
  campaignName: string;
  status: string;
  createdAt: string;
}

const PromoCodesPage: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { campaigns, loading: campaignsLoading, createCampaign } = useCampaigns();
  const { values: formData, updateValue, reset } = useForm<PromoCodeForm>({
    campaign: '',
    code: ''
  });

  // Load initial data
  useEffect(() => {
    if (!campaignsLoading && Array.isArray(campaigns)) {
      loadInitialData();
    }
  }, [campaigns, campaignsLoading]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const promoCodesData = await affiliateService.promoCodes.getAll().catch(() => []);
      
      const promoCodesArray = Array.isArray(promoCodesData) ? promoCodesData : [];
      
      // Transform API response to match UI expectations
      const transformedPromoCodes: PromoCode[] = promoCodesArray.map((code: PromoCodeResponse) => ({
        xid: code.xid,
        userId: code.user_id,
        code: code.code,
        campaignId: code.campaign_id,
        campaignName: campaigns.find(c => c.xid === code.campaign_id)?.name || 'Unknown Campaign',
        status: code.status,
        createdAt: code.created_at
      }));
      
      setPromoCodes(transformedPromoCodes);
    } catch (error) {
      console.error('Error loading promo codes:', error);
      setPromoCodes([]);
    } finally {
      setLoading(false);
    }
  };

  const { execute: generatePromoCode, loading: generatingPromo } = useAsyncAction(async () => {
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

    const promoRequest = {
      code: formData.code, 
      campaign_id: selectedCampaign.xid || 1
    };

    const newPromoCodeResponse = await affiliateService.promoCodes.create(promoRequest);
    
    // Transform API response to UI format
    const transformedPromoCode: PromoCode = {
      xid: newPromoCodeResponse.xid,
      userId: newPromoCodeResponse.user_id,
      code: newPromoCodeResponse.code,
      campaignId: newPromoCodeResponse.campaign_id,
      campaignName: selectedCampaign.name,
      status: newPromoCodeResponse.status,
      createdAt: newPromoCodeResponse.created_at
    };

    setPromoCodes(prev => [transformedPromoCode, ...prev]);
    reset();
    return newPromoCodeResponse;
  });

  const handleCampaignCreated = (newCampaign: any) => {
    updateValue('campaign', newCampaign.xid?.toString() || newCampaign.name);
  };

  const promoColumns = useMemo<ColumnDef<PromoCode>[]>(() => [
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
      accessorKey: 'code',
      header: 'Promo Code',
      size: 180,
      minSize: 150,
      maxSize: 220,
      cell: ({ getValue }) => {
        const code = getValue() as string;
        return (
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono font-semibold text-blue-600 text-sm truncate flex-1">{code}</span>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 w-6 p-0 flex-shrink-0" 
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
      accessorKey: 'campaignName',
      header: 'Campaign',
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
      accessorKey: 'status',
      header: 'Status',
      size: 100,
      minSize: 80,
      maxSize: 120,
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const normalizedStatus = status.toLowerCase();
        
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'pending':
              return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved':
              return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
            case 'declined':
              return 'bg-red-100 text-red-800 border-red-200';
            case 'active':
              return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
              return 'bg-gray-100 text-gray-800 border-gray-200';
          }
        };
  
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(normalizedStatus)}`}>
            {status.toUpperCase()}
          </span>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
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
          <h3 className="text-lg font-semibold text-gray-900">Generate Promo Code</h3>
        </div>
        
        {/* Fixed Layout Structure */}
        <div className="space-y-4">
          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="min-w-0">
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
            
            <div className="min-w-0">
              <Input
                label="Promo Code (Optional)"
                type="text"
                value={formData.code}
                onChange={e => updateValue('code', e.target.value)}
                placeholder="Enter custom promo code or leave empty to auto-generate"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button 
              icon="fas fa-plus" 
              onClick={generatePromoCode} 
              loading={generatingPromo} 
              disabled={generatingPromo || !formData.campaign} 
              size="md"
              className="flex-1 sm:flex-none sm:min-w-[200px]"
            >
              {generatingPromo ? 'GENERATING...' : 'GENERATE PROMO CODE'}
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
            <h3 className="text-lg font-semibold text-gray-900">Generated Promo Codes</h3>
            <p className="text-sm text-gray-500 mt-1">{promoCodes.length} total codes</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="min-w-0">
            <DataTable 
              data={promoCodes} 
              columns={promoColumns} 
              loading={false} 
              emptyMessage="No promo codes found. Generate your first promo code above." 
              emptyIcon="fas fa-ticket-alt" 
              enableSorting 
              enableSelection 
              enableGlobalSearch 
              searchPlaceholder="Search by code, campaign, or BTAG..." 
              pageSize={10} 
              showPagination={promoCodes.length > 10}
              tableClassName="w-full table-fixed" 
              density="normal" 
            />
          </div>
        </div>
      </Card>

      <CampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCampaignCreated={handleCampaignCreated}
        createCampaign={createCampaign}
      />
    </div>
  );
};

export default PromoCodesPage;