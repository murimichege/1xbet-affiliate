import { useState, useMemo, useCallback } from 'react';
import { useAffiliateLinks, usePromoCodes } from './useSWR';
import { useAsyncAction } from './useAsyncAction';
import affiliateService from '@/services/affiliateService';
import { exportToCSV } from '@/utils/csvExport';
import type { 
  QuickReportResponse, 
  FilterField 
} from '@/types/affiliate';

// ============================================================================
// TYPES
// ============================================================================

interface ReportFilters {
    links: string[];
    promos: string[];
    start: Date;
    end: Date;
  }
  

interface MetricDefinition {
  key: keyof QuickReportResponse;
  label: string;
  type: 'number' | 'currency';
  icon?: string;
}

type ReportState = QuickReportResponse | 'empty' | null;



const now = new Date();
const INITIAL_FILTERS: ReportFilters = {
  links: [],
  promos: [],
  start: now,
  end: now,
};



const METRICS: MetricDefinition[] = [
  { key: 'new_account_count', label: 'New Accounts', type: 'number', icon: 'fas fa-user-plus' },
  { key: 'new_account_with_deposit_count', label: 'New Accounts with Deposits', type: 'number', icon: 'fas fa-credit-card' },
  { key: 'new_deposit_count', label: 'New Deposit Count', type: 'number', icon: 'fas fa-arrow-up' },
  { key: 'new_deposit_sum', label: 'New Deposit Sum', type: 'currency', icon: 'fas fa-coins' },
  { key: 'new_deposit_account_count', label: 'New Deposit Account Count', type: 'number', icon: 'fas fa-users' },
  { key: 'deposit_sum', label: 'Total Deposit Sum', type: 'currency', icon: 'fas fa-wallet' },
  { key: 'deposit_count', label: 'Total Deposit Count', type: 'number', icon: 'fas fa-list-ol' },
  { key: 'deposit_account_count', label: 'Deposit Account Count', type: 'number', icon: 'fas fa-user-check' },
  { key: 'active_account_count', label: 'Active Accounts', type: 'number', icon: 'fas fa-chart-line' },
  { key: 'commission', label: 'Commission', type: 'currency', icon: 'fas fa-money-bill' }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const parseSelectedIds = (selectedValues: string[]): number[] => {
  return selectedValues
    .map(value => {
      const id = value.includes(':') ? value.split(':')[0] : value;
      return parseInt(id, 10);
    })
    .filter(id => !isNaN(id));
};

const formatValue = (val: number | string, type: 'number' | 'currency', currency: string): string => {
  if (typeof val !== 'number') return '-';
  
  if (type === 'currency') {
    return `${currency} ${val.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }
  
  return val.toLocaleString();
};

// ============================================================================
// HOOK RETURN TYPE
// ============================================================================

interface ReportManagerReturn {
  // State
  filters: ReportFilters;
  reportData: ReportState;
  filterFields: FilterField[];
  formattedMetrics: Array<{
    key: string;
    label: string;
    icon?: string;
    formattedValue: string;
  }>;
  
  // Loading states
  isGenerating: boolean;
  isExporting: boolean;
  loadingOptions: boolean;
  
  // Actions
  updateFilter: (key: keyof ReportFilters, value: ReportFilters[keyof ReportFilters]) => void;
  generateReport: () => Promise<void>;
  exportReport: () => Promise<void>;
  resetFilters: () => void;
  
  // Utilities
  hasData: boolean;
  isEmpty: boolean;
  hasNoReport: boolean;
}

// ============================================================================
// MAIN HOOK
// ============================================================================

export const useReportManager = (): ReportManagerReturn => {
  const [filters, setFilters] = useState<ReportFilters>(INITIAL_FILTERS);
  const [reportData, setReportData] = useState<ReportState>(null);

  // Use existing SWR hooks for data fetching
  const { data: availableLinks = [], isLoading: linksLoading } = useAffiliateLinks();
  const { data: availablePromos = [], isLoading: promosLoading } = usePromoCodes();
  const loadingOptions = linksLoading || promosLoading;

  // Generate options for dropdowns with unique keys
  const linkOptions = useMemo(() => 
    availableLinks.map(link => {
      const displayText = link.url || `${link.domain}${link.landing_page}`;
      return `${link.xid}:${displayText}`;
    })
  , [availableLinks]);

  const promoOptions = useMemo(() => 
    availablePromos.map(promo => `${promo.xid}:${promo.code}`)
  , [availablePromos]);

  // Filter field definitions
  const filterFields: FilterField[] = useMemo(() => [
    {
      key: 'links',
      label: 'Filter by Links (Optional)',
      type: 'multiselect',
      options: linkOptions,
      placeholder: 'Select affiliate links...'
    },
    {
      key: 'promos',
      label: 'Filter by Promo Codes (Optional)',
      type: 'multiselect',
      options: promoOptions,
      placeholder: 'Select promo codes...'
    },
    { key: 'start', label: 'Start Date & Time', type: 'datetime-local' },
    { key: 'end', label: 'End Date & Time', type: 'datetime-local' }
], [linkOptions, promoOptions]);

  // Formatted metrics for display
  const formattedMetrics = useMemo(() => {
    if (!reportData || reportData === 'empty') return [];
    
    const data = reportData as QuickReportResponse;
    return METRICS.map(({ key, label, type, icon }) => ({
      key: key as string,
      label,
      icon,
      formattedValue: formatValue(data[key], type, data.currency)
    }));
  }, [reportData]);

  // Report generation
  const { execute: generateReport, loading: isGenerating } = useAsyncAction(
    async () => {
      const linkIds = parseSelectedIds(filters.links);
      const promoIds = parseSelectedIds(filters.promos);
      
      const startISO = filters.start.toISOString();
      const endISO = filters.end.toISOString();
      
      
      const response = await affiliateService.reports.getQuickReport({
        links: linkIds.length > 0 ? linkIds : undefined,
        promos: promoIds.length > 0 ? promoIds : undefined,
        start: startISO,
        end: endISO
      });
      

      if (!Array.isArray(response)) {
        setReportData(null);
        return;
      }

      if (response.length === 0) {
        setReportData('empty');
        return;
      }

      setReportData(response[0]);
    },
    {
      onError: (err) => {
        console.error('Report generation failed:', err);
        setReportData(null);
      }
    }
  );

  // Export functionality
  const { execute: exportReport, loading: isExporting } = useAsyncAction(
    async () => {
      if (!reportData || reportData === 'empty') return;

      const validReportData = reportData as QuickReportResponse;
      const rows = METRICS.map(({ key, label, type }) => ({
        Metric: label,
        Value: formatValue(validReportData[key], type, validReportData.currency)
      }));

      exportToCSV(rows, `quick-report-${filters.start}-to-${filters.end}`);
    },
    {
      onError: err => console.error('Export failed:', err)
    }
  );

  // Event handlers
  const updateFilter = useCallback((key: keyof ReportFilters, value: ReportFilters[keyof ReportFilters]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setReportData(null);
  }, []);

  // State helpers
  const hasData = reportData !== null && reportData !== 'empty';
  const isEmpty = reportData === 'empty';
  const hasNoReport = reportData === null;

  return {
    // State
    filters,
    reportData,
    filterFields,
    formattedMetrics,
    
    // Loading states
    isGenerating,
    isExporting,
    loadingOptions,
    
    // Actions
    updateFilter,
    generateReport,
    exportReport,
    resetFilters,
    
    // Utilities
    hasData,
    isEmpty,
    hasNoReport
  };
};