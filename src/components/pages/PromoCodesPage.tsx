import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { TableColumn } from '@/types/common';
import { PromoCode, PromoCodeForm } from '@/types/promo';
import { copyToClipboard, generateId } from '@/utils/helpers';
import { 
  PROMO_CODES, 
  WEBSITE_URLS, 
  CURRENCIES, 
  CAMPAIGNS 
} from '@/data/dummyData';

interface PromoCodesPageProps {
  darkMode: boolean;
}

const PromoCodesPage: React.FC<PromoCodesPageProps> = ({ darkMode }) => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(PROMO_CODES);
  const [formData, setFormData] = useState<PromoCodeForm>({
    website: 'https://www.facebook.com/',
    currency: 'USD',
    campaign: 'World Wide',
    customCode: ''
  });
  const [loading, setLoading] = useState(false);

  const promoColumns: TableColumn<PromoCode>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: 'w-24',
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'website',
      header: 'Website',
      sortable: true,
      render: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 truncate">
          {value}
        </a>
      )
    },
    {
      key: 'currency',
      header: 'Currency',
      sortable: true,
      width: 'w-20',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'promoCode',
      header: 'Promo code',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <span className="font-mono font-semibold text-blue-600">{value}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => copyToClipboard(value)}
            title="Copy promo code"
          >
            <Icon name="fas fa-copy" />
          </Button>
        </div>
      ),
    },
    {
      key: 'btag',
      header: 'BTAG',
      sortable: false,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="max-w-32 truncate font-mono text-sm" title={value}>
            {value}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => copyToClipboard(value)}
            title="Copy BTAG"
          >
            <Icon name="fas fa-copy" />
          </Button>
        </div>
      ),
    },
    {
      key: 'usage',
      header: 'Usage',
      sortable: true,
      width: 'w-32',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>{value || 0}</span>
            <span className="text-gray-500">/ {row.maxUsage || '∞'}</span>
          </div>
          <div className={`w-full bg-gray-200 rounded-full h-2`}>
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${row.maxUsage ? Math.min((value || 0) / row.maxUsage * 100, 100) : 0}%` 
              }}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      width: 'w-32',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant={row.isActive ? "secondary" : "primary"}
            onClick={() => handleTogglePromoCode(row.id)}
          >
            <Icon name={row.isActive ? 'fas fa-pause' : 'fas fa-play'} className="mr-1" />
            {row.isActive ? 'Pause' : 'Activate'}
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => handleEditPromoCode(row)}
          >
            <Icon name="fas fa-edit" />
          </Button>
        </div>
      ),
    },
  ];

  const handleGeneratePromoCode = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPromoCode: PromoCode = {
        id: generateId(),
        website: formData.website,
        currency: formData.currency,
        promoCode: formData.customCode || `1x_${generateId()}`,
        btag: `d_${generateId()}m_1599c_${formData.customCode || generateId()}`,
        campaign: formData.campaign,
        usage: 0,
        maxUsage: 1000,
        isActive: true,
        createdAt: new Date().toISOString()
      };

      setPromoCodes(prev => [newPromoCode, ...prev]);
      
      // Reset form
      setFormData({
        website: 'https://www.facebook.com/',
        currency: 'USD',
        campaign: 'World Wide',
        customCode: ''
      });
    } catch (error) {
      console.error('Error generating promo code:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePromoCode = (promoId: string) => {
    setPromoCodes(prev => 
      prev.map(promo => 
        promo.id === promoId 
          ? { ...promo, isActive: !promo.isActive }
          : promo
      )
    );
  };

  const handleEditPromoCode = (promoCode: PromoCode) => {
    setFormData({
      website: promoCode.website,
      currency: promoCode.currency,
      campaign: promoCode.campaign || 'World Wide',
      customCode: promoCode.promoCode
    });
  };

  const updateFormData = (key: keyof PromoCodeForm, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Promo Code Generation Form */}
      <Card darkMode={darkMode} padding="md">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Generate Promo Code
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                label="Website"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                options={WEBSITE_URLS}
                darkMode={darkMode}
              />
              
              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => updateFormData('currency', e.target.value)}
                options={CURRENCIES}
                darkMode={darkMode}
              />
              
              <Select
                label="Campaign"
                value={formData.campaign}
                onChange={(e) => updateFormData('campaign', e.target.value)}
                options={CAMPAIGNS}
                darkMode={darkMode}
              />
              
              <Input
                label="Custom Code"
                type="text"
                value={formData.customCode}
                onChange={(e) => updateFormData('customCode', e.target.value)}
                placeholder="Optional custom code"
                darkMode={darkMode}
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <Button 
              className="w-full" 
              icon="fas fa-plus"
              onClick={handleGeneratePromoCode}
              loading={loading}
            >
              GENERATE PROMO CODE
            </Button>
          </div>
        </div>
      </Card>

      {/* Promo Codes Table */}
      <Card darkMode={darkMode} className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Generated Promo Codes
          </h3>
          <div className="text-sm text-gray-500">
           5 items selected
         </div>
       </div>
       
       <div className="p-6">
         <DataTable
           data={promoCodes}
           columns={promoColumns}
           darkMode={darkMode}
           emptyMessage="No promo codes found"
           enableSelection={true}
         />
       </div>
     </Card>

     {/* Information Cards */}
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card darkMode={darkMode} padding="md">
         <div className="flex items-start space-x-4">
           <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
             <Icon name="fas fa-question-circle" color="#2563EB" size="xl" />
           </div>
           <div>
             <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
               What are promo codes for?
             </h3>
             <div className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
               <p>
                 Customers can enter a promo code while registering on the website which links 
                 them to you automatically.
               </p>
               <p>
                 In which case, there is no need for new customers to follow an affiliate link 
                 to the website.
               </p>
               <div className="mt-6">
                 <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                   How to get a promo code?
                 </h4>
                 <p>
                   Select a currency and campaign and click "Generate Promo Code". Several promo 
                   codes can be generated. If you want a personal promo code, please contact the 
                   Partner Support team.
                 </p>
               </div>
             </div>
           </div>
         </div>
       </Card>

       <Card darkMode={darkMode} padding="md">
         <div className="flex items-start space-x-4">
           <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
             <Icon name="fas fa-gift" color="#16A34A" size="xl" />
           </div>
           <div>
             <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
               A bonus for registering using a promo code
             </h3>
             <div className={`space-y-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
               <p>
                 Speak to your manager to find out more about the bonuses awarded when your 
                 players register using a promo code.
               </p>
               <div className="mt-6">
                 <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                   The benefits of using a promo code
                 </h4>
                 <ul className="list-disc pl-5 space-y-2">
                   <li>
                     A promo code can be used where it is impossible to place a referral link 
                     or an advert for goods/services (e.g. on Instagram, in videos, offline advertising, etc.)
                   </li>
                   <li>
                     When a customer uses a promo code to sign up, they receive a higher bonus 
                     and are therefore motivated to use it
                   </li>
                   <li>
                     Promo codes do not expire. A referred customer can pass the code on to 
                     others, and the more customers join, the higher your income
                   </li>
                 </ul>
               </div>
             </div>
           </div>
         </div>
       </Card>
     </div>

     {/* Promo Code Stats */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
       <Card darkMode={darkMode} padding="md">
         <div className="flex items-center space-x-4">
           <div className="bg-purple-100 p-3 rounded-lg">
             <Icon name="fas fa-tags" color="#9333EA" size="xl" />
           </div>
           <div>
             <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
               {promoCodes.length}
             </p>
             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
               Total Codes
             </p>
           </div>
         </div>
       </Card>

       <Card darkMode={darkMode} padding="md">
         <div className="flex items-center space-x-4">
           <div className="bg-green-100 p-3 rounded-lg">
             <Icon name="fas fa-play" color="#16A34A" size="xl" />
           </div>
           <div>
             <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
               {promoCodes.filter(p => p.isActive).length}
             </p>
             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
               Active Codes
             </p>
           </div>
         </div>
       </Card>

       <Card darkMode={darkMode} padding="md">
         <div className="flex items-center space-x-4">
           <div className="bg-blue-100 p-3 rounded-lg">
             <Icon name="fas fa-users" color="#2563EB" size="xl" />
           </div>
           <div>
             <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
               {promoCodes.reduce((sum, code) => sum + (code.usage || 0), 0)}
             </p>
             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
               Total Usage
             </p>
           </div>
         </div>
       </Card>

       <Card darkMode={darkMode} padding="md">
         <div className="flex items-center space-x-4">
           <div className="bg-orange-100 p-3 rounded-lg">
             <Icon name="fas fa-chart-bar" color="#EA580C" size="xl" />
           </div>
           <div>
             <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
               12.5%
             </p>
             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
               Conversion Rate
             </p>
           </div>
         </div>
       </Card>
     </div>
   </div>
 );
};

export default PromoCodesPage;