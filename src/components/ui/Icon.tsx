import React from 'react';

export interface IconProps {
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  title?: string;
  role?: string;
  tabIndex?: number;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 'md',
  color,
  onClick,
  title,
  role,
  tabIndex
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  const classes = `${name} ${sizeClasses[size]} ${className}`;
  
  // Add cursor-pointer class if onClick is provided
  const finalClasses = onClick ? `${classes} cursor-pointer` : classes;
  
  return (
    <i 
      className={finalClasses}
      style={color ? { color } : undefined}
      onClick={onClick}
      title={title}
      role={role || (onClick ? 'button' : undefined)}
      tabIndex={onClick ? (tabIndex ?? 0) : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e as any);
        }
      } : undefined}
    />
  );
};

export default Icon;