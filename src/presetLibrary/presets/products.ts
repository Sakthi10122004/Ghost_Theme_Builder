import { SectionPreset } from '../types';

export const productsPresets: SectionPreset[] = [
  {
  "id": "products-v1",
  "category": "products",
  "variantName": "Pricing Tiers 3-Column",
  "keywords": [
    "products",
    "pricing tiers 3 column"
  ],
  "thumbnailPath": "/preset-thumbnails/products-products-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "products",name: "Pricing Tiers 3-Column",props: {
      "title": {
            "kind": "static",
            "value": "Sample Pricing Tiers 3-Column"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful products section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)"},responsiveStyles: {}})
},
  {
  "id": "products-v2",
  "category": "products",
  "variantName": "Single Plan Highlight",
  "keywords": [
    "products",
    "single plan highlight"
  ],
  "thumbnailPath": "/preset-thumbnails/products-products-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "products",name: "Single Plan Highlight",props: {
      "title": {
            "kind": "static",
            "value": "Sample Single Plan Highlight"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful products section."
      }
},styles: {"display":"flex","justifyContent":"center"},responsiveStyles: {}})
},
  {
  "id": "products-v3",
  "category": "products",
  "variantName": "Monthly Yearly Toggle",
  "keywords": [
    "products",
    "monthly yearly toggle"
  ],
  "thumbnailPath": "/preset-thumbnails/products-products-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "products",name: "Monthly Yearly Toggle",props: {
      "title": {
            "kind": "static",
            "value": "Sample Monthly Yearly Toggle"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful products section."
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "products-v4",
  "category": "products",
  "variantName": "Feature Comparison",
  "keywords": [
    "products",
    "feature comparison"
  ],
  "thumbnailPath": "/preset-thumbnails/products-products-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "products",name: "Feature Comparison",props: {
      "title": {
            "kind": "static",
            "value": "Sample Feature Comparison"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful products section."
      }
},styles: {"display":"grid","gridTemplateColumns":"2fr 1fr 1fr 1fr"},responsiveStyles: {}})
},
  {
  "id": "products-v5",
  "category": "products",
  "variantName": "Membership Benefits Grid",
  "keywords": [
    "products",
    "membership benefits grid"
  ],
  "thumbnailPath": "/preset-thumbnails/products-products-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "products",name: "Membership Benefits Grid",props: {
      "title": {
            "kind": "static",
            "value": "Sample Membership Benefits Grid"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful products section."
      }
},styles: {"display":"grid","gridTemplateColumns":"repeat(3, 1fr)"},responsiveStyles: {}})
},
  {
  "id": "products-v6",
  "category": "products",
  "variantName": "Free vs Paid Callout",
  "keywords": [
    "products",
    "free vs paid callout"
  ],
  "thumbnailPath": "/preset-thumbnails/products-products-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "products",name: "Free vs Paid Callout",props: {
      "title": {
            "kind": "static",
            "value": "Sample Free vs Paid Callout"
      },
      "description": {
            "kind": "static",
            "value": "This is a beautiful products section."
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 1fr"},responsiveStyles: {}})
}
];
