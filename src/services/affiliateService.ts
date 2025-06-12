import { apiClient } from '@/config/api';
import type {
  Campaign,
  CampaignCreateRequest,
  AffiliateLinkCreateRequest,
  AffiliateLinkApiResponse,
  UpdateAffiliateLinkRequest,
  PromoCodeCreateRequest,
  PromoCodeApiResponse,
  UserProfile,
  AffiliateSummary,
  QuickReportParams,
  QuickReportResponse,
  ReferralData,
  ReferralParams
} from '@/types/affiliate';

const AFFILIATE_USER_ID = '276004';
const AFFILIATE_BASE_PATH = `/affiliates/${AFFILIATE_USER_ID}`;

// ==================== SERVICE IMPLEMENTATION ====================

export const affiliateService = {
  // ==================== CAMPAIGNS ====================
  campaigns: {
    /**
     * Create a new campaign
     */
    async create(campaignData: CampaignCreateRequest): Promise<Campaign> {
      const response = await apiClient.post(`${AFFILIATE_BASE_PATH}/campaigns`, campaignData);
      return response.data;
    },

    /**
     * Get all campaigns for the affiliate
     */
    async getAll(): Promise<Campaign[]> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/campaigns`);
      return response.data;
    },

    /**
     * Get a specific campaign by ID
     */
    async getById(campaignId: string): Promise<Campaign> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/campaigns/${campaignId}`);
      return response.data;
    },

    /**
     * Update a campaign
     */
    async update(campaignId: string, campaignData: Partial<CampaignCreateRequest>): Promise<Campaign> {
      const response = await apiClient.put(`${AFFILIATE_BASE_PATH}/campaigns/${campaignId}`, campaignData);
      return response.data;
    },

    /**
     * Delete a campaign
     */
    async delete(campaignId: string): Promise<void> {
      await apiClient.delete(`${AFFILIATE_BASE_PATH}/campaigns/${campaignId}`);
    }
  },

  // ==================== AFFILIATE LINKS ====================
  links: {
    /**
     * Create a new affiliate link
     */
    async create(linkData: AffiliateLinkCreateRequest): Promise<AffiliateLinkApiResponse> {
      const response = await apiClient.post(`${AFFILIATE_BASE_PATH}/links`, linkData);
      return response.data;
    },

    /**
     * Get all affiliate links for the affiliate
     */
    async getAll(): Promise<AffiliateLinkApiResponse[]> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/links`);
      return response.data;
    },

    /**
     * Get a specific affiliate link by ID
     */
    async getById(linkId: string): Promise<AffiliateLinkApiResponse> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/links/${linkId}`);
      return response.data;
    },

    /**
     * Update an affiliate link
     */
    async update(linkId: string, linkData: UpdateAffiliateLinkRequest): Promise<AffiliateLinkApiResponse> {
      const response = await apiClient.put(`${AFFILIATE_BASE_PATH}/links/${linkId}`, linkData);
      return response.data;
    },

    /**
     * Delete an affiliate link
     */
    async delete(linkId: string): Promise<void> {
      await apiClient.delete(`${AFFILIATE_BASE_PATH}/links/${linkId}`);
    }
  },

  // ==================== PROMO CODES ====================
  promoCodes: {
    /**
     * Create a new promo code
     */
    async create(promoData: PromoCodeCreateRequest): Promise<PromoCodeApiResponse> {
      const response = await apiClient.post(`${AFFILIATE_BASE_PATH}/promo-codes`, promoData);
      return response.data;
    },

    /**
     * Get all promo codes for the affiliate
     */
    async getAll(): Promise<PromoCodeApiResponse[]> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/promo-codes`);
      return response.data;
    },

    /**
     * Get a specific promo code by ID
     */
    async getById(promoCodeId: string): Promise<PromoCodeApiResponse> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/promo-codes/${promoCodeId}`);
      return response.data;
    },

    /**
     * Update a promo code
     */
    async update(promoCodeId: string, promoData: Partial<PromoCodeCreateRequest>): Promise<PromoCodeApiResponse> {
      const response = await apiClient.put(`${AFFILIATE_BASE_PATH}/promo-codes/${promoCodeId}`, promoData);
      return response.data;
    },

    /**
     * Delete a promo code
     */
    async delete(promoCodeId: string): Promise<void> {
      await apiClient.delete(`${AFFILIATE_BASE_PATH}/promo-codes/${promoCodeId}`);
    },

    /**
     * Toggle promo code status (active/inactive)
     */
    async toggleStatus(promoCodeId: string): Promise<PromoCodeApiResponse> {
      const response = await apiClient.patch(`${AFFILIATE_BASE_PATH}/promo-codes/${promoCodeId}/toggle`);
      return response.data;
    }
  },

  // ==================== PROFILE ====================
  profile: {
    /**
     * Get affiliate profile information
     */
    async get(): Promise<UserProfile> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/profile`);
      return response.data;
    },

    /**
     * Update affiliate profile
     */
    async update(profileData: Partial<UserProfile>): Promise<UserProfile> {
      const response = await apiClient.put(`${AFFILIATE_BASE_PATH}/profile`, profileData);
      return response.data;
    }
  },

  // ==================== SUMMARY ====================
  summary: {
    /**
     * Get affiliate summary statistics
     */
    async get(): Promise<AffiliateSummary[]> {
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/summary`);
      return response.data;
    }
  },

  // ==================== REPORTS ====================
  reports: {
    /**
     * Get quick report data
     */
    async getQuickReport(params: QuickReportParams): Promise<QuickReportResponse[]> {
      const queryParams = new URLSearchParams();
      
      if (params.links && params.links.length > 0) {
        params.links.forEach(linkId => queryParams.append('links', linkId.toString()));
      }
      if (params.promos && params.promos.length > 0) {
        params.promos.forEach(promoId => queryParams.append('promos', promoId.toString()));
      }
      queryParams.append('start', params.start);
      queryParams.append('end', params.end);
      
      const response = await apiClient.get(`${AFFILIATE_BASE_PATH}/reports/quick?${queryParams.toString()}`);
      return response.data;
    }
  },

  // ==================== REFERRALS ====================
  referrals: {
    /**
     * Get referrals with pagination and filtering
     */
    async getAll(params: ReferralParams = {}): Promise<ReferralData[]> {
      const queryParams = new URLSearchParams();
      
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.dir) queryParams.append('dir', params.dir);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.date_from) queryParams.append('date_from', params.date_from);
      if (params.date_to) queryParams.append('date_to', params.date_to);
      
      const response = await apiClient.get(`/affiliate/referrals/me?${queryParams.toString()}`);
      return response.data;
    },

    /**
     * Get referral page information
     */
    async getPage(): Promise<any> {
      const response = await apiClient.get('/pages/referral');
      return response.data;
    }
  }
};

export default affiliateService;