import { NavigationItem } from '@/types/common';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'main', label: 'Main page', icon: 'fas fa-home' },
  { id: 'websites', label: 'Websites', icon: 'fas fa-globe' },
  { id: 'commission', label: 'Commission structure', icon: 'fas fa-percentage' },
  { id: 'payments', label: 'Payment history', icon: 'fas fa-credit-card' },
];

export const MARKETING_ITEMS: NavigationItem[] = [
  { id: 'affiliate-links', label: 'Affiliate links', icon: 'fas fa-link' },
  { id: 'promo-codes', label: 'Promo codes', icon: 'fas fa-tags' },
];

export const REPORT_ITEMS: NavigationItem[] = [
  { id: 'summary', label: 'Summary', icon: 'fas fa-chart-pie' },
  { id: 'full-report', label: 'Full report', icon: 'fas fa-file-alt' },
  { id: 'player-report', label: 'Player report', icon: 'fas fa-users' },
];

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'BTC'] as const;

export const TIME_INTERVALS = [
  '1 month',
  '3 months', 
  '6 months',
  '1 year'
] as const;

export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Russian',
  'Chinese'
] as const;
