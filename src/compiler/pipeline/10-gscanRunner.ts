// @ts-ignore
import gscan from 'gscan';
import { ValidationIssue } from '../validation/sharedTypes';

export async function gscanRunner(themeDir: string): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = [];
  
  try {
    const report = await gscan.check(themeDir);
    const formatted = gscan.format(report);
    
    if (formatted.results.error) {
      for (const err of formatted.results.error) {
        issues.push({
          id: `l3-error-${Math.random().toString(36).substr(2, 9)}`,
          layer: 3,
          severity: 'error',
          checkName: err.rule || 'GScan Error',
          message: err.details || 'Unknown error',
          location: { fieldKey: err.failures?.[0]?.ref }
        });
      }
    }
    
    if (formatted.results.warning) {
      for (const warn of formatted.results.warning) {
        issues.push({
          id: `l3-warn-${Math.random().toString(36).substr(2, 9)}`,
          layer: 3,
          severity: 'warning',
          checkName: warn.rule || 'GScan Warning',
          message: warn.details || 'Unknown warning',
          location: { fieldKey: warn.failures?.[0]?.ref }
        });
      }
    }
  } catch (e: any) {
    issues.push({
      id: 'l3-fatal-error',
      layer: 3,
      severity: 'error',
      checkName: 'GScan Fatal Error',
      message: e.message
    });
  }
  
  return issues;
}
