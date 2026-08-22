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
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--surface)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        padding: 0,
        boxShadow: 'none'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'var(--line)';
      }}
    >
      <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: 'var(--paper)', position: 'relative' }}>
        {/* Fallback styling for when thumbnails aren't generated yet */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: 'var(--text-xs)' }}>
          No Thumbnail
        </div>
        
        {/* We use next/image to render the static thumbnail from /public */}
        <Image 
          src={preset.thumbnailPath} 
          alt={preset.variantName}
          fill
          style={{ objectFit: 'contain', objectPosition: 'top', position: 'absolute', inset: 0, zIndex: 1, padding: 'var(--space-8)' }}
          unoptimized // since it's local dev / raw build output
        />
      </div>

      <div style={{ padding: 'var(--space-12) var(--space-16)', borderTop: '1px solid var(--line)', zIndex: 2, backgroundColor: 'var(--surface)' }}>
        <div style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--text-sm-lh)', fontWeight: 600, color: 'var(--ink)' }}>
          <span className="font-mono" style={{ textTransform: 'uppercase', fontSize: 'var(--text-xs)', color: 'var(--muted)', fontWeight: 500, marginRight: 'var(--space-8)', display: 'inline-block', backgroundColor: 'var(--paper)', padding: '2px 6px', borderRadius: '4px' }}>
            {preset.category}
          </span>
          <span style={{ display: 'block', marginTop: '4px' }}>{preset.variantName}</span>
        </div>
      </div>
    </button>
  );
};
