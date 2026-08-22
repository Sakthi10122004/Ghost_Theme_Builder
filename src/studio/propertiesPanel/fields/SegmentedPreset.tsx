import React from 'react';

interface Props<T extends string> {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}

export function SegmentedPreset<T extends string>({ label, value, options, onChange }: Props<T>) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
        {label}
      </label>
      <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: value === opt.value ? '#ffffff' : 'transparent',
              color: value === opt.value ? '#0f172a' : '#64748b',
              boxShadow: value === opt.value ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
