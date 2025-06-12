import type { UserProfile, Campaign, SelectOption } from '@/types/affiliate';

export const normalizeLandingPage = (input: string): string => {
  if (!input) return '';
  const trimmed = input.trim();
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export const formatCurrency = (amount: number | null | undefined, currency: string = 'USD') => {
  const safeAmount = amount || 0;
  return `${currency} ${safeAmount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const formatDomainOptions = (domains?: UserProfile['domains']): string[] => {
  if (!domains?.length) return [];
  return domains.map(d => `${d.domain}:${d.domain} (${d.country.toUpperCase()})`);
};

export const formatLandingPageOptions = (pages: string[]): SelectOption[] => {
  return pages.map(page => ({
    value: page,
    label: page === '/' ? '/ (Home)' : page
  }));
};

export const formatCampaignOptions = (campaigns: Campaign[]): SelectOption[] => {
  return campaigns.map(c => ({
    value: c.xid?.toString() || c.name,
    label: c.name
  }));
};

export const formatSelectOptions = (items: any[], valueKey: string, labelKey: string): string[] => {
  return items.map(item => `${item[valueKey]}:${item[labelKey]}`);
};

export const formatLastPaid = (lastPaidAt: string | null): string => {
  if (!lastPaidAt) return 'Never';
  try {
    return new Date(lastPaidAt).toLocaleDateString();
  } catch {
    return 'Never';
  }
};