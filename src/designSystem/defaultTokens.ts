import { DesignTokens } from '../ast/types';

export const defaultDesignTokens: DesignTokens = {
  accentColor: '#4f46e5',
  headingFont: 'sans-inter',
  bodyFont: 'sans-inter',
  typeScale: {
    h1: '3xl', h2: '2xl', h3: 'xl', h4: 'l',
    body: 'm', small: 's', caption: 'xs'
  },
  postsPerPage: 6,
  containerWidth: 'standard',
  spacingScale: 'standard'
};
