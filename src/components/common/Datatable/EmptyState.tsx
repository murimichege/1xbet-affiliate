import React from 'react';
import { Icon } from '@/components/ui';

interface EmptyStateProps {
  darkMode: boolean;
  message: string;
  icon: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
}

export function EmptyState({ 
  darkMode, 
  message, 
  icon, 
  description,
  action 
}: EmptyStateProps) {
  return (
    <div className={`py-16 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Icon */}
        <div className={`rounded-full p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Icon name={icon} className="text-4xl" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {message}
          </h3>
          {description && (
            <p className={`text-sm max-w-sm mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {description}
            </p>
          )}
        </div>

        {/* Action */}
        {action && (
          <button
            onClick={action.onClick}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {action.icon && <Icon name={action.icon} className="mr-2" />}
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}