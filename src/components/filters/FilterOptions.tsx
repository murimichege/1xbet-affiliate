import React from 'react';
import { Card, Button, Select, Input, Icon } from '@/components/ui';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'multiselect' | 'text' | 'date' | 'dual-input' | 'datetime-local';
  options?: string[];
  placeholder?: string;
  className?: string;
  secondaryPlaceholder?: string; // For dual-input type
}

interface ReportFiltersProps<T> {
  filters: T;
  onFilterChange: (key: keyof T, value: T[keyof T]) => void;
  onApply?: () => void;
  onReset?: () => void;
  fields: FilterField[];
  isLoading?: boolean;
  title?: string;
  layout?: 'player' | 'full' | 'summary' | 'form';
  showActions?: boolean;
  children?: React.ReactNode;
}

const normalizeLandingPage = (input: string): string => {
  if (!input) return '';
  const trimmed = input.trim();
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export const ReportFilters = <T extends Record<string, any>>({
  filters,
  onFilterChange,
  onApply,
  onReset,
  fields,
  isLoading = false,
  title,
  layout = 'form',
  showActions = false,
  children
}: ReportFiltersProps<T>) => {
  const sharedInputClass = 'h-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-400';

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
        case 'datetime-local':
          return (
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <DatePicker
                selected={value as Date}
                onChange={(date: Date | null) => {
                  if (date) {
                    onFilterChange(field.key as keyof T, date as T[keyof T]);
                  }
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText={field.placeholder}
                className={sharedInputClass}
              />
            </div>
          );
        
          case 'dual-input':
            return (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="text"
                    value={value as string}
                    onChange={(e) => onFilterChange(field.key as keyof T, e.target.value as T[keyof T])}
                    placeholder={field.placeholder}
                    className={sharedInputClass}
                    disabled={isLoading}
                  />
                  <Select
                    value={value as string}
                    onChange={(e) => {
                      const normalizedValue =
                        field.key === 'landingPage'
                          ? normalizeLandingPage(e.target.value)
                          : e.target.value;
                      onFilterChange(field.key as keyof T, normalizedValue as T[keyof T]);
                    }}
                    options={field.options?.map((opt) => {
                      if (opt.includes(':')) {
                        const colonIndex = opt.indexOf(':');
                        const optValue = opt.substring(0, colonIndex);
                        const optLabel = opt.substring(colonIndex + 1);
                        return { value: optValue, label: optLabel };
                      }
                      return { value: opt, label: opt };
                    }) || []}
                    placeholder={field.secondaryPlaceholder || 'Quick select...'}
                    className={sharedInputClass}
                    disabled={isLoading}
                  />
                </div>
                {field.key === 'landingPage' && (
                  <p className="text-xs text-gray-500">
                    Type a custom path or select from previously used options. "/" will be auto-prepended.
                  </p>
                )}
              </div>
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

  const getLayoutConfig = () => {
    switch (layout) {
      case 'player':
        return {
          mainGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
          showTitle: true,
          buttonLayout: 'justify-end',
          wrapInCard: true
        };
      case 'full':
        return {
          mainGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
          showTitle: true,
          buttonLayout: 'justify-center',
          wrapInCard: true
        };
      case 'summary':
        return {
          mainGrid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
          showTitle: false,
          buttonLayout: 'justify-end',
          wrapInCard: true
        };
      case 'form':
      default:
        return {
          mainGrid: 'grid-cols-1 sm:grid-cols-2 gap-4',
          showTitle: false,
          buttonLayout: 'justify-start',
          wrapInCard: false
        };
    }
  };

  const config = getLayoutConfig();

  const dateFields = fields.filter(field => field.type === 'date');
  const standardFields = fields.filter(field => !['date', 'dual-input'].includes(field.type));
  const specialFields = fields.filter(field => field.type === 'dual-input');

  const content = (
    <div className={config.wrapInCard ? 'p-6' : ''}>
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

        {standardFields.length > 0 && (
          <div className={`grid ${config.mainGrid}`}>
            {standardFields.map((field) => (
              <div key={field.key} className="min-w-0">
                {renderField(field)}
              </div>
            ))}
          </div>
        )}

        {specialFields.map((field) => (
          <div key={field.key} className="w-full">
            {renderField(field)}
          </div>
        ))}

        {children}
      </div>

      {showActions && (onApply || onReset) && (
        <div className={`mt-6 pt-4 flex gap-3 ${config.buttonLayout}`}>
          {onApply && (
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
          )}

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
      )}
    </div>
  );

  return config.wrapInCard ? <Card>{content}</Card> : content;
};

// Preview URL Component
export const PreviewUrl: React.FC<{
  domain: string;
  landingPage: string;
}> = ({ domain, landingPage }) => {
  if (!domain || !landingPage) return null;

  const previewUrl = `https://${domain}${normalizeLandingPage(landingPage)}`;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <div className="flex items-center gap-2">
        <Icon name="fas fa-eye" className="text-blue-600 text-sm" />
        <span className="text-sm font-medium text-blue-800">Preview URL:</span>
      </div>
      <div className="mt-1 font-mono text-sm text-blue-700">
        {previewUrl}
      </div>
    </div>
  );
};

export const PlayerReportFilters = <T extends Record<string, any>>(
  props: Omit<ReportFiltersProps<T>, 'layout' | 'showActions'>
) => <ReportFilters {...props} layout="player" showActions={true} />;

export const FullReportFilters = <T extends Record<string, any>>(
  props: Omit<ReportFiltersProps<T>, 'layout' | 'showActions'>
) => <ReportFilters {...props} layout="full" showActions={true} />;

export const SummaryReportFilters = <T extends Record<string, any>>(
  props: Omit<ReportFiltersProps<T>, 'layout' | 'showActions'>
) => <ReportFilters {...props} layout="summary" showActions={true} />;

export const FormReportFilters = <T extends Record<string, any>>(
  props: Omit<ReportFiltersProps<T>, 'layout' | 'showActions'>
) => <ReportFilters {...props} layout="form" showActions={false} />;