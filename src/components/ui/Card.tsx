import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  className = '',
  children,
  hoverable = false,
  padding = 'none',
  ...rest
}) => {
  const baseClasses = `rounded-lg border bg-white border-gray-200 transition-all duration-200`;
  const hoverClasses = hoverable ? 'hover:shadow-lg cursor-pointer' : 'shadow-sm';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default Card;
