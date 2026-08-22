export interface ValidationIssue {
  id: string;
  layer: 1 | 2 | 3;
  severity: 'error' | 'warning';
  checkName: string;
  message: string;
  location?: {
    templateId?: string;
    layoutId?: string;
    sectionId?: string;
    fieldKey?: string;
  };
}
