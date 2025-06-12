import type { ResourceLayoutConfig } from './types';

export const LAYOUT_CONFIGS: Record<string, ResourceLayoutConfig> = {
  'affiliate-links': {
    title: 'Generate Affiliate Link',
    generateButtonText: 'GENERATE LINK',
    tableTitle: 'Affiliate Links',
    emptyMessage: 'No affiliate links found. Generate your first link above.',
    emptyIcon: 'fas fa-link',
    searchPlaceholder: 'Search by domain, campaign, or landing page...',
    requiresDomains: true,
    noDomainMessage: {
      title: 'No Domains Available',
      message: 'Contact support to set up your domains.'
    }
  },
  'promo-codes': {
    title: 'Generate Promo Code',
    generateButtonText: 'GENERATE PROMO CODE',
    tableTitle: 'Generated Promo Codes',
    emptyMessage: 'No promo codes found. Generate your first promo code above.',
    emptyIcon: 'fas fa-ticket-alt',
    searchPlaceholder: 'Search by code, campaign, or status...',
    requiresDomains: false
  }
};