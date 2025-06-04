import React from 'react';

export interface IconProps {
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 'md',
  color
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  const classes = `${name} ${sizeClasses[size]} ${className}`;
  
  return (
    <i 
      className={classes}
      style={color ? { color } : undefined}
    />
  );
};

export default Icon;