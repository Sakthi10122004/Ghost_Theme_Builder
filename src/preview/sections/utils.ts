import React from 'react';
import { Section, PropValue } from '../../ast/types';

/**
 * Helper to resolve a PropValue. 
 * Since this is Phase 0 with no real data layer, GhostBindings 
 * return a clearly marked placeholder string instead of resolving data.
 */
export function resolvePropValue(prop: PropValue): any {
  if (prop.kind === 'static') {
    return prop.value;
  }
  
  if (prop.kind === 'binding') {
    return `[${prop.source}.${prop.field}]`; // Placeholder for Ghost data
  }
  
  return null;
}

export function parseStyles(styles: any): React.CSSProperties {
  // A naive implementation for Phase 0. 
  // Translates the generic StyleObject into React CSS properties.
  return styles as React.CSSProperties;
}
