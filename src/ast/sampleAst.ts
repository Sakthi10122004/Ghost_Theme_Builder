import { ThemeProject } from './types';
import { createBinding } from './bindingRegistry';
import { defaultDesignTokens } from '../designSystem/defaultTokens';

/**
 * Hand-written sample AST for manual testing.
 * Contains 1 Template and 2 Sections.
 * At least 1 section uses a GhostBinding.
 */
export const sampleAst: ThemeProject = {
  id: 'proj-1',
  name: 'Sample Theme',
  slug: 'sample-theme',
  settings: {
    ghostVersion: '5.0',
  },
  designTokens: defaultDesignTokens,
  assets: [],
  layouts: [],
  templates: [
    {
      id: 'tpl-default',
      type: 'default',
      sections: []
    },
    {
      id: 'tpl-index',
      type: 'index',
      sections: [
        {
          id: 'sec-hero-1',
          type: 'hero',
          name: 'Main Hero',
          props: {
            title: createBinding('site', 'title'),
            description: createBinding('site', 'description'),
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
    },
    {
      id: 'tpl-post',
      type: 'post',
      sections: []
    },
    {
      id: 'tpl-page',
      type: 'page',
      sections: []
    },
    {
      id: 'tpl-tag',
      type: 'tag',
      sections: []
    },
    {
      id: 'tpl-author',
      type: 'author',
      sections: []
    },
    {
      id: 'tpl-error',
      type: 'error',
      sections: []
    }
  ]
};
