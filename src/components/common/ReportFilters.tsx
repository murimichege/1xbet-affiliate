import React from 'react';
import { Card, Button, Select, Input } from '@/components/ui';

export interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'text' | 'date';
  options?: string[];
  placeholder?: string;
  className?: string;
}

interface ReportFiltersProps<T> {
  filters: T;
  onFilterChange: (key: keyof T, value: T[keyof T]) => void;
  onApply: () => void;
  onReset?: () => void;
  fields: FilterField[];
  isLoading?: boolean;
  title?: string;
  layout?: 'player' | 'full' | 'summary';
}

export const ReportFilters = <T extends Record<string, any>>({
  filters,
  onFilterChange,
  onApply,
  onReset,
  fields,
  isLoading = false,
  title,
  layout = 'summary'
}: ReportFiltersProps<T>) => {
  
  const renderField = (field: FilterField) => {
    const value = filters[field.key] || (field.type === 'multiselect' ? [] : '');
    
    const commonProps = {
      label: field.label,
      disabled: isLoading,
      className: field.className || '',
      placeholder: field.placeholder
    };
    
    switch (field.type) {
      case 'select':
        return (
          <Select
            {...commonProps}
            value={value as string}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
              onFilterChange(field.key as keyof T, e.target.value as T[keyof T])
            }
            options={field.options?.map(opt => {
              // Handle value:label format - split only on FIRST colon
              if (opt.includes(':')) {
                const colonIndex = opt.indexOf(':');
                const optValue = opt.substring(0, colonIndex);
                const optLabel = opt.substring(colonIndex + 1);
                return { value: optValue, label: optLabel };
              }
              return { value: opt, label: opt };
            }) || []}
          />
        );
        
      case 'multiselect':
        return (
          <Select
            {...commonProps}
            multiple
            value={value as string[]}
            onChange={(selectedValues: string[]) => 
              onFilterChange(field.key as keyof T, selectedValues as T[keyof T])
            }
            options={field.options?.map(opt => {
              // Handle value:label format - split only on FIRST colon
              if (opt.includes(':')) {
                const colonIndex = opt.indexOf(':');
                const optValue = opt.substring(0, colonIndex);
                const optLabel = opt.substring(colonIndex + 1);
                return { value: optValue, label: optLabel };
              }
              return { value: opt, label: opt };
            }) || []}
          />
        );
        
      case 'date':
        return (
          <Input
            {...commonProps}
            type="date"
            value={value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              onFilterChange(field.key as keyof T, e.target.value as T[keyof T])
            }
          />
        );
        
      default:
        return (
          <Input
            {...commonProps}
            type="text"
            value={value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              onFilterChange(field.key as keyof T, e.target.value as T[keyof T])
            }
          />
        );
    }
  };

  // Different layouts based on the page type
  const getLayoutConfig = () => {
    switch (layout) {
      case 'player':
        return {
          mainGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
          showTitle: true,
          showDateRange: true,
          showExtraFields: true,
          buttonLayout: 'justify-end'
        };
      
      case 'full':
        return {
          mainGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
          showTitle: true,
          showDateRange: true,
          showExtraFields: true,
          buttonLayout: 'justify-center'
        };
      
      case 'summary':
      default:
        return {
          mainGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
          showTitle: false,
          showDateRange: true,
          showExtraFields: false,
          buttonLayout: 'justify-end'
        };
    }
  };

  const config = getLayoutConfig();
  
  // Separate fields by type - dates first, then others
  const dateFields = fields.filter(field => field.type === 'date');
  const nonDateFields = fields.filter(field => field.type !== 'date');

  return (
    <Card className="p-6">
      {/* Title */}
      {config.showTitle && title && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Configure your filters and generate the report
          </p>
        </div>
      )}
      
      <div className="space-y-6">
        {dateFields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dateFields.map((field) => (
              <div key={field.key} className="min-w-0">
                {renderField(field)}
              </div>
            ))}
          </div>
        )}

        {nonDateFields.length > 0 && (
          <div className={`grid ${config.mainGrid} gap-4`}>
            {nonDateFields.map((field) => (
              <div key={field.key} className="min-w-0">
                {renderField(field)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className={`mt-6 pt-4 flex gap-3 ${config.buttonLayout}`}>
        <Button 
          onClick={onApply} 
          icon="fas fa-chart-line" 
          loading={isLoading}
          disabled={isLoading}
          size="md"
          className="min-w-[160px]"
        >
          {isLoading ? 'GENERATING...' : 'GENERATE REPORT'}
        </Button>
        
        {onReset && (
          <Button 
            variant="secondary" 
            onClick={onReset}
            icon="fas fa-undo"
            size="md"
            disabled={isLoading}
            className="min-w-[120px]"
          >
            RESET
          </Button>
        )}
      </div>
    </Card>
  );
};

export const PlayerReportFilters = <T extends Record<string, any>>(
  props: Omit<ReportFiltersProps<T>, 'layout'>
) => <ReportFilters {...props} layout="player" />;

export const FullReportFilters = <T extends Record<string, any>>(
  props: Omit<ReportFiltersProps<T>, 'layout'>
) => <ReportFilters {...props} layout="full" />;

export const SummaryReportFilters = <T extends Record<string, any>>(
  props: Omit<ReportFiltersProps<T>, 'layout'>
) => <ReportFilters {...props} layout="summary" />;