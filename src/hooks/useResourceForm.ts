import { useState, useMemo, useCallback } from 'react';
import { useToast } from '@/components/ui';
import { useCampaigns } from './useSWR';
import { formatCampaignOptions } from '@/utils/formatters';
import type { 
  ResourceConfig, 
  ResourceHookResult 
} from '@/types/affiliate';

export const useResourceForm = <TResource, TFormData>(
  config: ResourceConfig<TResource, TFormData>,
  useResourceHook: () => ResourceHookResult
) => {
  const toast = useToast();
  
  // STATIC DATA: Campaigns (cached for 30 minutes, only updated manually)
  const { 
    data: campaigns = [], 
    isLoading: campaignsLoading, 
    mutate: mutateCampaigns 
  } = useCampaigns();
  
  // DYNAMIC DATA: Resource data (cached for 5 minutes, updated frequently)
  const { 
    data: resourceData = [], 
    isLoading: resourceLoading, 
    mutate: mutateResources 
  } = useResourceHook();
  
  const [formData, setFormData] = useState<TFormData>(config.initialFormData);
  const [generating, setGenerating] = useState(false);

  // Transform resources (memoized with campaigns dependency)
  const transformedResources = useMemo(() => {
    if (!Array.isArray(resourceData) || !Array.isArray(campaigns)) return [];
    return resourceData.map(item => config.transform(item, campaigns));
  }, [resourceData, campaigns, config.transform]);

  // Campaign options (memoized, only changes when campaigns change)
  const campaignOptions = useMemo(() => 
    formatCampaignOptions(campaigns), [campaigns]);

  // Update form field
  const updateField = useCallback((key: keyof TFormData, value: TFormData[keyof TFormData]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  // Generate resource with optimized cache updates
  const generate = useCallback(async () => {
    const validationError = config.validate(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setGenerating(true);
      const request = config.buildRequest(formData, campaigns);
      const response = await config.service.create(request);
      
      // OPTIMISTIC UPDATE: Only refresh resource data, not campaigns
      await mutateResources();
      
      // Reset form to initial state
      setFormData(config.initialFormData);
      
      // Show success message
      const resourceName = config.resourceType.replace('-', ' ');
      toast.success(`${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} generated successfully!`);
      
      return config.transform(response, campaigns);
    } catch (error: any) {
      const resourceName = config.resourceType.replace('-', ' ');
      toast.error(error?.message || `Failed to generate ${resourceName}`);
      throw error;
    } finally {
      setGenerating(false);
    }
  }, [formData, campaigns, config, toast, mutateResources]);

  // Create campaign (separate function that updates campaigns cache)
  const createCampaign = useCallback(async (campaignData: any) => {
    try {
      const newCampaign = await config.service.createCampaign?.(campaignData);
      
      // 🎯 MANUALLY UPDATE CAMPAIGNS CACHE: Only when campaigns actually change
      await mutateCampaigns();
      
      return newCampaign;
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create campaign');
      throw error;
    }
  }, [config.service, mutateCampaigns, toast]);

  // Form validation (memoized)
  const isValid = useMemo(() => config.validate(formData) === null, [formData, config.validate]);

  return {
    resources: transformedResources,
    campaigns,
    campaignOptions,
    formData,
    updateField,
    generate,
    createCampaign,
    loading: resourceLoading || campaignsLoading,
    generating,
    isValid,
    // Expose cache utilities for manual refresh if needed
    refreshCampaigns: mutateCampaigns,
    refreshResources: mutateResources,
  };
};