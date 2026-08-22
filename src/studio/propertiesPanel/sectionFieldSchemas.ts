/**
 * Defines the editable fields for the General tab of each Section type.
 */

export interface FieldSchema {
  name: string;      // The AST property key (e.g., 'title', 'showButton')
  label: string;     // The human-readable UI label
  type: 'text' | 'boolean' | 'number' | 'image'; 
  tokenEmbeddable?: boolean; // If true, use TokenPickerField
}

export interface SectionSchema {
  fields: FieldSchema[];
  toggles: FieldSchema[]; // Sourced from fields where type === 'boolean'
}

// Internal helper to separate standard fields from toggles
function createSchema(allFields: FieldSchema[]): SectionSchema {
  return {
    fields: allFields.filter(f => f.type !== 'boolean'),
    toggles: allFields.filter(f => f.type === 'boolean')
  };
}

export const sectionFieldSchemas: Record<string, SectionSchema> = {
  'hero': createSchema([
    { name: 'headline', label: 'Headline', type: 'text', tokenEmbeddable: true },
    { name: 'subheadline', label: 'Subheadline', type: 'text', tokenEmbeddable: true },
    { name: 'ctaText', label: 'Button Label', type: 'text', tokenEmbeddable: true },
    { name: 'image', label: 'Background Image', type: 'image' },
  ]),
  'header': createSchema([
    { name: 'logo', label: 'Logo URL', type: 'image' },
    { name: 'showSubscribe', label: 'Show Subscribe Button', type: 'boolean' },
  ]),
  'footer': createSchema([
    { name: 'title', label: 'Footer Title', type: 'text', tokenEmbeddable: true },
    { name: 'copyright', label: 'Copyright Text', type: 'text', tokenEmbeddable: true },
  ]),
  'post-grid': createSchema([
    { name: 'title', label: 'Section Title', type: 'text', tokenEmbeddable: true },
    { name: 'columns', label: 'Columns', type: 'number' },
    { name: 'showExcerpts', label: 'Show Excerpts', type: 'boolean' },
    { name: 'showAuthor', label: 'Show Author', type: 'boolean' },
    { name: 'showDate', label: 'Show Date', type: 'boolean' },
  ]),
  'post-list': createSchema([
    { name: 'title', label: 'Section Title', type: 'text', tokenEmbeddable: true },
    { name: 'showDates', label: 'Show Dates', type: 'boolean' },
    { name: 'showAuthor', label: 'Show Author', type: 'boolean' },
  ]),
  'features-grid': createSchema([
    { name: 'title', label: 'Section Title', type: 'text', tokenEmbeddable: true },
    { name: 'subtitle', label: 'Subtitle', type: 'text', tokenEmbeddable: true },
  ]),
  'cta-banner': createSchema([
    { name: 'headline', label: 'Headline', type: 'text', tokenEmbeddable: true },
    { name: 'description', label: 'Description', type: 'text', tokenEmbeddable: true },
    { name: 'buttonText', label: 'Button Text', type: 'text', tokenEmbeddable: true },
  ]),
};

// Fallback for unknown sections
export const defaultSchema = createSchema([
  { name: 'title', label: 'Title', type: 'text', tokenEmbeddable: true },
  { name: 'content', label: 'Content', type: 'text', tokenEmbeddable: true },
]);
