export interface Palette {
  id: string;
  name: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    muted: string;
  };
}

export const CURATED_PALETTES: Palette[] = [
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      background: '#e0f2fe', // sky-100
      text: '#0c4a6e',       // sky-900
      primary: '#0284c7',    // sky-600
      muted: '#bae6fd'       // sky-200
    }
  },
  {
    id: 'indigo',
    name: 'Indigo',
    colors: {
      background: '#e0e7ff', // indigo-100
      text: '#312e81',       // indigo-900
      primary: '#4f46e5',    // indigo-600
      muted: '#c7d2fe'       // indigo-200
    }
  },
  {
    id: 'violet',
    name: 'Violet',
    colors: {
      background: '#ede9fe', // violet-100
      text: '#4c1d95',       // violet-900
      primary: '#7c3aed',    // violet-600
      muted: '#ddd6fe'       // violet-200
    }
  },
  {
    id: 'rose',
    name: 'Rose',
    colors: {
      background: '#ffe4e6', // rose-100
      text: '#881337',       // rose-900
      primary: '#e11d48',    // rose-600
      muted: '#fecdd3'       // rose-200
    }
  },
  {
    id: 'amber',
    name: 'Amber',
    colors: {
      background: '#fef3c7', // amber-100
      text: '#78350f',       // amber-900
      primary: '#d97706',    // amber-600
      muted: '#fde68a'       // amber-200
    }
  },
  {
    id: 'sage',
    name: 'Sage',
    colors: {
      background: '#ecfdf5', // emerald-50
      text: '#064e3b',       // emerald-900
      primary: '#059669',    // emerald-600
      muted: '#d1fae5'       // emerald-100
    }
  }
];
