import { useState } from 'react';

export interface PlayerReportData {
  websiteId: string;
  website: string;
  playerId: string;
  registrationDate: string;
  country: string;
  sumOfAllDeposits: number;
  companyProfit: number;
}

export interface PlayerReportFilters {
  currency: string;
  country: string;
  marketingToolId: string;
  website: string;
  timeInterval: string;
  campaign: string;
  playerId: string;
  registrationSource: string;
  dateFrom?: string;
  dateTo?: string;
}

export const usePlayerReportData = () => {
  const [playerData, setPlayerData] = useState<PlayerReportData[]>([]);

  const generateMockPlayerData = async (filters: PlayerReportFilters): Promise<PlayerReportData[]> => {
    // Simulate a fake API call with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockData: PlayerReportData[] = [
      {
        websiteId: '4429642',
        website: 'https://africa.espn.com/',
        playerId: 'KE-001',
        registrationDate: '2025-06-01',
        country: 'Kenya',
        sumOfAllDeposits: 54000,
        companyProfit: 13500
      },
      {
        websiteId: '4429643',
        website: 'https://sportsnews.com',
        playerId: 'KE-002',
        registrationDate: '2025-06-02',
        country: 'Kenya',
        sumOfAllDeposits: 32000,
        companyProfit: 7500
      },
      {
        websiteId: '4429644',
        website: 'https://betanalysis.com',
        playerId: 'KE-003',
        registrationDate: '2025-06-03',
        country: 'Kenya',
        sumOfAllDeposits: 71500,
        companyProfit: 20000
      },
      {
        websiteId: '4429642',
        website: 'https://mysite.com',
        playerId: 'KE-004',
        registrationDate: '2025-06-03',
        country: 'Kenya',
        sumOfAllDeposits: 28000,
        companyProfit: 6700
      },
      {
        websiteId: '4429643',
        website: 'https://sportsnews.com',
        playerId: 'KE-005',
        registrationDate: '2025-06-04',
        country: 'Kenya',
        sumOfAllDeposits: 89000,
        companyProfit: 22500
      }
    ];
    
    // Apply basic filtering to simulate real API behavior
    let filteredData = mockData;
    
    if (filters.playerId) {
      filteredData = filteredData.filter(player => 
        player.playerId.toLowerCase().includes(filters.playerId.toLowerCase())
      );
    }
    
    if (filters.website && filters.website !== 'All') {
      filteredData = filteredData.filter(player => player.website === filters.website);
    }
    
    if (filters.country && filters.country !== 'Select...') {
      filteredData = filteredData.filter(player => player.country === filters.country);
    }
    
    return filteredData;
  };

  const clearPlayerData = () => setPlayerData([]);

  return {
    playerData,
    setPlayerData,
    generateMockPlayerData,
    clearPlayerData
  };
};