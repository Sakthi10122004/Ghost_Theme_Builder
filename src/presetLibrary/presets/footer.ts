import { SectionPreset } from '../types';

export const footerPresets: SectionPreset[] = [
  {
  "id": "footer-v1",
  "category": "footer",
  "variantName": "Standard",
  "keywords": [
    "footer",
    "standard"
  ],
  "thumbnailPath": "/preset-thumbnails/footer-footer-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "footer",name: "Standard",props: {
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "nav": {
            "kind": "navigation",
            "variant": "secondary"
      },
      "copyright": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr 2fr 1fr"},responsiveStyles: {}})
},
  {
  "id": "footer-v2",
  "category": "footer",
  "variantName": "Centered",
  "keywords": [
    "footer",
    "centered"
  ],
  "thumbnailPath": "/preset-thumbnails/footer-footer-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "footer",name: "Centered",props: {
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "nav": {
            "kind": "navigation",
            "variant": "secondary"
      },
      "copyright": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "footer-v3",
  "category": "footer",
  "variantName": "Centered Minimal",
  "keywords": [
    "footer",
    "centered minimal"
  ],
  "thumbnailPath": "/preset-thumbnails/footer-footer-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "footer",name: "Centered Minimal",props: {
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "copyright": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "footer-v4",
  "category": "footer",
  "variantName": "Stacked Full",
  "keywords": [
    "footer",
    "stacked full"
  ],
  "thumbnailPath": "/preset-thumbnails/footer-footer-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "footer",name: "Stacked Full",props: {
      "top": {
            "kind": "binding",
            "source": "site",
            "field": "logo + description | nav"
      },
      "bottom": {
            "kind": "static",
            "value": "copyright | social"
      }
},styles: {"display":"grid","gridTemplateRows":"auto auto"},responsiveStyles: {}})
},
  {
  "id": "footer-v5",
  "category": "footer",
  "variantName": "Stacked Social",
  "keywords": [
    "footer",
    "stacked social"
  ],
  "thumbnailPath": "/preset-thumbnails/footer-footer-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "footer",name: "Stacked Social",props: {
      "copyright": {
            "kind": "binding",
            "source": "site",
            "field": "title"
      },
      "social": {
            "kind": "binding",
            "source": "site",
            "field": "facebook | site.twitter"
      }
},styles: {"display":"flex","justifyContent":"space-between"},responsiveStyles: {}})
}
];
