import { useState } from 'react';

export interface ReportData {
  websiteId: string;
  website: string;
  registrations: number;
  newDepositors: number;
  totalDepositAmount: number;
  bonusAmount: number;
  companyProfit: number;
  commissionAmount: number;
}

export interface ReportFilters {
  currency: string;
  website: string;
  marketingToolId: string;
  timeInterval: string;
  dateFrom: string;
  dateTo: string;
  registrationSource: string;
}

export const useReportData = () => {
  const [reportData, setReportData] = useState<ReportData[]>([]);

  const generateMockReportData = async (): Promise<ReportData[]> => {
    // make a fake API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData: ReportData[] = [
      {
        websiteId: '4429642',
        website: 'https://africa.espn.com/',
        registrations: 120,
        newDepositors: 45,
        totalDepositAmount: 56000,
        bonusAmount: 8000,
        companyProfit: 15000,
        commissionAmount: 5000
      },
      {
        websiteId: '4429643',
        website: 'https://sportsnews.com',
        registrations: 98,
        newDepositors: 30,
        totalDepositAmount: 42000,
        bonusAmount: 6000,
        companyProfit: 11000,
        commissionAmount: 3000
      }
    ];
    
    return mockData;
  };

  return {
    reportData,
    setReportData,
    generateMockReportData
  };
};