import { Campaign } from '@/types/affiliate';

export const findCampaignById = (campaigns: Campaign[], campaignId: string): Campaign | undefined => {
  if (!Array.isArray(campaigns)) return undefined;
  return campaigns.find(c => 
    c.xid?.toString() === campaignId || c.name === campaignId
  );
};

export const transformCampaignOptions = (campaigns: Campaign[]) => {
  if (!Array.isArray(campaigns)) return [];
  return campaigns.map(c => ({ 
    value: c.xid?.toString() || c.name, 
    label: c.name 
  }));
};

export const generateBtag = (xid: string | number, code: string) => {
  return `d_${xid}m_1599c_${code}`;
};

export const generateAffiliateLink = (xid: string | number) => {
  return `https://refpa3267686.top/L?tag=d_${xid}m_1599c_&site=${xid}&ad=1599`;
};

export const ensureArray = <T>(data: T | T[]): T[] => {
  return Array.isArray(data) ? data : [];
};