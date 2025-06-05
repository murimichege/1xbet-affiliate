import React from 'react';
import { Icon } from '@/components/ui';

interface WebsiteCellProps {
  url: string;
  showIcon?: boolean;
  maxLength?: number;
  className?: string;
}

export const WebsiteCell: React.FC<WebsiteCellProps> = ({
  url,
  showIcon = true,
  maxLength = 25,
  className = ""
}) => {
  const truncatedUrl = url.length > maxLength 
    ? `${url.substring(0, maxLength)}...` 
    : url;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors truncate"
        title={url}
      >
        {truncatedUrl}
      </a>
      {showIcon && (
        <Icon 
          name="fas fa-external-link-alt" 
          className="text-xs text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
          onClick={() => window.open(url, '_blank')}
        />
      )}
    </div>
  );
};
