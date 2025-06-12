import React, { useState } from 'react';
import { AffiliateLinkPageLayout } from '@/components/layouts/AffiliatesResourceLayout';
import { ReportFilters, PreviewUrl } from '@/components/filters/FilterOptions';
import { affiliateLinkColumns } from '@/components/common/Datatable/tableColumns';
import { useResourceManager } from '@/hooks/useResourceManager';

const AffiliateLinksPage: React.FC = () => {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  
  const {
    resources,
    userProfile,
    loading,
    generating,
    formData,
    isValid,
    filterFields,
    updateField,
    generate,
    createCampaign
  } = useResourceManager('affiliate-links');

  const formFieldsComponent = (
    <ReportFilters 
      filters={formData} 
      onFilterChange={updateField} 
      fields={filterFields} 
      isLoading={generating} 
    >
      <PreviewUrl 
        domain={formData?.domain || ''} 
        landingPage={formData?.landingPage || ''} 
      />
    </ReportFilters>
  );

  const handleCreateCampaign = () => {
    setIsCampaignModalOpen(true);
  };

  const handleCloseCampaignModal = () => {
    setIsCampaignModalOpen(false);
  };

  const handleCampaignCreated = () => {
    setIsCampaignModalOpen(false);
    // The cache will be updated automatically by the hook
  };

  return (
    <AffiliateLinkPageLayout
      resources={resources}
      userProfile={userProfile}
      isLoading={loading}
      isGenerating={generating}
      formData={formData}
      isFormValid={isValid}
      formFields={formFieldsComponent}
      onGenerate={generate}
      onCreateCampaign={handleCreateCampaign}
      columns={affiliateLinkColumns}
      isCampaignModalOpen={isCampaignModalOpen}
      onCloseCampaignModal={handleCloseCampaignModal}
      onCampaignCreated={handleCampaignCreated}
      createCampaign={createCampaign}
    />
  );
};

export default AffiliateLinksPage;