import React from 'react';
import { Button, Input } from '@/components/ui';
import { useForm } from '@/hooks/useForm';
import { useAsyncAction } from '@/hooks/useAsyncAction';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCampaignCreated: (campaign: any) => void;
  createCampaign: (data: { name: string }) => Promise<any>;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  onCampaignCreated,
  createCampaign
}) => {
  const {
    values: campaignForm,
    updateValue: updateCampaignValue,
    reset: resetCampaignForm,
    validate: validateCampaign
  } = useForm({ name: '' });

  const { execute: handleCreateCampaign, loading: creatingCampaign } = useAsyncAction(async () => {
    if (!validateCampaign() || !campaignForm.name.trim()) {
      throw new Error('Campaign name is required');
    }

    const newCampaign = await createCampaign({
      name: campaignForm.name.trim()
    });
    
    onCampaignCreated(newCampaign);
    onClose();
    resetCampaignForm();
    
    return newCampaign;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
        <button 
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" 
          onClick={onClose}
        >
          <i className="fas fa-times text-lg"></i>
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
        
        <div className="space-y-4">
          <Input
            label="Campaign Name"
            type="text"
            value={campaignForm.name}
            onChange={(e) => updateCampaignValue('name', e.target.value)}
            placeholder="Enter campaign name"
          />
          
          <div className="flex justify-end pt-4">
            <Button 
              icon="fas fa-paper-plane" 
              onClick={handleCreateCampaign} 
              loading={creatingCampaign}
              disabled={creatingCampaign || !campaignForm.name.trim()}
              size="sm"
            >
              {creatingCampaign ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};