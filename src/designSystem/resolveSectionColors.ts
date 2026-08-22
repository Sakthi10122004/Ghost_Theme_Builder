import { Section, DesignTokens } from '../ast/types';
import { CURATED_PALETTES, Palette } from './curatedPalettes';
import { computeNeutralPalette, computeDarkPalette } from './computeNeutralPalette';

/**
 * The single source of truth for resolving a section's final colors.
 * Used at render-time by PreviewRenderer (and eventually Compiler).
 */
export function resolveSectionColors(section: Section, tokens: DesignTokens): Palette['colors'] {
  const { mode, paletteId } = section.colorConfig ?? { mode: 'inherit', paletteId: 'default' };

  if (paletteId === 'default' || paletteId === 'neutral' || paletteId.startsWith('neutral-')) {
    if (mode === 'dark') return computeDarkPalette(tokens.accentColor);
    return computeNeutralPalette(tokens.accentColor);
  }

  const palette = CURATED_PALETTES.find(p => p.id === paletteId);
  return palette?.colors ?? computeNeutralPalette(tokens.accentColor); // Fallback to neutral if ID stale
}
