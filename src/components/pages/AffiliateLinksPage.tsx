import React, { useState } from 'react';
import {  TabNavigation } from '@/components/common';
import { DataTable } from '@/components/common/Datatable';

import { Card, Button, Icon, Input, Select } from '@/components/ui';
import { TableColumn } from '@/types/common';
import { AffiliateLink, LinkGenerationForm } from '@/types/affiliate';
import { copyToClipboard, generateId } from '@/utils/helpers';
import { 
  AFFILIATE_LINKS, 
  WEBSITE_URLS, 
  CURRENCIES, 
  CAMPAIGNS 
} from '@/data/dummyData';

interface AffiliateLinksPageProps {
  darkMode: boolean;
}

const AffiliateLinksPage: React.FC<AffiliateLinksPageProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('created');
  const [links, setLinks] = useState<AffiliateLink[]>(AFFILIATE_LINKS);

  const [formData, setFormData] = useState<LinkGenerationForm>({
    website: 'https://www.facebook.com/',
    currency: 'USD',
    campaign: 'World Wide',
    landingPage: '/live',
    subId: ''
  });

  const [loading, setLoading] = useState(false);

  const linkColumns: TableColumn<AffiliateLink>[] = [
    {
      key: 'id',
      header: 'No.',
      sortable: true,
      width: 'w-20',
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'website',
      header: 'Website',
      sortable: true,
      width: 'w-40',
      render: (value) => (
        <div className="max-w-32 truncate" title={value}>
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            {value}
          </a>
        </div>
      ),
    },
    {
      key: 'showHide',
      header: 'Show/Hide',
      sortable: false,
      width: 'w-28',
      render: (_, row) => (
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => handleToggleStatus(row.id)}
        >
          <Icon name={row.status === 'active' ? 'fas fa-eye-slash' : 'fas fa-eye'} className="mr-1" />
          {row.status === 'active' ? 'HIDE' : 'SHOW'}
        </Button>
      ),
    },
    {
      key: 'landingPage',
      header: 'Landing page',
      sortable: true,
      width: 'w-32'
    },
    {
      key: 'subId',
      header: 'SubID',
      sortable: true,
      width: 'w-24',
      render: (value) => value || '-'
    },
    {
      key: 'campaign',
      header: 'Campaign',
      sortable: true,
      width: 'w-32'
    },
    {
      key: 'generatedLink',
      header: 'Generated link',
      sortable: false,
      render: (value) => (
        <div className="flex items-center space-x-2 max-w-xs">
          <div className="truncate" title={value}>
            <span className="font-mono text-sm">{value}</span>
          </div>
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => copyToClipboard(value)}
            >
              <Icon name="fas fa-copy" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => window.open(value, '_blank')}
            >
              <Icon name="fas fa-external-link-alt" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: 'currency',
      header: 'Currency',
      sortable: true,
      width: 'w-20'
    },
    {
      key: 'performance',
      header: 'Performance',
      sortable: false,
      width: 'w-32',
      render: (_, row) => (
        <div className="text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="fas fa-mouse-pointer" className="text-blue-500" />
            <span>{row.clicks || 0}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Icon name="fas fa-chart-line" className="text-green-500" />
            <span>{row.conversions || 0}</span>
          </div>
        </div>
      )
    }
  ];

  const tabs = [
    { 
      id: 'created', 
      label: 'CREATED LINKS', 
      icon: 'fas fa-plus',
      count: links.filter(l => l.status === 'active').length
    },
    { 
      id: 'hidden', 
      label: 'HIDDEN LINKS', 
      icon: 'fas fa-eye-slash',
      count: links.filter(l => l.status === 'hidden').length
    }
  ];

  const handleGenerateLink = async () => {
    setLoading(true);
    try {
      // Simulate a fake API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLink: AffiliateLink = {
        id: generateId(),
        website: formData.website,
        landingPage: formData.landingPage,
        subId: formData.subId || '',
        campaign: formData.campaign,
        generatedLink: `https://refpa3267686.top/L?tag=d_${generateId()}m_1599c_&site=${generateId()}&ad=1599`,
        currency: formData.currency,
        status: 'active',
        clicks: 0,
        conversions: 0,
        createdAt: new Date().toISOString()
      };

      setLinks(prev => [newLink, ...prev]);
      
      // Reset form
      setFormData({
        website: 'https://www.facebook.com/',
        currency: 'USD',
        campaign: 'World Wide',
        landingPage: '/live',
        subId: ''
      });
    } catch (error) {
      console.error('Error generating link:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (linkId: string) => {
    setLinks(prev => 
      prev.map(link => 
        link.id === linkId 
          ? { ...link, status: link.status === 'active' ? 'hidden' : 'active' }
          : link
      )
    );
  };

  const filteredLinks = links.filter(l => 
    activeTab === 'created' ? l.status === 'active' : l.status === 'hidden'
  );

  return (
    <div className="space-y-6">
      {/* Link Generation Form */}
      <Card darkMode={darkMode} padding="md">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Generate Affiliate Link
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Select
                label="Website"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                options={WEBSITE_URLS}
                darkMode={darkMode}
              />
              
              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                options={CURRENCIES}
                darkMode={darkMode}
              />
              
              <Select
                label="Campaign"
                value={formData.campaign}
                onChange={(e) => setFormData(prev => ({ ...prev, campaign: e.target.value }))}
                options={CAMPAIGNS}
                darkMode={darkMode}
              />
              
              <Input
                label="Landing page"
                type="text"
                value={formData.landingPage}
                onChange={(e) => setFormData(prev => ({ ...prev, landingPage: e.target.value }))}
                placeholder="/live"
                darkMode={darkMode}
              />
              
              <Input
                label="Sub ID"
                type="text"
                value={formData.subId}
                onChange={(e) => setFormData(prev => ({ ...prev, subId: e.target.value }))}
                placeholder="Optional"
                darkMode={darkMode}
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <Button 
              className="w-full" 
              icon="fas fa-link"
              onClick={handleGenerateLink}
              loading={loading}
            >
              GENERATE LINK
            </Button>
          </div>
        </div>
      </Card>

      {/* Links Table */}
      <Card darkMode={darkMode} className="overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <TabNavigation 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            darkMode={darkMode}
            size="sm"
          />
          
          <div className="text-sm text-gray-500">
            8 items selected
          </div>
        </div>
        
        <div className="p-6">
          <DataTable
            data={filteredLinks}
            columns={linkColumns}
            darkMode={darkMode}
            emptyMessage={`No ${activeTab} links found`}
            enableSelection={true}
          />
        </div>
      </Card>

      {/* Link Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon name="fas fa-link" color="#2563EB" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {links.length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Links
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Icon name="fas fa-mouse-pointer" color="#16A34A" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {links.reduce((sum, link) => sum + (link.clicks || 0), 0)}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Clicks
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Icon name="fas fa-chart-line" color="#9333EA" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {links.reduce((sum, link) => sum + (link.conversions || 0), 0)}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Conversions
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Icon name="fas fa-percentage" color="#EA580C" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                3.4%
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

export default AffiliateLinksPage;