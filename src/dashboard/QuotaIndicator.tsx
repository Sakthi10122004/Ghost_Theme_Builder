import React from 'react';

export const MAX_PROJECTS = 3;

interface Props {
  currentCount: number;
}

export const QuotaIndicator: React.FC<Props> = ({ currentCount }) => {
  const isAtLimit = currentCount >= MAX_PROJECTS;
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      backgroundColor: isAtLimit ? '#fef2f2' : '#f1f5f9',
      color: isAtLimit ? '#ef4444' : '#475569',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: 500,
      border: `1px solid ${isAtLimit ? '#fecaca' : '#e2e8f0'}`
    }}>
      {currentCount} / {MAX_PROJECTS} projects used
    </div>
  );
};
