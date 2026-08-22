import React from 'react';
import { SectionPreset } from '../../presetLibrary/types';
import { PresetCard } from './PresetCard';

interface Props {
  presets: SectionPreset[];
  onSelect: (preset: SectionPreset) => void;
}

export const PresetGrid: React.FC<Props> = ({ presets, onSelect }) => {
  if (presets.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
        <div style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No presets found</div>
        <div style={{ fontSize: '0.875rem' }}>Try adjusting your search or category filter.</div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      alignContent: 'start'
    }}>
      {presets.map(preset => (
        <PresetCard key={preset.id} preset={preset} onSelect={onSelect} />
      ))}
    </div>
  );
};
