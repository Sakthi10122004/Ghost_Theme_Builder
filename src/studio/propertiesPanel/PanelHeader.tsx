import React from 'react';
import { Section } from '../../ast/types';

interface Props {
  section: Section;
}

export const PanelHeader: React.FC<Props> = ({ section }) => {
  return (
    <div style={{ padding: 'var(--space-24) var(--space-16)', borderBottom: '1px solid var(--line)', backgroundColor: 'var(--paper)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
        <h2 className="heading-display" style={{ margin: 0, fontSize: 'var(--text-lg)', lineHeight: 'var(--text-lg-lh)', fontWeight: 600, color: 'var(--ink)' }}>
          {section.name}
        </h2>
        {section.ghostDynamic && (
          <span className="font-mono" style={{
            backgroundColor: 'var(--line)',
            color: 'var(--muted)',
            fontSize: 'var(--text-xs)',
            lineHeight: 'var(--text-xs-lh)',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {section.ghostDynamic.category}
          </span>
        )}
      </div>
      <p style={{ margin: 0, fontSize: 'var(--text-sm)', lineHeight: 'var(--text-sm-lh)', color: 'var(--muted)' }}>
        Configure this {section.type} section.
      </p>
    </div>
  );
};
