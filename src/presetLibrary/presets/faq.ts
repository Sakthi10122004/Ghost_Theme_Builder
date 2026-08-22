import { SectionPreset } from '../types';

export const faqPresets: SectionPreset[] = [
  {
  "id": "faq-v1",
  "category": "faq",
  "variantName": "Accordion",
  "keywords": [
    "faq",
    "accordion"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Accordion",props: {
      "title": {
            "kind": "static",
            "value": "Sample Accordion"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "faq-v2",
  "category": "faq",
  "variantName": "Two-Column",
  "keywords": [
    "faq",
    "two column"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Two-Column",props: {
      "title": {
            "kind": "static",
            "value": "Sample Two-Column"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr"},responsiveStyles: {}})
},
  {
  "id": "faq-v3",
  "category": "faq",
  "variantName": "Searchable",
  "keywords": [
    "faq",
    "searchable"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Searchable",props: {
      "title": {
            "kind": "static",
            "value": "Sample Searchable"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "faq-v4",
  "category": "faq",
  "variantName": "Grid-of-Cards",
  "keywords": [
    "faq",
    "grid of cards"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Grid-of-Cards",props: {
      "title": {
            "kind": "static",
            "value": "Sample Grid-of-Cards"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)"},responsiveStyles: {}})
},
  {
  "id": "faq-v5",
  "category": "faq",
  "variantName": "Categorized-Tabs",
  "keywords": [
    "faq",
    "categorized tabs"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Categorized-Tabs",props: {
      "title": {
            "kind": "static",
            "value": "Sample Categorized-Tabs"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "faq-v6",
  "category": "faq",
  "variantName": "Minimalist List",
  "keywords": [
    "faq",
    "minimalist list"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Minimalist List",props: {
      "title": {
            "kind": "static",
            "value": "Sample Minimalist List"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"flex","flexDirection":"column"},responsiveStyles: {}})
},
  {
  "id": "faq-v7",
  "category": "faq",
  "variantName": "Split FAQ and CTA",
  "keywords": [
    "faq",
    "split faq and cta"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v7.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Split FAQ and CTA",props: {
      "title": {
            "kind": "static",
            "value": "Sample Split FAQ and CTA"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"grid","gridTemplateColumns":"2fr 1fr"},responsiveStyles: {}})
},
  {
  "id": "faq-v8",
  "category": "faq",
  "variantName": "Dark Mode FAQ",
  "keywords": [
    "faq",
    "dark mode faq"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v8.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Dark Mode FAQ",props: {
      "title": {
            "kind": "static",
            "value": "Sample Dark Mode FAQ"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"flex","flexDirection":"column","background":"#0f172a","color":"white"},responsiveStyles: {}})
},
  {
  "id": "faq-v9",
  "category": "faq",
  "variantName": "FAQ and Contact Form",
  "keywords": [
    "faq",
    "faq and contact form"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v9.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "FAQ and Contact Form",props: {
      "title": {
            "kind": "static",
            "value": "Sample FAQ and Contact Form"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr"},responsiveStyles: {}})
},
  {
  "id": "faq-v10",
  "category": "faq",
  "variantName": "Single Card Focus",
  "keywords": [
    "faq",
    "single card focus"
  ],
  "thumbnailPath": "/preset-thumbnails/faq-faq-v10.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "faq",name: "Single Card Focus",props: {
      "title": {
            "kind": "static",
            "value": "Sample Single Card Focus"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful faq section."
      }
},styles: {"display":"flex","justifyContent":"center"},responsiveStyles: {}})
}
];
