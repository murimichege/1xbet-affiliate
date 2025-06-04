import React from 'react';

export interface CardProps {
  darkMode?: boolean;
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  darkMode = false,
  className = '',
  children,
  hoverable = false,
  padding = 'none'
}) => {
  const baseClasses = `rounded-lg border transition-all duration-200 ${
    darkMode 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  }`;
  
  const hoverClasses = hoverable ? 'hover:shadow-lg cursor-pointer' : 'shadow-sm';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;