import React from 'react';

export const DataSourceToggle: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      background: '#2d2d2d',
      padding: '4px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 500,
      marginRight: '16px'
    }}>
      <button
        style={{
          background: '#374151',
          color: '#fff',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Demo Data
      </button>
      <button
        disabled
        title="Coming soon"
        style={{
          background: 'transparent',
          color: '#6b7280',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '6px',
          cursor: 'not-allowed',
        }}
      >
        Connected Site
      </button>
    </div>
  );
};
