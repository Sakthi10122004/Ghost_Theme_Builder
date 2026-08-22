import React from 'react';
import { Template, ThemeProject } from '../ast/types';
import { HeroSection } from './sections/HeroSection';
import { TextBlockSection } from './sections/TextBlockSection';

interface Props {
  template: Template;
}

/**
 * PreviewRenderer takes a Template AST and renders it as real React components.
 * This consumer never touches raw Handlebars strings.
 */
export const PreviewRenderer: React.FC<Props> = ({ template }) => {
  
  const renderSection = (section: any) => {
    switch (section.type) {
      case 'hero':
        return <HeroSection key={section.id} section={section} />;
      case 'text-block':
        return <TextBlockSection key={section.id} section={section} />;
      default:
        return (
          <div key={section.id} style={{ padding: 16, border: '1px dashed red', color: 'red' }}>
            Unknown Section Type: {section.type}
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%' }}>
      {template.sections.map(renderSection)}
    </div>
  );
};
