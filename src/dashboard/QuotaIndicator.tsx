import React from 'react';

export const MAX_PROJECTS = 3;

interface Props {
  currentCount: number;
}

export const QuotaIndicator: React.FC<Props> = ({ currentCount }) => {
  const isAtLimit = currentCount >= MAX_PROJECTS;
  
  return (
    <div style={{
      color: isAtLimit ? 'var(--danger)' : 'var(--muted)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--text-sm-lh)',
      fontWeight: 400
    }}>
      {currentCount} / {MAX_PROJECTS} projects used
    </div>
  );
};
