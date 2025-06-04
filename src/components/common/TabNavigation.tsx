import React from 'react';
import { Icon } from '@/components/ui';

interface Tab {
  id: string;
  label: string;
  icon: string;
  count?: number;
  disabled?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  darkMode = false,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <div className="flex space-x-0 border-b border-gray-200 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
          className={`${sizeClasses[size]} font-medium transition-all duration-200 whitespace-nowrap flex items-center relative ${
            activeTab === tab.id
              ? darkMode 
                ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
                : 'bg-gray-800 text-white border-b-2 border-blue-500'
              : darkMode 
                ? 'bg-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          } ${
            tab.disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer'
          }`}
        >
          <Icon name={tab.icon} className="mr-2" />
          {tab.label}
          
          {/* Tab Count Badge */}
          {tab.count !== undefined && (
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              activeTab === tab.id
                ? 'bg-white text-gray-800'
                : darkMode
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
          )}
          
          {/* Active Tab Indicator */}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation