import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  darkMode?: boolean;
  icon?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  darkMode = false,
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300'
  } ${error ? 'border-red-500' : ''}`;
  
  const inputClasses = icon ? `pl-10 ${baseClasses}` : baseClasses;
  
  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={`${icon} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
          </div>
        )}
        <input
          className={`${inputClasses} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;