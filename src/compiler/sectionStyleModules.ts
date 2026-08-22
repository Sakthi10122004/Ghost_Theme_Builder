export interface SectionStyleModule {
  css: string;
  js?: string;
}

// Minimal placeholder styles to ensure GScan tests pass for required Ghost styles 
// and to implement Phase 7's tree-shaking requirements.
export const sectionStyleModules: Record<string, SectionStyleModule> = {
  'hero': { css: '.hero { padding: 4rem 2rem; background: var(--theme-accent); color: white; }' },
  'header': { css: '.header { padding: 1rem 2rem; border-bottom: 1px solid #e2e8f0; }', js: 'console.log("header script");' },
  'footer': { css: '.footer { padding: 2rem; background: #0f172a; color: white; }' },
  'posts': { css: '.posts { display: flex; flex-direction: column; gap: 1rem; }' },
  'features': { css: '.features { display: grid; gap: 2rem; }' },
  'cta': { css: '.cta { padding: 3rem; text-align: center; background: #f1f5f9; }' },
  'text-block': { css: '.text-block { padding: 3rem 2rem; font-size: 1.125rem; line-height: 1.75; }' },
  'recommendations': { css: '.recommendations { padding: 2rem; }' },
  'newsletter': { css: '.newsletter { padding: 3rem 2rem; background: #e0e7ff; text-align: center; }' },
  'authors': { css: '.authors { display: flex; gap: 1rem; }' },
  'testimonials': { css: '.testimonials { padding: 2rem; font-style: italic; }' },
  'tags': { css: '.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }' },
  'products': { css: '.products { display: grid; gap: 1rem; }' },
  'stats': { css: '.stats { display: flex; justify-content: space-around; }' },
  'faq': { css: '.faq { padding: 3rem 2rem; }' },
  'logo-cloud': { css: '.logo-cloud { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; }' },
};
