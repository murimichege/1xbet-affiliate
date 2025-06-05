import { Card, Button, Icon, Select, Input } from '@/components/ui';

export interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date';
  options?: string[];
  placeholder?: string;
  colSpan?: number;
}

interface ReportFiltersProps<T> {
  filters: T;
  onFilterChange: (key: keyof T, value: T[keyof T]) => void;
  onApply: () => void;
  onReset?: () => void;
  fields: FilterField[];
  isLoading?: boolean;
  title?: string;
}

export const ReportFilters = <T extends Record<string, any>>({
  filters,
  onFilterChange,
  onApply,
  onReset,
  fields,
  isLoading = false,
  title = "Report Filters"
}: ReportFiltersProps<T>) => {
  const renderField = (field: FilterField) => {
    const value = filters[field.key] || '';
    
    switch (field.type) {
      case 'select':
        return (
          <Select
            label={field.label}
            value={value}
            onChange={(e) => onFilterChange(field.key as keyof T, e.target.value as T[keyof T])}
            options={field.options?.map(opt => ({ value: opt, label: opt })) || []}
          />
        );
      case 'date':
        return (
          <Input
            label={field.label}
            type="date"
            value={value}
            onChange={(e) => onFilterChange(field.key as keyof T, e.target.value as T[keyof T])}
          />
        );
      default:
        return (
          <Input
            label={field.label}
            type="text"
            value={value}
            onChange={(e) => onFilterChange(field.key as keyof T, e.target.value as T[keyof T])}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <Card padding="md">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        {/* Filter Fields */}
        <div className="md:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {fields.slice(0, 4).map((field) => (
              <div key={field.key} className={field.colSpan ? `col-span-${field.colSpan}` : ''}>
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>

        {/* Date Range */}
        {fields.length > 4 && (
          <div className="md:col-span-1">
            <div className="space-y-2">
              {fields.slice(4, 6).map((field) => (
                <div key={field.key}>
                  {renderField(field)}
                  {field.key.includes('From') && (
                    <div className="text-center py-1">
                      <Icon name="fas fa-arrow-down" className="text-gray-400" size="xs" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Fields */}
        {fields.length > 6 && (
          <div className="md:col-span-1">
            {fields.slice(6).map((field) => (
              <div key={field.key}>
                {renderField(field)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-3">
        <Button 
          onClick={onApply} 
          icon="fas fa-chart-line" 
          loading={isLoading} 
          size="lg"
        >
          GENERATE REPORT
        </Button>
        
        {onReset && (
          <Button 
            variant="secondary" 
            onClick={onReset}
            icon="fas fa-undo"
            size="lg"
          >
            RESET
          </Button>
        )}
      </div>
    </Card>
  );
};