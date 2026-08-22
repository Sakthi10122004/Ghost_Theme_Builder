import React from 'react';
import { Section } from '../../ast/types';

interface Props {
  section: Section;
}

export const PanelHeader: React.FC<Props> = ({ section }) => {
  return (
    <div style={{ padding: '24px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#0f172a' }}>
          {section.name}
        </h2>
        {section.ghostDynamic && (
          <span style={{
            backgroundColor: '#e2e8f0',
            color: '#475569',
            fontSize: '0.6875rem',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {section.ghostDynamic.category}
          </span>
        )}
      </div>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>
        Configure this {section.type} section.
      </p>
    </div>
  );
};
