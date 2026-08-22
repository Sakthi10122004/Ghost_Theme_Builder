"use client";

import React from 'react';
import { allPresets } from '../../../presetLibrary';
import { PreviewRenderer } from '../../../preview/PreviewRenderer';
import { defaultDesignTokens } from '../../../designSystem/defaultTokens';

// This is a dedicated hidden route exclusively for the build-time thumbnail generator.
export default function ThumbnailsPage() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <h1>Thumbnail Generation Sandbox</h1>
      <p>This page renders all presets so the Puppeteer script can screenshot them.</p>

      {allPresets.map(preset => {
        const section = preset.buildSection();
        
        return (
          <div key={preset.id} style={{ marginBottom: '40px' }}>
            <h3 style={{ marginBottom: '8px' }}>{preset.id}</h3>
            {/* The wrapper must match the expected width of a desktop preview */}
            <div 
              id={`preset-${preset.id}`}
              style={{ width: '1200px', backgroundColor: 'white', position: 'relative' }}
            >
              <PreviewRenderer template={{ id: 'tpl', type: 'custom', sections: [section] }} designTokens={defaultDesignTokens} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
