import { ResolvedTheme } from './02-semanticResolver';
import { sectionStyleModules } from '../sectionStyleModules';

const BASE_CSS = `
/* Base Styles */
:root {
  --font-family: sans-serif;
}
body {
  margin: 0;
  font-family: var(--font-family);
}
.section {
  display: block;
  width: 100%;
}
.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Koenig Cards Requirements for GScan */
.kg-width-wide { max-width: 1000px; }
.kg-width-full { max-width: 100vw; }
.kg-product-card-title-container {}
.kg-before-after-card {}
.kg-before-after-card-image-before {}
.kg-before-after-card-image-after {}
.kg-file-card {}
.kg-file-card-container {}
.kg-file-card-contents {}
.kg-file-card-title {}
.kg-file-card-caption {}
.kg-file-card-filename {}
.kg-file-card-filesize {}
.kg-file-card-medium {}
.kg-file-card-small {}
.kg-blockquote-alt {}
`;

export function cssGenerator(theme: ResolvedTheme): string {
  let css = BASE_CSS + '\\n';

  // Tree-shake: only include CSS for sections actually used
  for (const type of theme.usedSectionTypes) {
    const mod = sectionStyleModules[type];
    if (mod && mod.css) {
      css += `/* --- Section: ${type} --- */\\n`;
      css += mod.css + '\\n\\n';
    }
  }

  return css;
}
