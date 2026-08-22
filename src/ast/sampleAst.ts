import { ThemeProject } from './types';
import { createBinding } from './bindingRegistry';

/**
 * Hand-written sample AST for manual testing.
 * Contains 1 Template and 2 Sections.
 * At least 1 section uses a GhostBinding.
 */
export const sampleAst: ThemeProject = {
  id: 'proj-1',
  name: 'Sample Theme',
  settings: {
    ghostVersion: '5.0',
  },
  globalStyles: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#ffffff',
  },
  assets: [],
  layouts: [],
  templates: [
    {
      id: 'tpl-index',
      type: 'index',
      sections: [
        {
          id: 'sec-hero-1',
          type: 'hero',
          name: 'Main Hero',
          props: {
            // Using GhostBinding for dynamic text
            title: createBinding('site', 'title'),
            description: createBinding('site', 'description'),
            // Using StaticValue for visual configuration
            showButton: { kind: 'static', value: true },
            buttonText: { kind: 'static', value: 'Read More' },
          },
          styles: {
            padding: '64px',
            backgroundColor: '#f3f4f6',
            textAlign: 'center',
          },
          responsiveStyles: {
            mobile: {
              padding: '32px',
            },
          },
        },
        {
          id: 'sec-text-1',
          type: 'text-block',
          name: 'Welcome Text',
          props: {
            content: { kind: 'static', value: 'Welcome to the sample Ghost theme built visually.' },
          },
          styles: {
            padding: '32px 64px',
            color: '#374151',
          },
          responsiveStyles: {},
        }
      ],
    }
  ]
};
