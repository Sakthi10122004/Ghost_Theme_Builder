import React from 'react';

export const DataSourceToggle: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      padding: '4px',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      marginRight: 'var(--space-16)'
    }}>
      <button
        style={{
          background: 'var(--surface)',
          color: 'var(--accent)',
          border: '1px solid var(--line)', // Gives it that raised look within the container, or we could just use no border. The prompt says "hairline border container".
          padding: 'var(--space-4) var(--space-12)',
          borderRadius: 'calc(var(--radius-md) - 4px)',
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
          color: 'var(--muted)',
          border: 'none',
          padding: 'var(--space-4) var(--space-12)',
          borderRadius: 'calc(var(--radius-md) - 4px)',
          cursor: 'not-allowed',
        }}
      >
        Connected Site
      </button>
    </div>
  );
};
