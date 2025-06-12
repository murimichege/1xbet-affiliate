import React, { useState } from 'react';
import { PromoCodePageLayout } from '@/components/layouts/AffiliatesResourceLayout';
import { ReportFilters } from '@/components/filters/FilterOptions';
import { promoCodeColumns } from '@/components/common/Datatable/tableColumns';
import { useResourceManager } from '@/hooks/useResourceManager';

const PromoCodesPage: React.FC = () => {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  
  const {
    resources,
    loading,
    generating,
    formData,
    isValid,
    filterFields,
    updateField,
    generate,
    createCampaign
  } = useResourceManager('promo-codes');

  const formFieldsComponent = (
    <ReportFilters 
      filters={formData} 
      onFilterChange={updateField} 
      fields={filterFields} 
      isLoading={generating} 
    />
  );

  const handleCreateCampaign = () => {
    setIsCampaignModalOpen(true);
  };

  const handleCloseCampaignModal = () => {
    setIsCampaignModalOpen(false);
  };

  const handleCampaignCreated = () => {
    setIsCampaignModalOpen(false);
  };

  return (
    <PromoCodePageLayout
      resources={resources}
      isLoading={loading}
      isGenerating={generating}
      formData={formData}
      isFormValid={isValid}
      formFields={formFieldsComponent}
      onGenerate={generate}
      onCreateCampaign={handleCreateCampaign}
      columns={promoCodeColumns}
      isCampaignModalOpen={isCampaignModalOpen}
      onCloseCampaignModal={handleCloseCampaignModal}
      onCampaignCreated={handleCampaignCreated}
      createCampaign={createCampaign}
    />
  );
};

export default PromoCodesPage;