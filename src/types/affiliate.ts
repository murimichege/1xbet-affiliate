export interface AffiliateLink {
    id: string;
    website: string;
    landingPage: string;
    subId: string;
    campaign: string;
    generatedLink: string;
    currency: string;
    status: 'active' | 'hidden';
    clicks?: number;
    conversions?: number;
    createdAt: string;
  }
  
  export interface LinkGenerationForm {
    website: string;
    currency: string;
    campaign: string;
    landingPage: string;
    subId?: string;
  }