import React from 'react';
import { Section } from '../../ast/types';
import { resolvePropValue, parseStyles } from './utils';

interface Props {
  section: Section;
}

export const TextBlockSection: React.FC<Props> = ({ section }) => {
  const content = resolvePropValue(section.props.content);

  return (
    <section style={parseStyles(section.styles)}>
      <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>{content}</p>
    </section>
  );
};
