import { Palette } from './curatedPalettes';

/**
 * Derives a Neutral palette from the provided accent color hex.
 * This is a highly simplified algorithm for Phase 5 to prove the concept.
 * In a real implementation, we'd use HSL transformations or a color library like polished.
 */
export function computeNeutralPalette(accentColor: string): Palette['colors'] {
  // A true robust implementation would parse the hex and calculate contrast/lightness.
  // We'll approximate the "Neutral" aesthetic by assuming a light background,
  // very dark text, and using the exact accent color for primary.
  
  return {
    background: '#f8fafc', // slate-50
    text: '#0f172a',       // slate-900
    primary: accentColor,
    muted: '#e2e8f0',      // slate-200
  };
}

export function computeDarkPalette(accentColor: string): Palette['colors'] {
  return {
    background: '#0f172a', // slate-900
    text: '#f8fafc',       // slate-50
    primary: accentColor,
    muted: '#334155',      // slate-700
  };
}
