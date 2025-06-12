// ============================================================================
// CORE ENTITIES
// ============================================================================

export interface Campaign {
  user_id?: number;
  xid?: number;
  name: string;
  created_at?: string;
}

export interface ProfileDomain {
  domain: string;
  country: string;
}

export interface UserProfile {
  user_id: number;
  currency: string;
  fixed_pay: number;
  rev_share: number;
  created_at: string;
  username: string;
  domains: ProfileDomain[];
  country: string;
  is_manager: boolean;
}

export type AffiliateProfile = UserProfile;

// ============================================================================
// AFFILIATE LINKS
// ============================================================================

export interface AffiliateLink {
  xid: number;
  userId: number;
  domain: string;
  landingPage: string;
  campaignId: number;
  campaignName: string;
  generatedLink: string;
  createdAt: string;
}

export interface AffiliateLinkFormData {
  domain: string;
  landingPage: string;
  campaign: string;
}

export interface AffiliateLinkCreateRequest {
  domain: string;
  landing_page: string;
  campaign_id: number;
}

export type CreateAffiliateLinkRequest = AffiliateLinkCreateRequest;

export interface AffiliateLinkApiResponse {
  url: string;
  user_id: number;
  xid: number;
  domain: string;
  landing_page: string;
  campaign_id: number;
  created_at: string;
}

// Alias for backward compatibility
export type AffiliateLinkResponse = AffiliateLinkApiResponse;

export interface UpdateAffiliateLinkRequest {
  domain?: string;
  landing_page?: string;
  campaign_id?: number;
}

// ============================================================================
// PROMO CODES
// ============================================================================

export interface PromoCode {
  xid: number;
  userId: number;
  code: string;
  campaignId: number;
  campaignName: string;
  status: string;
  createdAt: string;
}

export interface PromoCodeFormData {
  campaign: string;
  code: string;
}

export interface PromoCodeCreateRequest {
  code: string;
  campaign_id: number;
}

// Alias for backward compatibility
export type CreatePromoCodeRequest = PromoCodeCreateRequest;

export interface PromoCodeApiResponse {
  user_id: number;
  xid: number;
  code: string;
  campaign_id: number;
  created_at: string;
  status: string;
}

// Alias for backward compatibility
export type PromoCodeResponse = PromoCodeApiResponse;

// Additional promo code interface from service
export interface PromoCodeRequest {
  code: string;
  campaign_id: number;
}

// ============================================================================
// CAMPAIGN MANAGEMENT
// ============================================================================

export interface CampaignCreateRequest {
  name: string;
}

// Alias for backward compatibility
export type CreateCampaignRequest = CampaignCreateRequest;

export interface CampaignOption {
  value: string;
  label: string;
}

export interface DomainOption {
  value: string;
  label: string;
}

// ============================================================================
// SUMMARY & STATISTICS
// ============================================================================

export interface AffiliateSummary {
  currency: string;
  yesterday: number;
  last_30_days: number;
  this_month: number;
  all_time: number;
  paid: number;
  last_paid_at: string;
}

// ============================================================================
// REPORTS
// ============================================================================

export interface QuickReportParams {
  links?: number[];
  promos?: number[];
  start: string;
  end: string;
}

export interface QuickReportResponse {
  currency: string;
  new_account_count: number;
  new_account_with_deposit_count: number;
  new_deposit_count: number;
  new_deposit_sum: number;
  new_deposit_account_count: number;
  deposit_sum: number;
  deposit_count: number;
  deposit_account_count: number;
  active_account_count: number;
  commission: number;
}

// ============================================================================
// REFERRALS
// ============================================================================

export interface ReferralData {
  user_id: number;
  username: string;
  created_at: string;
  commission: number;
  currency: string;
}

export interface ReferralParams {
  limit?: number;
  dir?: 'asc' | 'desc';
  page?: number;
  date_from?: string;
  date_to?: string;
}

// ============================================================================
// STATUS ENUMS
// ============================================================================

export enum PromoCodeStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DECLINED = 'declined',
  ACTIVE = 'active'
}

export type PromoCodeStatusType = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'declined' 
  | 'active';

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface ResourceManagerState<TResource> {
  resourceItems: TResource[];
  isLoadingResources: boolean;
  isLoadingCampaigns: boolean;
  isGeneratingResource: boolean;
  isAnyLoading: boolean;
  isCampaignModalOpen: boolean;
}

export interface FormState<TFormData> {
  formData: TFormData;
  isFormValid: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface SelectOption {
  value: string;
  label: string;
}

export interface BaseResource {
  xid: number;
  userId: number;
  campaignId: number;
  campaignName: string;
  createdAt: string;
}

export interface BaseApiResponse {
  xid: number;
  user_id: number;
  campaign_id: number;
  created_at: string;
}

export interface BaseFormData {
  campaign: string;
}

// ============================================================================
// SERVICE TYPES
// ============================================================================

export interface ResourceService<TApiResponse, TCreateRequest> {
  getAll: () => Promise<TApiResponse[]>;
  create: (request: TCreateRequest) => Promise<TApiResponse>;
  createCampaign?: (request: CampaignCreateRequest) => Promise<Campaign>;
}

export interface ResourceManagerConfig<TResource, TFormData, TApiResponse, TCreateRequest> {
  resourceService: ResourceService<TApiResponse, TCreateRequest>;
  initialFormData: TFormData;
  transformApiResponse: (apiResponse: TApiResponse, campaigns: Campaign[]) => TResource;
  buildCreateRequest: (formData: TFormData, campaigns: Campaign[]) => TCreateRequest;
  validateForm: (formData: TFormData) => string | null;
  resourceName: string;
  resourceNameSingular: string;
}

// ============================================================================
// TABLE COLUMN TYPES
// ============================================================================

export interface ColumnConfig {
  accessorKey: string;
  header: string;
  size?: number;
  minSize?: number;
  maxSize?: number;
}

export interface ActionButtonConfig {
  icon: string;
  title: string;
  onClick: () => void;
  className?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult = string | null;

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface ResourceFormCardProps<TFormData> {
  title: string;
  formData: TFormData;
  updateFormValue: (field: keyof TFormData, value: string) => void;
  onSubmit: () => Promise<void>;
  loading: boolean;
  disabled: boolean;
  submitLabel: string;
  onCreateCampaign: () => void;
  children?: React.ReactNode;
}

export interface ResourceTableProps<TResource> {
  title: string;
  items: TResource[];
  columns: any[]; // ColumnDef from @tanstack/react-table
  loading: boolean;
  emptyMessage: string;
  emptyIcon: string;
  searchPlaceholder: string;
}

export interface ResourcePageSkeletonProps {
  formFields?: number;
  showPreview?: boolean;
  tableColumns?: number;
  tableRows?: number;
}

// ============================================================================
// HOOK RETURN TYPES
// ============================================================================

export interface UseResourceManagerReturn<TResource, TFormData> {
  resourceItems: TResource[];
  campaigns: Campaign[];
  campaignOptions: SelectOption[];
  
  // Loading states
  isLoadingResources: boolean;
  isLoadingCampaigns: boolean;
  isGeneratingResource: boolean;
  isAnyLoading: boolean;
  
  // Form management
  formData: TFormData;
  updateFormValue: (field: keyof TFormData, value: string) => void;
  resetForm: () => void;
  isFormValid: boolean;
  
  // Actions
  generateResource: () => Promise<TResource>;
  loadResourceData: () => Promise<void>;
  handleCampaignCreated: (newCampaign: Campaign) => void;
  createCampaign: (campaignData: CampaignCreateRequest) => Promise<Campaign>;
  
  // Modal management
  isCampaignModalOpen: boolean;
  openCampaignModal: () => void;
  closeCampaignModal: () => void;
  
  // Utilities
  toast: any; // Toast utility from UI library
  resourceName: string;
  resourceNameSingular: string;
}

// ============================================================================
// LAYOUT TYPES
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
// FILTER TYPES
// ============================================================================

export interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'text' | 'date' | 'dual-input' | 'datetime-local';
  options?: string[];
  placeholder?: string;
  className?: string;
}

// ============================================================================
// STAT CARD TYPES
// ============================================================================

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  bgColor: string;
}

// ============================================================================
// RESOURCE MANAGER HOOK TYPES
// ============================================================================

export interface ResourceHookResult {
  data: any[];
  isLoading: boolean;
  error?: any;
  mutate: () => Promise<any>;
  isValidating?: boolean;
}

export interface ResourceConfig<TResource, TFormData> {
  resourceType: string;
  service: any;
  initialFormData: TFormData;
  transform: (item: any, campaigns: Campaign[]) => TResource;
  buildRequest: (formData: TFormData, campaigns: Campaign[]) => any;
  validate: (formData: TFormData) => string | null;
}