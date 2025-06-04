export interface PromoCode {
    id: string;
    website: string;
    currency: string;
    promoCode: string;
    btag: string;
    campaign?: string;
    usage?: number;
    maxUsage?: number;
    expiryDate?: string;
    isActive: boolean;
    createdAt: string;
  }
  
  export interface PromoCodeForm {
    website: string;
    currency: string;
    campaign: string;
    customCode?: string;
  }