/**
 * Represents the entire Ghost Theme Project AST.
 * This is the single source of truth for the theme's structural representation,
 * distinct from the actual Handlebars output or the in-editor UI state.
 */
export interface ThemeProject {
  id: string;
  name: string;
  slug: string;
  settings: Record<string, unknown>; // Theme-level config, e.g., ghost.json-style options
  layouts: Layout[];
  templates: Template[];
  designTokens: DesignTokens;
  assets: Asset[];
}

export interface DesignTokens {
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  typeScale: {
    h1: string; h2: string; h3: string; h4: string;
    body: string; small: string; caption: string;
  };
  postsPerPage: number;
  containerWidth: 'full' | 'wide' | 'standard' | 'narrow';
  spacingScale: 'compact' | 'standard' | 'relaxed';
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
  ghostDynamic?: {
    category: 'posts' | 'authors' | 'tags' | 'recommendations' | 'newsletter';
    source: 'routes' | 'featured' | 'related' | 'custom';
    limit: number | 'theme-default';
    order: string;
    layoutStyle: string;
    filterRules?: FilterRule[];
    manualFilterString?: string;
    filterMode?: 'visual' | 'manual';
  };
  colorConfig?: { mode: 'inherit' | 'light' | 'dark'; paletteId: string };
  layoutConfig?: {
    sectionWidth: 'full' | 'wide' | 'standard' | 'narrow';
    contentWidth: 'full' | 'wide' | 'standard' | 'narrow';
    minHeight: 'S' | 'M' | 'L' | 'XL';
    hAlign: 'left' | 'center' | 'right';
    vAlign: 'top' | 'center' | 'bottom';
  };
  htmlAnchor?: string;
  fieldLocks?: Record<string, boolean>; // key = prop key, true = unlocked (editable in Ghost Admin)
}

export interface FilterRule {
  field: 'tag' | 'author' | 'visibility' | 'featured' | 'published_at';
  operator: 'is' | 'is-not' | 'contains' | 'starts-with';
  value: string;
  combinator: 'all' | 'any';
}

/**
 * A property value assigned to a Section.
 * Can be either a static hard-coded value, a dynamic Ghost data binding, or rich text.
 * CRITICAL RULE: NEVER store raw Handlebars ({{...}}) here.
 */
export type PropValue = StaticValue | GhostBinding | RichValue | PortalAction | NavigationValue;

export interface PortalAction {
  kind: 'portal';
  action: string; // e.g. 'signin', 'signup', or form actions like 'members-form'
  label: string; // the text of the button
}

export interface NavigationValue {
  kind: 'navigation';
  variant: 'primary' | 'secondary';
}

/**
 * A rich text value mixing literal strings and bindings.
 */
export interface RichValue {
  kind: 'rich';
  parts: Array<
    | { kind: 'text'; value: string }
    | { kind: 'binding'; binding: GhostBinding }
  >;
}

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
