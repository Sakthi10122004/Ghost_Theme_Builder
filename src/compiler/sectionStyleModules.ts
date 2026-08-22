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
  'post-grid': { css: '.post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }' },
  'post-list': { css: '.post-list { display: flex; flex-direction: column; gap: 1rem; }' },
  'features-grid': { css: '.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }' },
  'cta-banner': { css: '.cta-banner { padding: 3rem; text-align: center; background: #f1f5f9; }' },
};
