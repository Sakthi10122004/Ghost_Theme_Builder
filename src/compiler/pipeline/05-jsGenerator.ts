import { ResolvedTheme } from './02-semanticResolver';
import { sectionStyleModules } from '../sectionStyleModules';

export function jsGenerator(theme: ResolvedTheme): string {
  let js = '// Ghost Theme Builder - Main Script\\n\\n';

  js += '(function() {\\n';
  js += '  console.log("Theme script initialized");\\n\\n';

  // Tree-shake: only include JS for sections actually used
  for (const type of theme.usedSectionTypes) {
    const mod = sectionStyleModules[type];
    if (mod && mod.js) {
      js += `  // --- Section: ${type} ---\\n`;
      js += `  try {\\n`;
      // Indent user script slightly for readability
      js += mod.js.split('\\n').map(line => `    ${line}`).join('\\n') + '\\n';
      js += `  } catch (e) { console.error("Error in ${type} script", e); }\\n\\n`;
    }
  }

  js += '})();\\n';

  return js;
}
