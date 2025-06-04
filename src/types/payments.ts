export interface PaymentRecord {
    id: string;
    currency: string;
    date: string;
    payout: number;
    revenue: number;
    balance: number;
    status: PaymentStatus;
    method?: string;
    transactionId?: string;
  }
  
  export type PaymentStatus = 
    | 'Pending'
    | 'Processing'
    | 'Completed'
    | 'Failed'
    | 'Cancelled';
  
  export interface PaymentRequest {
    amount: number;
    currency: string;
    method: string;
    notes?: string;
  }