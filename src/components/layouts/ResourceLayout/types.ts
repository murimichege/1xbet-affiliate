import type { UserProfile, CampaignCreateRequest, Campaign } from '@/types/affiliate';
import type { ColumnDef } from '@tanstack/react-table';

// ============================================================================
// BASE LAYOUT TYPES
// ============================================================================

export interface BaseResourceProps<TResource, TFormData> {
  resources: TResource[];
  isLoading: boolean;
  isGenerating: boolean;
  formData: TFormData;
  isFormValid: boolean;
  formFields: React.ReactNode;
  onGenerate: () => Promise<TResource | undefined>;
  onCreateCampaign: () => void;
  columns: ColumnDef<TResource>[];
  isCampaignModalOpen: boolean;
  onCloseCampaignModal: () => void;
  onCampaignCreated: () => void;
  createCampaign: (data: CampaignCreateRequest) => Promise<Campaign>;
}

export interface AffiliateLinkLayoutProps<TResource, TFormData> extends BaseResourceProps<TResource, TFormData> {
  userProfile: UserProfile | null | undefined;
}

export interface PromoCodeLayoutProps<TResource, TFormData> extends BaseResourceProps<TResource, TFormData> {
  // Promo codes don't need userProfile
}

// ============================================================================
// LAYOUT CONFIGURATION
// ============================================================================

export interface ResourceLayoutConfig {
  title: string;
  generateButtonText: string;
  tableTitle: string;
  emptyMessage: string;
  emptyIcon: string;
  searchPlaceholder: string;
  requiresDomains: boolean;
  noDomainMessage?: {
    title: string;
    message: string;
  };
}

// ============================================================================
// INTERNAL LAYOUT TYPES
// ============================================================================

export interface BaseLayoutProps<TResource, TFormData> extends BaseResourceProps<TResource, TFormData> {
  resourceType: string;
  userProfile?: UserProfile | null | undefined;
  className?: string;
}