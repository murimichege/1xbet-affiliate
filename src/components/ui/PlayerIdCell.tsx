import React from 'react';

interface PlayerIdCellProps {
  playerId: string;
  className?: string;
}

export const PlayerIdCell: React.FC<PlayerIdCellProps> = ({
  playerId,
  className = ""
}) => (
  <span className={`font-mono text-sm font-semibold text-indigo-600 ${className}`}>
    {playerId}
  </span>
);