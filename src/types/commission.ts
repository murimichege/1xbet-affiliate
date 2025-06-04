export interface CommissionStructure {
    id: string;
    currency: string;
    structure: string;
    groupName: string;
    startDate: string;
    endDate: string;
    description: string;
    percentage?: number;
    isActive: boolean;
  }
  
  export type CommissionType = 'Referral' | 'Revenue Share' | 'CPA' | 'Hybrid';
  export type Currency = 'USD' | 'EUR' | 'GBP' | 'BTC';