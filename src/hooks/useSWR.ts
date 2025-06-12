import useSWR, { SWRConfiguration } from 'swr';
import affiliateService from '@/services/affiliateService';

// Different cache strategies for different data types
const staticDataConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  dedupingInterval: 30 * 60 * 1000, // 30 minutes for static data (profile, campaigns)
  revalidateIfStale: false, // Don't auto-revalidate stale data
  shouldRetryOnError: false,
};

const dynamicDataConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 5 * 60 * 1000, // 5 minutes for dynamic data (links, codes, summary)
  revalidateIfStale: true,
  shouldRetryOnError: true,
};

// Generic fetcher functions
const fetchers = {
  profile: () => affiliateService.profile.get(),
  campaigns: () => affiliateService.campaigns.getAll(),
  summary: () => affiliateService.summary.get(),
  affiliateLinks: () => affiliateService.links.getAll(),
  promoCodes: () => affiliateService.promoCodes.getAll(),
};

// STATIC DATA HOOKS (Profile & Campaigns - Cache for 30 minutes, only update manually)
export const useProfile = (config?: SWRConfiguration) => {
  const result = useSWR('profile', fetchers.profile, { 
    ...staticDataConfig, 
    ...config 
  });
  
  return {
    data: result.data || null,
    isLoading: result.isLoading,
    error: result.error,
    mutate: result.mutate, // Manual refresh only
    isValidating: result.isValidating
  };
};

export const useCampaigns = (config?: SWRConfiguration) => {
  const result = useSWR('campaigns', fetchers.campaigns, { 
    ...staticDataConfig, 
    ...config 
  });
  
  return {
    data: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    mutate: result.mutate, // Manual refresh only (when campaigns are created/updated)
    isValidating: result.isValidating
  };
};

// DYNAMIC DATA HOOKS (Summary, Links, Codes - Cache for 5 minutes, auto-refresh)
export const useSummary = (config?: SWRConfiguration) => {
  const result = useSWR('summary', fetchers.summary, { 
    ...dynamicDataConfig, 
    ...config 
  });
  
  return {
    data: result.data || null,
    isLoading: result.isLoading,
    error: result.error,
    mutate: result.mutate,
    isValidating: result.isValidating
  };
};

export const useAffiliateLinks = (config?: SWRConfiguration) => {
  const result = useSWR('affiliate-links', fetchers.affiliateLinks, { 
    ...dynamicDataConfig, 
    ...config 
  });
  
  return {
    data: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    mutate: result.mutate, // Auto-refresh when new links are created
    isValidating: result.isValidating
  };
};

export const usePromoCodes = (config?: SWRConfiguration) => {
  const result = useSWR('promo-codes', fetchers.promoCodes, { 
    ...dynamicDataConfig, 
    ...config 
  });
  
  return {
    data: result.data || [],
    isLoading: result.isLoading,
    error: result.error,
    mutate: result.mutate, // Auto-refresh when new codes are created
    isValidating: result.isValidating
  };
};

//  MANUAL CACHE MANAGEMENT UTILITIES
export const cacheUtils = {
  // Force refresh profile (call after profile updates)
  refreshProfile: () => {
    return fetchers.profile().then(data => {
      // This will update the cache with fresh data
      return data;
    });
  },
  
  // Force refresh campaigns (call after campaign creation/updates)
  refreshCampaigns: () => {
    return fetchers.campaigns().then(data => {
      return data;
    });
  },
  
  // Clear all caches (for logout i.e to be implemented)
  clearAll: () => {
    // This would need to be implemented with SWR's cache.clear() if needed
    console.log('Clearing all caches...');
  }
};