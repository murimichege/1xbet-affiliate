import React from 'react';

interface CurrencyCellProps {
  amount: number;
  currency: string;
  className?: string;
  colorClass?: string;
}

export const CurrencyCell: React.FC<CurrencyCellProps> = ({
  amount,
  currency,
  className = "",
  colorClass = "text-blue-600"
}) => (
  <span className={`font-semibold ${colorClass} ${className}`}>
    {currency} {amount.toLocaleString()}
  </span>
);