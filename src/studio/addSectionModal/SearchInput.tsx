import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '24px' }}>
      <div style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }}>
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search sections..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        style={{
          width: '100%',
          padding: '10px 12px 10px 40px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '0.875rem',
          outline: 'none',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#6366f1'}
        onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
      />
    </div>
  );
};
