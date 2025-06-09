import React from 'react';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';

export interface SelectOption {
  value: string;
  label: string;
}

// Separate interfaces for single and multiple select to improve type safety
interface BaseSelectProps {
  label?: string;
  error?: string;
  options: SelectOption[] | string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface SingleSelectProps extends BaseSelectProps {
  multiple?: false;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface MultipleSelectProps extends BaseSelectProps {
  multiple: true;
  value?: string[];
  onChange?: (selectedValues: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultipleSelectProps;

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  value,
  onChange,
  multiple = false,
  placeholder,
  disabled = false,
  ...props
}) => {
  const normalizedOptions = options.map(option =>
    typeof option === 'string'
      ? { value: option, label: option }
      : option
  );

  // For single select (native HTML select)
  if (!multiple) {
    const baseClasses =
      'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white border-gray-300';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <select
          className={`${baseClasses} ${error ? 'border-red-500' : ''} ${className}`}
          value={value || ''}
          onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {normalizedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }

  // For multiple select (React Select)
  const handleMultiSelectChange = (
    selectedOptions: MultiValue<SelectOption>
  ) => {
    const selectedValues = selectedOptions.map(option => option.value);
    (onChange as (selectedValues: string[]) => void)?.(selectedValues);
  };

  // Convert string array values to SelectOption objects for React Select
  const selectedOptions = (value as string[] || [])
    .map(val => normalizedOptions.find(opt => opt.value === val))
    .filter(Boolean) as SelectOption[];

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: '42px',
      border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
      borderRadius: '0.5rem',
      boxShadow: state.isFocused 
        ? '0 0 0 2px rgba(59, 130, 246, 0.5)' 
        : 'none',
      '&:hover': {
        border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#dbeafe',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#1e40af',
      fontSize: '0.875rem',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        backgroundColor: '#bfdbfe',
        color: '#1e40af',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '0.875rem',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#3b82f6' 
        : state.isFocused 
        ? '#f3f4f6' 
        : 'white',
      color: state.isSelected ? 'white' : '#374151',
      fontSize: '0.875rem',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3b82f6' : '#f3f4f6',
      },
    }),
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <ReactSelect
        isMulti
        value={selectedOptions}
        onChange={handleMultiSelectChange}
        options={normalizedOptions}
        placeholder={placeholder || 'Select options...'}
        isDisabled={disabled}
        styles={customStyles}
        className={className}
        classNamePrefix="react-select"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option: ({ children, ...props }) => (
            <div {...props.innerProps} className={`
              px-3 py-2 cursor-pointer flex items-center justify-between
              ${props.isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
            `}>
              <span>{children}</span>
              {props.isSelected && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          ),
        }}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
   
    </div>
  );
};

export default Select;