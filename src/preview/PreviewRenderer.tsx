import React from 'react';
import { Template, ThemeProject, DesignTokens } from '../ast/types';

interface Props {
  template: Template;
  designTokens: DesignTokens;
}

/**
 * PreviewRenderer takes a Template AST and renders it as real React components.
 * This consumer never touches raw Handlebars strings.
 */
import { resolvePropValue, parseStyles } from './sections/utils';
import { resolveSectionColors } from '../designSystem/resolveSectionColors';

const GenericSection: React.FC<{ section: any; designTokens: DesignTokens }> = ({ section, designTokens }) => {
  const colors = resolveSectionColors(section, designTokens);

  return (
    <section 
      style={{ 
        ...parseStyles(section.styles), 
        backgroundColor: colors.background, 
        color: colors.text 
      }}
      data-section-id={section.id}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(section.props || {}).map(([key, val]) => (
          <div key={key} className={`prop-${key}`}>
            {resolvePropValue(val as any)}
          </div>
        ))}
      </div>
    </section>
  );
};

export const PreviewRenderer: React.FC<Props> = ({ template, designTokens }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%' }}>
      {template.sections.map(section => (
        <GenericSection key={section.id} section={section} designTokens={designTokens} />
      ))}
    </div>
  );
};
