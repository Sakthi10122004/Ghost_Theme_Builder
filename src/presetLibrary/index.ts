import { SectionPreset, PresetCategory } from './types';
import { headerPresets } from './presets/header';
import { footerPresets } from './presets/footer';
import { heroPresets } from './presets/hero';
import { postsPresets } from './presets/posts';
import { featuresPresets } from './presets/features';
import { ctaPresets } from './presets/cta';

// Aggregate all presets
export const allPresets: SectionPreset[] = [
  ...headerPresets,
  ...footerPresets,
  ...heroPresets,
  ...postsPresets,
  ...featuresPresets,
  ...ctaPresets,
  // Note: Testimonials, tags, newsletter etc can be added here as the library grows
];

/**
 * Get all presets for a specific category
 */
export function getPresetsByCategory(category: PresetCategory | 'all'): SectionPreset[] {
  if (category === 'all') return allPresets;
  return allPresets.filter(p => p.category === category);
}

/**
 * Search presets by a query string (matches variantName, category, or keywords)
 */
export function searchPresets(presets: SectionPreset[], query: string): SectionPreset[] {
  if (!query) return presets;
  
  const lowerQuery = query.toLowerCase();
  
  return presets.filter(preset => {
    if (preset.variantName.toLowerCase().includes(lowerQuery)) return true;
    if (preset.category.toLowerCase().includes(lowerQuery)) return true;
    if (preset.keywords?.some(kw => kw.toLowerCase().includes(lowerQuery))) return true;
    return false;
  });
}

/**
 * Pre-computed counts per category for the sidebar
 */
export const presetCounts = allPresets.reduce((acc, preset) => {
  acc[preset.category] = (acc[preset.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

presetCounts['all'] = allPresets.length;
