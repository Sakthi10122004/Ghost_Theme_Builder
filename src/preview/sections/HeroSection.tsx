import React from 'react';
import { Section } from '../../ast/types';
import { resolvePropValue, parseStyles } from './utils';

interface Props {
  section: Section;
}

export const HeroSection: React.FC<Props> = ({ section }) => {
  const title = resolvePropValue(section.props.title);
  const description = resolvePropValue(section.props.description);
  const showButton = resolvePropValue(section.props.showButton);
  const buttonText = resolvePropValue(section.props.buttonText);

  return (
    <section style={parseStyles(section.styles)}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>{title}</h1>
      {description && <p style={{ fontSize: '1.25rem', marginBottom: '24px', opacity: 0.8 }}>{description}</p>}
      
      {showButton && (
        <button style={{ 
          padding: '12px 24px', 
          backgroundColor: '#000', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          {buttonText}
        </button>
      )}
    </section>
  );
};
