import React, { useState, useCallback } from 'react';
import { FilterConfig } from '@/types/common';
import { Button, Input, Select } from '@/components/ui';
import { debounce } from '@/utils/helpers';

interface FilterRowProps {
  filters: FilterConfig[];
  onApply?: (filters: Record<string, string>) => void;
  onReset?: () => void;
  loading?: boolean;
}

const FilterRow: React.FC<FilterRowProps> = ({ 
  filters, 
  onApply,
  onReset,
  loading = false 
}) => {
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    filters.forEach(filter => {
      initial[filter.name] = filter.defaultValue || '';
    });
    return initial;
  });

  const debouncedOnChange = useCallback(
    debounce((name: string, value: string) => {
      setFilterValues(prev => ({ ...prev, [name]: value }));
    }, 300),
    []
  );

  const handleInputChange = (name: string, value: string) => {
    debouncedOnChange(name, value);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply?.(filterValues);
  };

  const handleReset = () => {
    const resetValues: Record<string, string> = {};
    filters.forEach(filter => {
      resetValues[filter.name] = '';
    });
    setFilterValues(resetValues);
    onReset?.();
  };

  return (
    <div className="space-y-4">
      {/* Filter Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-auto gap-4 items-end">
        {filters.map((filter) => (
          <div key={filter.name}>
            {filter.type === 'select' && filter.options ? (
              <Select
                label={filter.label}
                options={filter.options}
                value={filterValues[filter.name]}
                onChange={(e: { target: { value: string } }) => handleSelectChange(filter.name, e.target.value)}
              />
            ) : filter.type === 'date' ? (
              <Input
                type="date"
                label={filter.label}
                value={filterValues[filter.name]}
                onChange={(e: { target: { value: string } }) => handleInputChange(filter.name, e.target.value)}
              />
            ) : (
              <Input
                type="text"
                label={filter.label}
                placeholder={filter.placeholder}
                value={filterValues[filter.name]}
                onChange={(e: { target: { value: string } }) => handleInputChange(filter.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button 
          onClick={handleApply} 
          icon="fas fa-filter"
          disabled={loading}
        >
          {loading ? 'Applying...' : 'APPLY'}
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={handleReset}
          icon="fas fa-undo"
        >
          RESET
        </Button>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm text-gray-600">
            Quick:
          </span>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => handleSelectChange('timeInterval', 'Last 7 days')}
          >
            7 Days
          </Button>
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => handleSelectChange('timeInterval', 'Last 30 days')}
          >
            30 Days
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterRow;
