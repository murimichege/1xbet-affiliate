import React, { useState, useCallback } from 'react';
import {  TabNavigation } from '@/components/common';
import { DataTable } from '@/components/common/Datatable';

import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { TableColumn } from '@/types/common';
import { Website, WebsiteFormData } from '@/types/website';
import { copyToClipboard, isValidUrl } from '@/utils/helpers';
import { 
  WEBSITES, 
  WEBSITE_CATEGORIES, 
  LANGUAGES 
} from '@/data/dummyData';

interface WebsitesPageProps {
  darkMode: boolean;
}

const WebsitesPage: React.FC<WebsitesPageProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('added');
  const [websites, setWebsites] = useState<Website[]>(WEBSITES);
  
  const [formData, setFormData] = useState<WebsiteFormData>({
    url: '',
    category: 'Sports predictions',
    language: 'English'
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const websiteColumns: TableColumn<Website>[] = [
    {
      key: 'id',
      header: 'Website ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'url',
      header: 'Website URL',
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 truncate max-w-xs"
          >
            {value}
          </a>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => copyToClipboard(value)}
          >
            <Icon name="fas fa-copy" />
          </Button>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'language',
      header: 'Language',
      sortable: true
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => handleToggleStatus(row.id)}
          >
            <Icon name={row.status === 'active' ? 'fas fa-eye-slash' : 'fas fa-eye'} className="mr-1" />
            {row.status === 'active' ? 'HIDE' : 'SHOW'}
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => handleEditWebsite(row)}
          >
            <Icon name="fas fa-edit" />
          </Button>
          <Button 
            size="sm" 
            variant="danger"
            onClick={() => handleDeleteWebsite(row.id)}
          >
            <Icon name="fas fa-trash" />
          </Button>
        </div>
      ),
    },
  ];

  const tabs = [
    { id: 'added', label: 'ADDED WEBSITES', icon: 'fas fa-plus', count: websites.filter(w => w.status === 'active').length },
    { id: 'hidden', label: 'HIDDEN WEBSITES', icon: 'fas fa-eye-slash', count: websites.filter(w => w.status === 'hidden').length }
  ];

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.url.trim()) {
      errors.url = 'Website URL is required';
    } else if (!isValidUrl(formData.url)) {
      errors.url = 'Please enter a valid URL';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    if (!formData.language) {
      errors.language = 'Language is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddWebsite = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newWebsite: Website = {
        id: Math.random().toString(36).substr(2, 7),
        url: formData.url,
        category: formData.category,
        language: formData.language,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      setWebsites(prev => [newWebsite, ...prev]);
      setFormData({ url: '', category: 'Sports predictions', language: 'English' });
      setFormErrors({});
    } catch (error) {
      console.error('Error adding website:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = useCallback((websiteId: string) => {
    setWebsites(prev => 
      prev.map(website => 
        website.id === websiteId 
          ? { ...website, status: website.status === 'active' ? 'hidden' : 'active' }
          : website
      )
    );
  }, []);

  const handleEditWebsite = (website: Website) => {
    setFormData({
      url: website.url,
      category: website.category,
      language: website.language
    });
  };

  const handleDeleteWebsite = (websiteId: string) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      setWebsites(prev => prev.filter(w => w.id !== websiteId));
    }
  };

  const updateFormData = (key: keyof WebsiteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const filteredWebsites = websites.filter(w => 
    activeTab === 'added' ? w.status === 'active' : w.status === 'hidden'
  );

  return (
    <div className="space-y-6">
      {/* Add Website Form */}
      <Card darkMode={darkMode} padding="md">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Add New Website
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Website URL *"
                type="url"
                value={formData.url}
                onChange={(e) => updateFormData('url', e.target.value)}
                placeholder="https://example.com"
                error={formErrors.url}
                darkMode={darkMode}
              />
              
              <Select
                label="Category *"
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
                options={WEBSITE_CATEGORIES}
                darkMode={darkMode}
              />
              
              <Select
                label="Language *"
                value={formData.language}
                onChange={(e) => updateFormData('language', e.target.value)}
                options={LANGUAGES}
                darkMode={darkMode}
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <Button 
              className="w-full" 
              icon="fas fa-plus"
              onClick={handleAddWebsite}
              loading={loading}
            >
              ADD SITE
            </Button>
          </div>
        </div>
      </Card>

      {/* Websites Table */}
      <Card darkMode={darkMode} className="overflow-hidden">
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          darkMode={darkMode} 
        />
        
        <div className="p-6">
          <DataTable
            data={filteredWebsites}
            columns={websiteColumns}
            darkMode={darkMode}
            emptyMessage={`No ${activeTab} websites found`}
            enableSelection={true}
            onSelectionChange={(selected) => console.log('Selected websites:', selected)}
          />
        </div>
      </Card>

      {/* Website Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Icon name="fas fa-globe" color="#16A34A" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {websites.filter(w => w.status === 'active').length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Websites
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon name="fas fa-eye" color="#2563EB" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                1,247
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Views
              </p>
            </div>
          </div>
        </Card>

        <Card darkMode={darkMode} padding="md">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Icon name="fas fa-mouse-pointer" color="#9333EA" size="xl" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                394
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Clicks
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WebsitesPage;