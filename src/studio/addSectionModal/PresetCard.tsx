import React from 'react';
import { SectionPreset } from '../../presetLibrary/types';
import Image from 'next/image';

interface Props {
  preset: SectionPreset;
  onSelect: (preset: SectionPreset) => void;
}

export const PresetCard: React.FC<Props> = ({ preset, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(preset)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: 'white',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        padding: 0
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = '#818cf8';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f1f5f9', position: 'relative' }}>
        {/* Fallback styling for when thumbnails aren't generated yet */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.75rem' }}>
          No Thumbnail
        </div>
        
        {/* We use next/image to render the static thumbnail from /public */}
        <Image 
          src={preset.thumbnailPath} 
          alt={preset.variantName}
          fill
          style={{ objectFit: 'contain', objectPosition: 'top', position: 'absolute', inset: 0, zIndex: 1, padding: '8px' }}
          unoptimized // since it's local dev / raw build output
        />
      </div>

      <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', zIndex: 2, backgroundColor: 'white' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a' }}>
          <span style={{ textTransform: 'capitalize', color: '#64748b', fontWeight: 500, marginRight: '4px' }}>{preset.category} —</span>
          {preset.variantName}
        </div>
      </div>
    </button>
  );
};
