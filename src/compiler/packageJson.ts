import { ThemeProject } from '../ast/types';
import { sectionFieldSchemas } from '../studio/propertiesPanel/sectionFieldSchemas';
import { mapFieldTypeToGhost } from './fieldTypeMapping';

/**
 * Generates the package.json file for the compiled Ghost theme.
 * Promotes any unlocked fields in the AST into the `config.custom` Ghost schema.
 */
export function generatePackageJson(project: ThemeProject): string {
  const customConfig: Record<string, any> = {};

  // Walk through all sections to find unlocked fields
  const sections = project.templates.flatMap(t => t.sections)
    .concat(project.layouts.flatMap(l => [...l.header, ...l.footer]));

  sections.forEach((section, index) => {
    if (!section.fieldLocks) return;

    const schema = sectionFieldSchemas[section.type];
    if (!schema) return;

    // Keys that are unlocked
    for (const [propKey, isUnlocked] of Object.entries(section.fieldLocks)) {
      if (isUnlocked) {
        // Safe sanitization for Ghost setting key (max length limits often apply in real Ghost, but we keep it unique)
        const settingKey = `${section.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${index}_${propKey}`;
        
        const fieldDef = schema.fields.find(f => f.name === propKey);
        const toggleDef = schema.toggles.find(t => t.name === propKey);
        
        let type = 'text';
        let defaultVal: any = '';

        if (fieldDef) {
          type = mapFieldTypeToGhost(fieldDef.type);
          const val = section.props[propKey];
          if (val?.kind === 'static') {
            defaultVal = val.value;
          }
        } else if (toggleDef) {
          type = mapFieldTypeToGhost('boolean');
          const val = section.props[propKey];
          defaultVal = val?.kind === 'static' ? Boolean(val.value) : false;
        }

        // Only add if we successfully mapped it
        if (fieldDef || toggleDef) {
          customConfig[settingKey] = {
            type,
            default: defaultVal
          };
        }
      }
    }
  });

  const packageJson = {
    name: project.slug,
    version: "1.0.0",
    engines: {
      ghost: ">=5.0.0"
    },
    config: {
      custom: customConfig
    }
  };

  return JSON.stringify(packageJson, null, 2);
}
