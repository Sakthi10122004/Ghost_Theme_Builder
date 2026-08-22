import { ThemeProject } from '../../ast/types';
import { ValidationIssue } from '../validation/sharedTypes';
import { VALID_BINDINGS } from '../../ast/bindingRegistry';
import { sectionStyleModules } from '../sectionStyleModules';

export function astValidator(ast: ThemeProject): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!ast || !ast.templates || ast.templates.length === 0) {
    issues.push({
      id: 'l1-missing-templates',
      layer: 1, severity: 'error', checkName: 'Missing required templates',
      message: 'Theme must contain at least one template (default.hbs).'
    });
    return issues;
  }

  // 1. Missing required templates
  const hasDefault = ast.templates.some(t => t.type === 'default');
  const hasIndex = ast.templates.some(t => t.type === 'index');
  const hasPost = ast.templates.some(t => t.type === 'post');

  if (!hasDefault) {
    issues.push({
      id: 'l1-missing-default',
      layer: 1, severity: 'error', checkName: 'Missing required template',
      message: 'Theme must contain a default template (default.hbs).'
    });
  }
  if (!hasIndex) {
    issues.push({
      id: 'l1-missing-index',
      layer: 1, severity: 'error', checkName: 'Missing required template',
      message: 'Theme must contain an index template (index.hbs).'
    });
  }
  if (!hasPost) {
    issues.push({
      id: 'l1-missing-post',
      layer: 1, severity: 'error', checkName: 'Missing required template',
      message: 'Theme must contain a post template (post.hbs).'
    });
  }

  // Check sections
  for (const tpl of ast.templates || []) {
    checkSections(tpl.sections || [], tpl.id, issues);
  }
  for (const layout of ast.layouts || []) {
    checkSections(layout.header || [], layout.id, issues);
    checkSections(layout.footer || [], layout.id, issues);
  }

  return issues;
}

function checkSections(sections: any[], containerId: string, issues: ValidationIssue[]) {
  if (!sections) return;
  for (const sec of sections) {
    // 2. Invalid component
    if (!sectionStyleModules[sec.type]) {
      issues.push({
        id: `l1-invalid-comp-${sec.id}`,
        layer: 1, severity: 'error', checkName: 'Invalid component',
        message: `Section type "${sec.type}" is not recognized.`,
        location: { sectionId: sec.id, templateId: containerId }
      });
    }

    // 3. Invalid Ghost binding
    for (const [propKey, propVal] of Object.entries(sec.props || {})) {
      const val = propVal as any;
      if (val?.kind === 'binding') {
        checkBinding(val, issues, containerId, sec.id, propKey);
      } else if (val?.kind === 'rich') {
        val.parts.forEach((p: any) => {
          if (p.kind === 'binding') checkBinding(p.binding, issues, containerId, sec.id, propKey);
        });
      }
    }

    // 4. Invalid responsive value
    if (sec.responsiveStyles) {
      // Very basic validation: ensure tablet/mobile styles are objects if present
      ['tablet', 'mobile'].forEach(bp => {
        const styles = (sec.responsiveStyles as any)[bp];
        if (styles && typeof styles !== 'object') {
          issues.push({
            id: `l1-invalid-responsive-${sec.id}-${bp}`,
            layer: 1, severity: 'error', checkName: 'Invalid responsive value',
            message: `Responsive styles for ${bp} must be an object.`,
            location: { sectionId: sec.id, templateId: containerId }
          });
        }
      });
    }
  }
}

function checkBinding(binding: any, issues: ValidationIssue[], containerId: string, sectionId: string, fieldKey: string) {
  const validFields = (VALID_BINDINGS as any)[binding.source];
  if (!validFields || !validFields.includes(binding.field)) {
    issues.push({
      id: `l1-invalid-binding-${sectionId}-${fieldKey}-${Math.random().toString(36).substring(7)}`,
      layer: 1, severity: 'error', checkName: 'Invalid Ghost binding',
      message: `Binding {${binding.source}.${binding.field}} is invalid.`,
      location: { templateId: containerId, sectionId, fieldKey }
    });
  }
}
