import React from 'react';
import { Card, Button } from '@/components/ui';

interface ResourceFormProps {
  title: string;
  userInfo?: React.ReactNode;
  formFields: React.ReactNode;
  onGenerate: () => void;
  onCreateCampaign: () => void;
  isGenerating: boolean;
  isFormValid: boolean;
  generateButtonText: string;
  className?: string;
}

export const ResourceForm: React.FC<ResourceFormProps> = ({
  title,
  userInfo,
  formFields,
  onGenerate,
  onCreateCampaign,
  isGenerating,
  isFormValid,
  generateButtonText,
  className = ""
}) => (
  <Card padding="md" className={className}>
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {userInfo}
    </div>

    <div className="space-y-4">
      {formFields}
      
      <div className="flex gap-2 pt-2">
        <Button 
          icon="fas fa-plus"
          onClick={onGenerate}
          loading={isGenerating}
          disabled={isGenerating || !isFormValid}
          className="min-w-[200px]"
        >
          {isGenerating ? 'GENERATING...' : generateButtonText}
        </Button>
        
        <Button 
          variant="secondary" 
          icon="fas fa-bullhorn" 
          onClick={onCreateCampaign}
          className="min-w-[150px]"
        >
          New Campaign
        </Button>
      </div>
    </div>
  </Card>
);