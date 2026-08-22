import React from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd } from 'lucide-react';

interface Props {
  hAlign?: 'left' | 'center' | 'right';
  vAlign?: 'top' | 'center' | 'bottom';
  onHAlignChange?: (val: 'left' | 'center' | 'right') => void;
  onVAlignChange?: (val: 'top' | 'center' | 'bottom') => void;
}

export const IconAlignButtons: React.FC<Props> = ({ hAlign, vAlign, onHAlignChange, onVAlignChange }) => {
  const btnStyle = (isActive: boolean) => ({
    padding: '8px',
    backgroundColor: isActive ? '#e2e8f0' : '#f8fafc',
    border: '1px solid #cbd5e1',
    cursor: 'pointer',
    color: isActive ? '#0f172a' : '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
      {onHAlignChange && (
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
            Horizontal
          </label>
          <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden' }}>
            <button onClick={() => onHAlignChange('left')} style={{ ...btnStyle(hAlign === 'left'), borderRight: 'none' }}><AlignLeft size={16} /></button>
            <button onClick={() => onHAlignChange('center')} style={{ ...btnStyle(hAlign === 'center'), borderRight: 'none' }}><AlignCenter size={16} /></button>
            <button onClick={() => onHAlignChange('right')} style={btnStyle(hAlign === 'right')}><AlignRight size={16} /></button>
          </div>
        </div>
      )}
      
      {onVAlignChange && (
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
            Vertical
          </label>
          <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden' }}>
            <button onClick={() => onVAlignChange('top')} style={{ ...btnStyle(vAlign === 'top'), borderRight: 'none' }}><AlignVerticalJustifyStart size={16} /></button>
            <button onClick={() => onVAlignChange('center')} style={{ ...btnStyle(vAlign === 'center'), borderRight: 'none' }}><AlignVerticalJustifyCenter size={16} /></button>
            <button onClick={() => onVAlignChange('bottom')} style={btnStyle(vAlign === 'bottom')}><AlignVerticalJustifyEnd size={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
};
