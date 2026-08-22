import { ThemeProject } from '../../ast/types';
import { generatePackageJson as generateBase } from '../packageJson';

export function packageJsonGenerator(project: ThemeProject): string {
  // Reuse the Phase 6 config.custom logic
  const baseJsonStr = generateBase(project);
  const baseJson = JSON.parse(baseJsonStr);
  
  // Add required fields for GScan validation (Layer 2 & 3)
  baseJson.author = {
    name: "Ghost Theme Builder",
    email: "builder@example.com"
  };
  baseJson.keywords = ["ghost", "theme"];
  
  if (!baseJson.config) {
    baseJson.config = {};
  }
  
  // GScan requires posts_per_page and card_assets
  baseJson.config.posts_per_page = 5;
  baseJson.config.card_assets = true;
  
  return JSON.stringify(baseJson, null, 2);
}
