import { Section } from '../ast/types';

export type PresetCategory =
  | 'header' | 'footer' | 'posts' | 'hero' | 'features' | 'cta'
  | 'recommendations' | 'newsletter' | 'authors' | 'testimonials'
  | 'tags' | 'products' | 'stats' | 'faq' | 'logo-cloud';

export interface SectionPreset {
  id: string; // e.g., 'header-standard'
  category: PresetCategory;
  variantName: string; // e.g., "Standard", "Stacked Social"
  keywords?: string[]; // optional extra search terms
  thumbnailPath: string; // e.g., "/preset-thumbnails/header-standard.png"
  buildSection: () => Section; // Factory returning a fresh AST section instance
}
