import React from 'react';
import { StatCardData } from '@/types/common';
import { Card, Icon } from '@/components/ui';

interface StatCardProps {
  data: StatCardData;
  darkMode?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  data, 
  darkMode = false, 
  onClick,
  loading = false 
}) => {
  return (
    <Card 
      darkMode={darkMode} 
      className={`p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            {data.label}
          </p>
          {loading ? (
            <div className="animate-pulse">
              <div className={`h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-20`}></div>
            </div>
          ) : (
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              $ {data.value}
            </p>
          )}
        </div>
        <div className={`${data.color} ${data.bgColor} p-3 rounded-lg flex-shrink-0`}>
          <Icon name={data.icon} className="text-xl" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;