import { useState, useMemo, useEffect } from 'react';
import { useProfile, useAffiliateLinks, usePromoCodes, useSummary } from './useSWR';
import { useResourceForm } from './useResourceForm';
import { affiliateLinkConfig, promoCodeConfig } from '@/components/shared/affiliateConfig';
import { 
  formatDomainOptions, 
  formatLandingPageOptions, 
  formatCurrency,
  formatLastPaid 
} from '@/utils/formatters';
import type { 
  FilterField, 
  StatCardData, 
  ResourceHookResult,
  UserProfile,
  AffiliateLink,
  AffiliateLinkFormData,
  PromoCode,
  PromoCodeFormData,
  CampaignCreateRequest,
  Campaign,
  SelectOption,
  ResourceConfig
} from '@/types/affiliate';

type ResourceType = 'affiliate-links' | 'promo-codes' | 'main-page-stats';

// Return types
interface MainPageStatsReturn {
  profileStats: StatCardData[];
  summaryStats: StatCardData[];
  profileInfo: {
    username: string;
    country: string;
    domain: string;
    memberSince: number;
  } | null;
  isLoading: boolean;
  profileLoading: boolean;
  summaryLoading: boolean;
  refreshProfile: () => Promise<any>;
}

interface ResourceReturn<TResource, TFormData> {
  resources: TResource[];
  userProfile: UserProfile | null;
  campaigns: Campaign[];
  campaignOptions: SelectOption[];
  loading: boolean;
  generating: boolean;
  formData: TFormData;
  isValid: boolean;
  filterFields: FilterField[];
  updateField: (key: keyof TFormData, value: any) => void;
  generate: () => Promise<TResource | undefined>;
  createCampaign: (data: CampaignCreateRequest) => Promise<Campaign>;
  isAnyLoading: boolean;
  refreshProfile: () => Promise<any>;
  refreshCampaigns: () => Promise<any>;
  refreshResources: () => Promise<any>;
}

const useResourceHookMap = {
  'affiliate-links': useAffiliateLinks,
  'promo-codes': usePromoCodes,
  'main-page-stats': (): ResourceHookResult => ({ 
    data: [], 
    isLoading: false, 
    mutate: async () => {}, 
    error: null, 
    isValidating: false 
  })
};

const configMap = {
  'affiliate-links': affiliateLinkConfig,
  'promo-codes': promoCodeConfig,
  'main-page-stats': null
};

// Function overloads
export function useResourceManager(resourceType: 'main-page-stats'): MainPageStatsReturn;
export function useResourceManager(resourceType: 'affiliate-links'): ResourceReturn<AffiliateLink, AffiliateLinkFormData>;
export function useResourceManager(resourceType: 'promo-codes'): ResourceReturn<PromoCode, PromoCodeFormData>;
export function useResourceManager(resourceType: ResourceType): any {
  // Static data (cached for 30 minutes)
  const { 
    data: userProfile, 
    isLoading: profileLoading, 
    mutate: mutateProfile 
  } = useProfile();
  
  // Dynamic data (cached for 5 minutes)
  const { 
    data: summaryResponse, 
    isLoading: summaryLoading 
  } = useSummary();
  
  // Landing pages only for affiliate links
  const [customLandingPages, setCustomLandingPages] = useState<string[]>([]);

  const useResourceHook = useResourceHookMap[resourceType];
  const config = configMap[resourceType];

  // Resource form with proper typing
  const affiliateLinkResourceForm = resourceType === 'affiliate-links' && config 
    ? useResourceForm(config as ResourceConfig<AffiliateLink, AffiliateLinkFormData>, useResourceHook) 
    : null;
    
  const promoCodeResourceForm = resourceType === 'promo-codes' && config 
    ? useResourceForm(config as ResourceConfig<PromoCode, PromoCodeFormData>, useResourceHook) 
    : null;
    
  const resourceForm = affiliateLinkResourceForm || promoCodeResourceForm;

  // Stats calculations
  const summaryData = useMemo(() => {
    return Array.isArray(summaryResponse) && summaryResponse.length > 0 
      ? summaryResponse[0] 
      : null;
  }, [summaryResponse]);

  const profileStats = useMemo((): StatCardData[] => {
    if (!userProfile) return [];
    return [
      {
        id: 'fixed-pay',
        label: 'FIXED PAY',
        value: formatCurrency(userProfile.fixed_pay, userProfile.currency),
        icon: 'fas fa-money-bill',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 'rev-share',
        label: 'REVENUE SHARE',
        value: `${(userProfile.rev_share * 100)}%`,
        icon: 'fas fa-percentage',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      }
    ];
  }, [userProfile]);

  const summaryStats = useMemo((): StatCardData[] => {
    const fallbackSummary = {
      currency: userProfile?.currency || 'KES',
      yesterday: 0,
      last_30_days: 0,
      this_month: 0,
      all_time: 0,
      paid: 0,
      last_paid_at: null
    };

    const data = summaryData || fallbackSummary;

    return [
      {
        id: 'yesterday',
        label: 'YESTERDAY',
        value: formatCurrency(data.yesterday, data.currency),
        icon: 'fas fa-calendar-day',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        id: 'last-30-days',
        label: 'LAST 30 DAYS',
        value: formatCurrency(data.last_30_days, data.currency),
        icon: 'fas fa-calendar-month',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50'
      },
      {
        id: 'this-month',
        label: 'THIS MONTH',
        value: formatCurrency(data.this_month, data.currency),
        icon: 'fas fa-calendar',
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50'
      },
      {
        id: 'all-time',
        label: 'ALL TIME',
        value: formatCurrency(data.all_time, data.currency),
        icon: 'fas fa-infinity',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50'
      },
      {
        id: 'paid',
        label: 'TOTAL PAID',
        value: formatCurrency(data.paid, data.currency),
        icon: 'fas fa-hand-holding-dollar',
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        id: 'last-paid',
        label: 'LAST PAID',
        value: formatLastPaid(data.last_paid_at),
        icon: 'fas fa-clock',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      }
    ];
  }, [summaryData, userProfile]);

  const profileInfo = useMemo(() => {
    if (!userProfile) return null;
    return {
      username: userProfile.username,
      country: userProfile.country?.toUpperCase() || 'N/A',
      domain: userProfile.domains?.[0]?.domain || 'N/A',
      memberSince: new Date(userProfile.created_at).getFullYear()
    };
  }, [userProfile]);

// Landing page options for affiliate links only
const landingPageOptions = useMemo(() => {
  if (resourceType !== 'affiliate-links') return [];
  return formatLandingPageOptions(customLandingPages);
}, [resourceType, customLandingPages]);

// Extract landing pages from affiliate links only - simplified to prevent infinite loops
useEffect(() => {
  if (resourceType === 'affiliate-links' && affiliateLinkResourceForm?.resources) {
    const pages = [...new Set(affiliateLinkResourceForm.resources.map(link => link.landingPage))].filter(Boolean);
    // Only update if pages actually changed to prevent infinite loops
    setCustomLandingPages(prev => {
      if (JSON.stringify(prev.sort()) !== JSON.stringify(pages.sort())) {
        return pages;
      }
      return prev;
    });
  }
}, [resourceType]); // Only depend on resourceType, not the resources array
  const filterFields: FilterField[] = useMemo(() => {
    if (!resourceForm) return [];

    switch (resourceType) {
      case 'affiliate-links':
        return [
          {
            key: 'domain',
            label: 'Domain',
            type: 'select',
            options: formatDomainOptions(userProfile?.domains),
            className: 'min-w-0'
          },
          {
            key: 'campaign',
            label: 'Campaign',
            type: 'select',
            options: resourceForm.campaignOptions.map(opt => `${opt.value}:${opt.label}`),
            className: 'min-w-0'
          },
          {
            key: 'landingPage',
            label: 'Landing Page',
            type: 'dual-input',
            options: landingPageOptions.map(opt => `${opt.value}:${opt.label}`),
            placeholder: 'Enter landing page (e.g., /sports/tennis)'
          }
        ];

      case 'promo-codes':
        return [
          {
            key: 'campaign',
            label: 'Campaign',
            type: 'select',
            options: resourceForm.campaignOptions.map(opt => `${opt.value}:${opt.label}`)
          },
          {
            key: 'code',
            label: 'Promo Code (Optional)',
            type: 'text',
            placeholder: 'Enter custom promo code or leave empty to auto-generate'
          }
        ];

      default:
        return [];
    }
  }, [resourceType, resourceForm?.campaignOptions, userProfile, landingPageOptions]);

  // Return data based on resource type
  if (resourceType === 'main-page-stats') {
    return {
      profileStats,
      summaryStats,
      profileInfo,
      isLoading: profileLoading || summaryLoading,
      profileLoading,
      summaryLoading,
      refreshProfile: mutateProfile,
    } as MainPageStatsReturn;
  }

  if (!resourceForm) {
    const defaultReturn: ResourceReturn<any, any> = {
      resources: [],
      userProfile: userProfile || null,
      campaigns: [],
      campaignOptions: [],
      loading: true,
      generating: false,
      formData: {} as any,
      isValid: false,
      filterFields: [],
      updateField: () => {},
      generate: async () => undefined,
      createCampaign: async () => ({} as Campaign),
      isAnyLoading: true,
      refreshProfile: mutateProfile,
      refreshCampaigns: async () => {},
      refreshResources: async () => {},
    };
    return defaultReturn;
  }

  return {
    resources: resourceForm.resources || [],
    userProfile: userProfile || null,
    campaigns: resourceForm.campaigns || [],
    campaignOptions: resourceForm.campaignOptions || [],
    loading: resourceForm.loading || false,
    generating: resourceForm.generating || false,
    formData: resourceForm.formData,
    isValid: resourceForm.isValid || false,
    filterFields,
    updateField: resourceForm.updateField,
    generate: resourceForm.generate,
    createCampaign: resourceForm.createCampaign,
    isAnyLoading: resourceForm.loading || profileLoading,
    refreshProfile: mutateProfile,
    refreshCampaigns: resourceForm.refreshCampaigns,
    refreshResources: resourceForm.refreshResources,
  };
}