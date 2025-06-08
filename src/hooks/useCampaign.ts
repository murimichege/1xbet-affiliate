import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { useCampaign } from '@/hooks/useCampaign';

export const useCampaignOperations = (onCampaignCreated?: (campaign: any) => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { campaigns, createCampaign: createCampaignHook, loading: campaignsLoading } = useCampaign();
  
  const {
    values: campaignForm,
    updateValue: updateCampaignValue,
    reset: resetCampaignForm,
    validate: validateCampaign
  } = useForm({ name: '' });

  const { execute: createCampaign, loading: creatingCampaign } = useAsyncAction(async () => {
    if (!validateCampaign() || !campaignForm.name.trim()) {
      throw new Error('Campaign name is required');
    }

    const newCampaign = await createCampaignHook({
      name: campaignForm.name.trim()
    });
    
    if (onCampaignCreated) {
      onCampaignCreated(newCampaign);
    }
    
    setIsModalOpen(false);
    resetCampaignForm();
    
    return newCampaign;
  });

  return {
    campaigns,
    campaignsLoading,
    isModalOpen,
    setIsModalOpen,
    campaignForm,
    updateCampaignValue,
    createCampaign,
    creatingCampaign
  };
};