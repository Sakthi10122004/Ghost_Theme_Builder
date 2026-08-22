import { ThemeProject, Template, Section, PropValue } from '../../ast/types';
import { resolveSectionColors } from '../../designSystem/resolveSectionColors';

export interface ResolvedSection extends Omit<Section, 'props'> {
  resolvedColors: Record<string, string>;
  resolvedProps: Record<string, string>;
}

export interface ResolvedTemplate extends Omit<Template, 'sections'> {
  sections: ResolvedSection[];
}

export interface ResolvedLayout {
  id: string;
  name: string;
  header: ResolvedSection[];
  footer: ResolvedSection[];
}

export interface ResolvedTheme {
  projectSlug: string;
  projectName: string;
  templates: ResolvedTemplate[];
  layouts: ResolvedLayout[];
  designTokens: any;
  usedSectionTypes: Set<string>;
  usedAssetIds: Set<string>;
}

export function semanticResolver(ast: ThemeProject): ResolvedTheme {
  const usedSectionTypes = new Set<string>();
  const usedAssetIds = new Set<string>();

  const resolveSection = (sec: Section): ResolvedSection => {
    usedSectionTypes.add(sec.type);
    
    // Resolve colors using Phase 5 logic
    // We assume ast.designTokens provides the tokens
    const tokens = ast.designTokens;
    let resolvedColors: Record<string, string> = {};
    if (tokens) {
      resolvedColors = resolveSectionColors(sec, tokens as any);
    }

    // Resolve props into strings for Handlebars
    const resolvedProps: Record<string, string> = {};
    for (const [key, val] of Object.entries(sec.props || {})) {
      resolvedProps[key] = resolvePropValue(val);
      // Track assets (if image string starts with 'asset:') - optional extra for Phase 7
      if (typeof resolvedProps[key] === 'string' && resolvedProps[key].startsWith('asset:')) {
        usedAssetIds.add(resolvedProps[key].substring(6));
      }
    }

    return {
      ...sec,
      resolvedColors,
      resolvedProps,
    };
  };

  const templates: ResolvedTemplate[] = (ast.templates || []).map(tpl => ({
    ...tpl,
    sections: (tpl.sections || []).map(resolveSection)
  }));

  const layouts: ResolvedLayout[] = (ast.layouts || []).map(l => ({
    id: l.id,
    name: l.name,
    header: (l.header || []).map(resolveSection),
    footer: (l.footer || []).map(resolveSection)
  }));

  return {
    projectSlug: ast.slug || 'ghost-theme',
    projectName: ast.name,
    templates,
    layouts,
    designTokens: ast.designTokens,
    usedSectionTypes,
    usedAssetIds
  };
}

function resolvePropValue(val: PropValue): string {
  if (!val) return '';
  if (val.kind === 'static') {
    return String(val.value);
  }
  if (val.kind === 'binding') {
    // Generate Handlebars expression
    // E.g. {{site.title}} or {{primary_author.name}}
    return `{{${val.source}.${val.field}}}`;
  }
  if (val.kind === 'portal') {
    const isForm = val.action.includes('form');
    const actionStr = isForm ? val.action : `data-portal="${val.action}"`;
    return `<a href="#/${val.action.replace(/[^a-z0-9-]/g, '')}" class="gh-portal-btn" ${actionStr}>${val.label}</a>`;
  }
  if (val.kind === 'navigation') {
    return val.variant === 'secondary' ? '{{navigation type="secondary"}}' : '{{navigation}}';
  }
  if (val.kind === 'rich') {
    return val.parts.map((p: any) => {
      if (p.kind === 'text') return p.value;
      return `{{${p.binding.source}.${p.binding.field}}}`;
    }).join('');
  }
  return '';
}
