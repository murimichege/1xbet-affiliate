import React from 'react';
import { Card, Icon } from '@/components/ui';

interface NoDataMessageProps {
  title: string;
  message: string;
  icon?: string;
  className?: string;
}

export const NoDataMessage: React.FC<NoDataMessageProps> = ({ 
  title, 
  message, 
  icon = "fas fa-exclamation-triangle",
  className = ""
}) => (
  <Card padding="md" className={className}>
    <div className="text-center py-8">
      <Icon name={icon} className="text-yellow-500 text-4xl mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  </Card>
);