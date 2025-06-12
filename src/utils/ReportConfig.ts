import { FilterField } from '@/components/filters/FilterOptions';
import { PlayerReportFilters } from '@/hooks/usePlayerReport';
import { 
  CURRENCIES, 
  WEBSITE_URLS, 
  TIME_INTERVALS, 
  REGISTRATION_SOURCES} from '@/data/dummyData';

export const INITIAL_PLAYER_FILTERS: PlayerReportFilters = {
  currency: 'USD',
  country: 'Select...',
  marketingToolId: '',
  website: 'All',
  timeInterval: 'Exact period',
  campaign: 'Select...',
  playerId: '',
  registrationSource: 'Select...',
  dateFrom: '2025-06-01',
  dateTo: '2025-06-04'
};

export const PLAYER_FILTER_FIELDS: FilterField[] = [
  {
    key: 'currency',
    label: 'Currency',
    type: 'select',
    options: CURRENCIES
  },
  {
    key: 'country',
    label: 'Country',
    type: 'select',
    options: ['Select...', 'Kenya', 'Uganda', 'Tanzania', 'Nigeria', 'South Africa', 'Ghana', 'United States', 'United Kingdom', 'Germany', 'Canada', 'Australia']
  },
  {
    key: 'marketingToolId',
    label: 'Marketing tool ID',
    type: 'text',
    placeholder: 'Enter tool ID'
  },
  {
    key: 'website',
    label: 'Website',
    type: 'select',
    options: ['All', ...WEBSITE_URLS]
  },
  {
    key: 'timeInterval',
    label: 'Time interval',
    type: 'select',
    options: TIME_INTERVALS
  },
  {
    key: 'campaign',
    label: 'Campaign',
    type: 'select',
    options: ['Select...', 'World Wide', 'Mobile App', 'Social Media', 'Email Campaign']
  },
  {
    key: 'playerId',
    label: 'Player ID',
    type: 'text',
    placeholder: 'Enter player ID (e.g., KE-001)'
  },
  {
    key: 'registrationSource',
    label: 'Registration Source',
    type: 'select',
    options: REGISTRATION_SOURCES
  }
];
export const SUMMARY_FILTER_FIELDS: FilterField[] = [
  {
    key: 'currency',
    label: 'Currency',
    type: 'select',
    options: ['USD', 'EUR', 'GBP', 'BTC']
  },
  {
    key: 'website',
    label: 'Website',
    type: 'select',
    options: ['All', 'https://www.facebook.com/', 'https://sportsnews.com', 'https://betanalysis.com']
  },
  {
    key: 'marketingToolId',
    label: 'Marketing tool ID',
    type: 'text',
    placeholder: 'Enter tool ID'
  },
  {
    key: 'timeInterval',
    label: 'Time interval',
    type: 'select',
    options: ['Exact period', 'Last 7 days', 'Last 30 days', 'This month', 'Last month']
  },
  {
    key: 'dateFrom',
    label: 'From',
    type: 'date'
  },
  {
    key: 'dateTo',
    label: 'To',
    type: 'date'
  }
];