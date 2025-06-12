import { affiliateService } from '@/services/affiliateService';
import type {
  AffiliateLink,
  AffiliateLinkFormData,
  AffiliateLinkApiResponse,
  AffiliateLinkCreateRequest,
  PromoCode,
  PromoCodeFormData,
  PromoCodeApiResponse,
  PromoCodeCreateRequest,
  Campaign,
  ResourceConfig
} from '@/types/affiliate';

// UTILITY FUNCTIONS

const findCampaignName = (campaignId: number, campaigns: Campaign[]): string => {
  const campaign = campaigns.find(c => c.xid === campaignId);
  return campaign?.name || 'Unknown Campaign';
};

const findCampaignId = (campaignValue: string, campaigns: Campaign[]): number => {
  const campaignId = parseInt(campaignValue);
  const campaign = campaigns.find(c => c.xid === campaignId);
  if (!campaign) {
    throw new Error(`Campaign with ID ${campaignId} not found`);
  }
  return campaignId;
};

// AFFILIATE LINK CONFIGURATION

export const affiliateLinkConfig: ResourceConfig<AffiliateLink, AffiliateLinkFormData> = {
  resourceType: 'affiliate-links',
  service: {
    create: affiliateService.links.create,
    getAll: affiliateService.links.getAll,
    createCampaign: affiliateService.campaigns.create
  },
  initialFormData: {
    domain: '',
    landingPage: '',
    campaign: ''
  },
  transform: (apiResponse: AffiliateLinkApiResponse, campaigns: Campaign[]): AffiliateLink => ({
    xid: apiResponse.xid,
    userId: apiResponse.user_id,
    domain: apiResponse.domain,
    landingPage: apiResponse.landing_page,
    campaignId: apiResponse.campaign_id,
    campaignName: findCampaignName(apiResponse.campaign_id, campaigns),
    generatedLink: apiResponse.url,
    createdAt: apiResponse.created_at
  }),
  buildRequest: (formData: AffiliateLinkFormData, campaigns: Campaign[]): AffiliateLinkCreateRequest => ({
    domain: formData.domain,
    landing_page: formData.landingPage,
    campaign_id: findCampaignId(formData.campaign, campaigns)
  }),
  validate: (formData: AffiliateLinkFormData): string | null => {
    if (!formData.domain?.trim()) {
      return 'Domain is required';
    }
    if (!formData.landingPage?.trim()) {
      return 'Landing page is required';
    }
    if (!formData.campaign?.trim()) {
      return 'Campaign is required';
    }
    
    // Validate landing page format
    if (!formData.landingPage.startsWith('/')) {
      return 'Landing page must start with "/"';
    }
    
    return null;
  }
};

// ============================================================================
// PROMO CODE CONFIGURATION
// ============================================================================

export const promoCodeConfig: ResourceConfig<PromoCode, PromoCodeFormData> = {
  resourceType: 'promo-codes',
  service: {
    create: affiliateService.promoCodes.create,
    getAll: affiliateService.promoCodes.getAll,
    createCampaign: affiliateService.campaigns.create
  },
  initialFormData: {
    campaign: '',
    code: ''
  },
  transform: (apiResponse: PromoCodeApiResponse, campaigns: Campaign[]): PromoCode => ({
    xid: apiResponse.xid,
    userId: apiResponse.user_id,
    code: apiResponse.code,
    campaignId: apiResponse.campaign_id,
    campaignName: findCampaignName(apiResponse.campaign_id, campaigns),
    status: apiResponse.status,
    createdAt: apiResponse.created_at
  }),
  buildRequest: (formData: PromoCodeFormData, campaigns: Campaign[]): PromoCodeCreateRequest => ({
    code: formData.code || '', // Allow empty code for auto-generation
    campaign_id: findCampaignId(formData.campaign, campaigns)
  }),
  validate: (formData: PromoCodeFormData): string | null => {
    if (!formData.campaign?.trim()) {
      return 'Campaign is required';
    }
    
    // If code is provided, validate it
    if (formData.code?.trim()) {
      // Basic promo code validation - alphanumeric and some special chars
      const codeRegex = /^[A-Z0-9_-]+$/i;
      if (!codeRegex.test(formData.code.trim())) {
        return 'Promo code can only contain letters, numbers, underscores, and hyphens';
      }
      
      if (formData.code.trim().length < 3) {
        return 'Promo code must be at least 3 characters long';
      }
      
      if (formData.code.trim().length > 20) {
        return 'Promo code must be 20 characters or less';
      }
    }
    
    return null;
  }
};