import { SectionPreset } from '../types';

export const headerPresets: SectionPreset[] = [
  {
  "id": "header-v1",
  "category": "header",
  "variantName": "Standard",
  "keywords": [
    "header",
    "standard"
  ],
  "thumbnailPath": "/preset-thumbnails/header-header-v1.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "header",name: "Standard",props: {
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "nav": {
            "kind": "navigation",
            "variant": "primary"
      },
      "search": {
            "kind": "static",
            "value": "icon"
      },
      "signin": {
            "kind": "portal",
            "action": "signin",
            "label": "Sign In"
      },
      "signup": {
            "kind": "portal",
            "action": "signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "header-v2",
  "category": "header",
  "variantName": "Logo Left",
  "keywords": [
    "header",
    "logo left"
  ],
  "thumbnailPath": "/preset-thumbnails/header-header-v2.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "header",name: "Logo Left",props: {
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "nav": {
            "kind": "navigation",
            "variant": "primary"
      },
      "search": {
            "kind": "static",
            "value": "icon"
      },
      "signin": {
            "kind": "portal",
            "action": "signin",
            "label": "Sign In"
      },
      "signup": {
            "kind": "portal",
            "action": "signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","justifyContent":"space-between","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "header-v3",
  "category": "header",
  "variantName": "Centered Logo",
  "keywords": [
    "header",
    "centered logo"
  ],
  "thumbnailPath": "/preset-thumbnails/header-header-v3.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "header",name: "Centered Logo",props: {
      "nav": {
            "kind": "navigation",
            "variant": "primary"
      },
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "actions": {
            "kind": "static",
            "value": "search | signin | signup"
      }
},styles: {"display":"grid","gridTemplateColumns":"1fr auto 1fr","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "header-v4",
  "category": "header",
  "variantName": "Minimal",
  "keywords": [
    "header",
    "minimal"
  ],
  "thumbnailPath": "/preset-thumbnails/header-header-v4.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "header",name: "Minimal",props: {
      "nav": {
            "kind": "navigation",
            "variant": "primary"
      },
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "search": {
            "kind": "static",
            "value": "icon"
      }
},styles: {"display":"flex","justifyContent":"space-between"},responsiveStyles: {}})
},
  {
  "id": "header-v5",
  "category": "header",
  "variantName": "Subscribe Focus",
  "keywords": [
    "header",
    "subscribe focus"
  ],
  "thumbnailPath": "/preset-thumbnails/header-header-v5.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "header",name: "Subscribe Focus",props: {
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "signup": {
            "kind": "portal",
            "action": "signup",
            "label": "Subscribe"
      },
      "nav": {
            "kind": "navigation",
            "variant": "primary"
      }
},styles: {"display":"flex","flexDirection":"column","alignItems":"center"},responsiveStyles: {}})
},
  {
  "id": "header-v6",
  "category": "header",
  "variantName": "Creator Minimal",
  "keywords": [
    "header",
    "creator minimal"
  ],
  "thumbnailPath": "/preset-thumbnails/header-header-v6.svg",
  "buildSection": () => ({id: `sec-${Date.now()}-${Math.random().toString(36).substring(7)}`,type: "header",name: "Creator Minimal",props: {
      "nav": {
            "kind": "navigation",
            "variant": "primary"
      },
      "logo": {
            "kind": "binding",
            "source": "site",
            "field": "logo"
      },
      "signup": {
            "kind": "portal",
            "action": "signup",
            "label": "Subscribe"
      }
},styles: {"display":"flex","justifyContent":"space-between"},responsiveStyles: {}})
}
];
