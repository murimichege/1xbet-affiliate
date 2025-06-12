import React from 'react';
import { PageSkeleton } from '@/components/ui/Loader';
import { CampaignModal } from '@/components/ui/Modal';
import { NoDataMessage } from './NoDataMessage';
import { ResourceForm } from './ResourceForm';
import { ResourceTable } from './ResourceTable';
import { LAYOUT_CONFIGS } from './config';
import type { 
  AffiliateLinkLayoutProps, 
  PromoCodeLayoutProps,
  BaseLayoutProps,
  ResourceLayoutConfig
} from './types';
import type { UserProfile } from '@/types/affiliate';

// UTILITIES

const generateUserInfo = (userProfile: UserProfile | null | undefined): React.ReactNode => {
  if (!userProfile) return null;
  
  return (
    <p className="text-sm text-gray-500 mt-1">
      Account: {userProfile.username} | Currency: {userProfile.currency}
    </p>
  );
};

const checkDomainRequirement = (
  userProfile: UserProfile | null | undefined, 
  isLoading: boolean, 
  config: ResourceLayoutConfig
): boolean => {
  return !isLoading && 
         config.requiresDomains && 
         userProfile != null && // This handles both null and undefined
         (!userProfile.domains || userProfile.domains.length === 0);
};

// ============================================================================
// BASE LAYOUT COMPONENT
// ============================================================================

const BaseLayout = <TResource, TFormData>({
  resourceType,
  userProfile,
  resources,
  isLoading,
  isGenerating,
  isFormValid,
  formFields,
  onGenerate,
  onCreateCampaign,
  columns,
  isCampaignModalOpen,
  onCloseCampaignModal,
  onCampaignCreated,
  createCampaign,
  className = ""
}: BaseLayoutProps<TResource, TFormData>) => {
  
  const config = LAYOUT_CONFIGS[resourceType];
  
  if (!config) {
    throw new Error(`Unknown resource type: ${resourceType}`);
  }

  // Show loading skeleton
  if (isLoading) {
    return <PageSkeleton />;
  }

  // Check domain requirement for affiliate links
  if (checkDomainRequirement(userProfile, isLoading, config)) {
    return (
      <NoDataMessage 
        title={config.noDomainMessage!.title}
        message={config.noDomainMessage!.message}
      />
    );
  }

  const userInfo = config.requiresDomains ? generateUserInfo(userProfile) : undefined;

  const handleGenerate = async (): Promise<void> => {
    try {
      await onGenerate();
    } catch (error) {
      console.error('Failed to generate resource:', error);
      // Error handling is done in the hook level
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <ResourceForm
        title={config.title}
        userInfo={userInfo}
        formFields={formFields}
        onGenerate={handleGenerate}
        onCreateCampaign={onCreateCampaign}
        isGenerating={isGenerating}
        isFormValid={isFormValid}
        generateButtonText={config.generateButtonText}
      />

      <ResourceTable
        resources={resources}
        columns={columns}
        tableTitle={config.tableTitle}
        emptyMessage={config.emptyMessage}
        emptyIcon={config.emptyIcon}
        searchPlaceholder={config.searchPlaceholder}
      />

      <CampaignModal
        isOpen={isCampaignModalOpen}
        onClose={onCloseCampaignModal}
        onCampaignCreated={onCampaignCreated}
        createCampaign={createCampaign}
      />
    </div>
  );
};

// ============================================================================
// SPECIFIC LAYOUT EXPORTS
// ============================================================================

export const AffiliateLinkPageLayout = <TResource, TFormData>(
  props: AffiliateLinkLayoutProps<TResource, TFormData>
): React.ReactElement => (
  <BaseLayout
    {...props}
    resourceType="affiliate-links"
  />
);

export const PromoCodePageLayout = <TResource, TFormData>(
  props: PromoCodeLayoutProps<TResource, TFormData>
): React.ReactElement => (
  <BaseLayout
    {...props}
    resourceType="promo-codes"
    userProfile={undefined}
  />
);

// ============================================================================
// GENERIC LAYOUT EXPORT
// ============================================================================

export const ResourcePageLayout = <TResource, TFormData>(
  props: BaseLayoutProps<TResource, TFormData>
): React.ReactElement => <BaseLayout {...props} />;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { 
  BaseResourceProps,
  AffiliateLinkLayoutProps,
  PromoCodeLayoutProps,
  BaseLayoutProps,
  ResourceLayoutConfig
} from './types';