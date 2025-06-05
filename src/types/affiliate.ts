export interface AffiliateLink {
    status: string;
    id: string;
    website: string;
    landingPage: string;
    campaign: string;
    generatedLink: string;
    currency: string;
    clicks?: number;
    conversions?: number;
    createdAt: string;
  }
  
  export interface LinkGenerationForm {
    website: string;
    currency: string;
    campaign: string;
    landingPage: string;
  }