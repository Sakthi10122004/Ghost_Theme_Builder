/**
 * Represents the entire Ghost Theme Project AST.
 * This is the single source of truth for the theme's structural representation,
 * distinct from the actual Handlebars output or the in-editor UI state.
 */
export interface ThemeProject {
  id: string;
  name: string;
  settings: Record<string, unknown>; // Theme-level config, e.g., ghost.json-style options
  layouts: Layout[];
  templates: Template[];
  globalStyles: StyleObject;
  assets: Asset[];
}

/**
 * A shared layout (e.g. Default Header/Footer) used across multiple templates.
 */
export interface Layout {
  id: string;
  name: string; // e.g. "Default Header/Footer"
  header: Section[];
  footer: Section[];
}

/**
 * A Ghost theme template (e.g., default.hbs, index.hbs, post.hbs, custom-*.hbs).
 * Contains an ordered list of sections that make up the page structure.
 */
export interface Template {
  id: string;
  type: 'default' | 'index' | 'post' | 'page' | 'author' | 'tag' | 'error' | 'custom';
  layoutId?: string; // References a Layout.id
  sections: Section[];
}

/**
 * A visual section or component within a template.
 * Defines its visual properties (props) and styling.
 */
export interface Section {
  id: string;
  type: string;   // e.g. 'hero', 'post-grid', 'text-block'
  name: string;   // Human-readable label for the layers panel (future phase)
  props: Record<string, PropValue>;
  styles: StyleObject;
  responsiveStyles: {
    tablet?: Partial<StyleObject>;
    mobile?: Partial<StyleObject>;
  };
}

/**
 * A property value assigned to a Section.
 * Can be either a static hard-coded value or a dynamic Ghost data binding.
 * CRITICAL RULE: NEVER store raw Handlebars ({{...}}) here.
 */
export type PropValue = StaticValue | GhostBinding;

/**
 * A static value provided by the user via the visual editor.
 */
export type StaticValue = { 
  kind: 'static'; 
  value: string | number | boolean;
};

/**
 * A dynamic data binding pointing to a specific Ghost object and field.
 * Handled by the Compiler to generate corresponding Handlebars tags.
 */
export interface GhostBinding {
  kind: 'binding';
  source: 'post' | 'site' | 'author' | 'tag';
  field: string; // Constrained further by the runtime registry in bindingRegistry.ts
}

/**
 * A generic CSS-in-JS style object representing layout and appearance.
 */
export interface StyleObject {
  [property: string]: string | number | undefined;
}

/**
 * An asset (image, font, etc.) bundled with the theme.
 */
export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'font' | 'other';
  url: string;
}
