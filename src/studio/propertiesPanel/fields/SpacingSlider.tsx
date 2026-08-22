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
    <div style={{ marginBottom: 'var(--space-24)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-12)' }}>
        <label style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--text-sm-lh)', fontWeight: 500, color: 'var(--ink)' }}>
          {label}
        </label>
        <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
          <button 
            onClick={() => setLinked(!linked)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: linked ? 'var(--accent)' : 'var(--muted)', padding: 0 }}
            title={linked ? "Unlink Top/Bottom" : "Link Top/Bottom"}
          >
            {linked ? <Link2 size={16} /> : <Link2Off size={16} />}
          </button>
          {onOverrideClick && (
            <button 
              onClick={onOverrideClick}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0 }}
              title="Add Mobile/Tablet Override"
            >
              <Smartphone size={16} />
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-8)' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', width: '40px' }}>Top</span>
        <input 
          type="range" min="0" max="160" step="4" 
          value={topValue} onChange={handleTopChange}
          style={{ flex: 1 }}
        />
        <span className="font-mono" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, width: '40px', textAlign: 'right', color: 'var(--ink)' }}>{topValue}px</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-12)' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', width: '40px' }}>Bottom</span>
        <input 
          type="range" min="0" max="160" step="4" 
          value={bottomValue} onChange={handleBottomChange}
          style={{ flex: 1 }}
        />
        <span className="font-mono" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, width: '40px', textAlign: 'right', color: 'var(--ink)' }}>{bottomValue}px</span>
      </div>
    </div>
  );
};
