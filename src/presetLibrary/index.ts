import { SectionPreset, PresetCategory } from './types';
import { headerPresets } from './presets/header';
import { footerPresets } from './presets/footer';
import { heroPresets } from './presets/hero';
import { postsPresets } from './presets/posts';
import { featuresPresets } from './presets/features';
import { ctaPresets } from './presets/cta';

import { recommendationsPresets } from './presets/recommendations';
import { newsletterPresets } from './presets/newsletter';
import { authorsPresets } from './presets/authors';
import { testimonialsPresets } from './presets/testimonials';
import { tagsPresets } from './presets/tags';
import { productsPresets } from './presets/products';
import { statsPresets } from './presets/stats';
import { faqPresets } from './presets/faq';
import { logoCloudPresets } from './presets/logo-cloud';

// Aggregate all presets
export const allPresets: SectionPreset[] = [
  ...headerPresets,
  ...footerPresets,
  ...heroPresets,
  ...postsPresets,
  ...featuresPresets,
  ...ctaPresets,
  ...recommendationsPresets,
  ...newsletterPresets,
  ...authorsPresets,
  ...testimonialsPresets,
  ...tagsPresets,
  ...productsPresets,
  ...statsPresets,
  ...faqPresets,
  ...logoCloudPresets,
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
