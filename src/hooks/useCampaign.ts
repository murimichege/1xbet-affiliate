import { useState, useEffect } from 'react';
import affiliateService, { Campaign, CreateCampaignRequest } from '@/services/affiliateService';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await affiliateService.campaigns.getAll();
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load campaigns');
      console.error('Error loading campaigns:', err);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData: CreateCampaignRequest): Promise<Campaign> => {
    try {
      const newCampaign = await affiliateService.campaigns.create(campaignData);
      setCampaigns(prev => [newCampaign, ...prev]);
      return newCampaign;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    error,
    createCampaign,
    refetch: loadCampaigns
  };
};