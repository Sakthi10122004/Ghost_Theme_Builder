import React, { useState } from 'react';
import { Link2, Link2Off, Smartphone } from 'lucide-react';

interface Props {
  label: string;
  topValue: number;
  bottomValue: number;
  onChange: (top: number, bottom: number) => void;
  onOverrideClick?: () => void; // for responsive overrides
}

export const SpacingSlider: React.FC<Props> = ({ label, topValue, bottomValue, onChange, onOverrideClick }) => {
  const [linked, setLinked] = useState(true);

  const handleTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (linked) {
      onChange(val, val);
    } else {
      onChange(val, bottomValue);
    }
  };

  const handleBottomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (linked) {
      onChange(val, val);
    } else {
      onChange(topValue, val);
    }
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>
          {label}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setLinked(!linked)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: linked ? '#0284c7' : '#94a3b8', padding: 0 }}
            title={linked ? "Unlink Top/Bottom" : "Link Top/Bottom"}
          >
            {linked ? <Link2 size={16} /> : <Link2Off size={16} />}
          </button>
          {onOverrideClick && (
            <button 
              onClick={onOverrideClick}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}
              title="Add Mobile/Tablet Override"
            >
              <Smartphone size={16} />
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748b', width: '40px' }}>Top</span>
        <input 
          type="range" min="0" max="160" step="4" 
          value={topValue} onChange={handleTopChange}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: '0.75rem', fontWeight: 600, width: '30px', textAlign: 'right' }}>{topValue}px</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748b', width: '40px' }}>Bottom</span>
        <input 
          type="range" min="0" max="160" step="4" 
          value={bottomValue} onChange={handleBottomChange}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: '0.75rem', fontWeight: 600, width: '30px', textAlign: 'right' }}>{bottomValue}px</span>
      </div>
    </div>
  );
};
