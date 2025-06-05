import React, { useState } from 'react';
import { DataTable } from '@/components/common/Datatable';
import { Card, Button, Icon, Select, Input } from '@/components/ui';
import { Website, WebsiteFormData } from '@/types/website';
import { copyToClipboard, isValidUrl } from '@/utils/helpers';
import { WEBSITES, WEBSITE_CATEGORIES, LANGUAGES } from '@/data/dummyData';
import { ColumnDef } from '@tanstack/react-table';

const WebsitesPage: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>(WEBSITES);

  const [formData, setFormData] = useState<WebsiteFormData>({
    url: '',
    category: 'Sports predictions',
    language: 'English'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const websiteColumns: ColumnDef<Website>[] = [
    {
      accessorKey: 'id',
      header: 'Website ID',
      cell: info => <span className="font-mono text-sm">{info.getValue() as string}</span>,
    },
    {
      accessorKey: 'url',
      header: 'Website URL',
      cell: info => {
        const value = info.getValue() as string;
        return (
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
        );
      },
    },
    // {
    //   accessorKey: 'category',
    //   header: 'Category',
    //   cell: info => (
    //     <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
    //       {info.getValue() as string}
    //     </span>
    //   ),
    // },

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
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newWebsite: Website = {
        id: Math.random().toString(36).substr(2, 7),
        url: formData.url,
        category: formData.category,
        language: formData.language,
        status: 'active' ,
        createdAt: new Date().toISOString(),
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

  const updateFormData = (key: keyof WebsiteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Website</h3>

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
              />

              <Select
                label="Category *"
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
                options={WEBSITE_CATEGORIES}
              />

              <Select
                label="Language *"
                value={formData.language}
                onChange={(e) => updateFormData('language', e.target.value)}
                options={LANGUAGES}
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

      <Card className="overflow-hidden">
        <div className="p-6">
          <DataTable
            data={websites}
            columns={websiteColumns}
            emptyMessage="No websites found"
            enableSelection={true}
            onSelectionChange={(selected) => console.log('Selected websites:', selected)}
          />
        </div>
      </Card>
    </div>
  );
};

export default WebsitesPage;
