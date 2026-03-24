export interface ThemeColors {
  bg: string
  bg1: string
  bg2: string
  surface: string
  border: string
  accent: string
  accentSoft: string
  text: string
  text2: string
  text3: string
}

export interface Theme {
  id: string
  name: string
  mode: 'dark' | 'light'
  nav: string
  desc: string
  tags: string[]
  swatch: string
  colors: ThemeColors
}

export const THEMES: Theme[] = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    mode: 'dark',
    nav: 'Rail + Sidebar',
    desc: 'Sci-fi mission control. Deep navy with cyan glow accents.',
    tags: ['dark', 'futuristic', 'sci-fi'],
    swatch: 'linear-gradient(135deg, #030508 50%, #00d4ff)',
    colors: {
      bg: '#030508', bg1: '#080c12', bg2: '#0d1420',
      surface: '#141f33', border: 'rgba(99,179,237,0.08)',
      accent: '#00d4ff', accentSoft: 'rgba(0,212,255,0.1)',
      text: '#e8f4ff', text2: '#7a9bbf', text3: '#3d5a7a',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    mode: 'light',
    nav: 'Left Sidebar',
    desc: 'Clean premium SaaS. Warm white with soft purple accents.',
    tags: ['light', 'clean', 'professional'],
    swatch: 'linear-gradient(135deg, #f5f4f0 50%, #7c5cfc)',
    colors: {
      bg: '#f5f4f0', bg1: '#eeedea', bg2: '#ffffff',
      surface: '#fafaf8', border: 'rgba(0,0,0,0.07)',
      accent: '#7c5cfc', accentSoft: 'rgba(124,92,252,0.08)',
      text: '#111110', text2: '#6b6b67', text3: '#ababab',
    },
  },
  {
    id: 'forge',
    name: 'Forge',
    mode: 'dark',
    nav: 'Rail + Sidebar',
    desc: 'Industrial warmth. Amber copper on rich dark brown.',
    tags: ['dark', 'warm', 'industrial'],
    swatch: 'linear-gradient(135deg, #0f0d0a 50%, #f59e0b)',
    colors: {
      bg: '#0f0d0a', bg1: '#151210', bg2: '#1c1814',
      surface: '#2a231d', border: 'rgba(255,160,60,0.07)',
      accent: '#f59e0b', accentSoft: 'rgba(245,158,11,0.12)',
      text: '#fdf4e7', text2: '#a89070', text3: '#5c4a38',
    },
  },
  {
    id: 'phantom',
    name: 'Phantom',
    mode: 'dark',
    nav: 'Top Nav Only',
    desc: 'Editorial black & white. No sidebar whatsoever.',
    tags: ['dark', 'minimal', 'editorial'],
    swatch: 'linear-gradient(135deg, #0a0a0a 50%, #c9a84c)',
    colors: {
      bg: '#0a0a0a', bg1: '#111', bg2: '#181818',
      surface: '#1f1f1f', border: 'rgba(255,255,255,0.07)',
      accent: '#f0ede8', accentSoft: 'rgba(201,168,76,0.1)',
      text: '#f0ede8', text2: '#888', text3: '#444',
    },
  },
  {
    id: 'nova',
    name: 'Nova',
    mode: 'dark',
    nav: 'Top Pill Tabs',
    desc: 'Glassmorphism cards with pill nav. Deep purple midnight.',
    tags: ['dark', 'glass', 'modern'],
    swatch: 'linear-gradient(135deg, #0e0b1a 50%, #a78bfa)',
    colors: {
      bg: '#0e0b1a', bg1: '#130f22', bg2: '#18132e',
      surface: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.07)',
      accent: '#a78bfa', accentSoft: 'rgba(167,139,250,0.12)',
      text: '#f1eeff', text2: '#8b82b0', text3: '#4a4468',
    },
  },
  {
    id: 'ember',
    name: 'Ember',
    mode: 'dark',
    nav: 'Bottom Dock',
    desc: 'Luxury crimson with serif typography. Bottom dock navigation.',
    tags: ['dark', 'luxury', 'crimson'],
    swatch: 'linear-gradient(135deg, #0c0808 50%, #e05252)',
    colors: {
      bg: '#0c0808', bg1: '#120a0a', bg2: '#1a0e0e',
      surface: '#2a1515', border: 'rgba(220,80,60,0.08)',
      accent: '#e05252', accentSoft: 'rgba(224,82,82,0.08)',
      text: '#f5e6d8', text2: '#8a6a5a', text3: '#4a3028',
    },
  },
  {
    id: 'prism',
    name: 'Prism',
    mode: 'dark',
    nav: 'Wide Sidebar + Previews',
    desc: 'Data-dense intelligence. Wide sidebar with live lead previews.',
    tags: ['dark', 'data-dense', 'blue'],
    swatch: 'linear-gradient(135deg, #08090f 50%, #6478f0)',
    colors: {
      bg: '#08090f', bg1: '#0d0f1a', bg2: '#111422',
      surface: '#1c2035', border: 'rgba(100,120,240,0.09)',
      accent: '#6478f0', accentSoft: 'rgba(100,120,240,0.1)',
      text: '#e2e8f8', text2: '#6b7aaa', text3: '#343d60',
    },
  },
  {
    id: 'void',
    name: 'Void',
    mode: 'dark',
    nav: 'Right Panel Nav',
    desc: 'Brutalist monochrome. Nav on the right. Single electric green accent.',
    tags: ['dark', 'brutalist', 'mono'],
    swatch: 'linear-gradient(135deg, #050505 50%, #00ff88)',
    colors: {
      bg: '#050505', bg1: '#0a0a0a', bg2: '#0f0f0f',
      surface: '#141414', border: 'rgba(255,255,255,0.06)',
      accent: '#00ff88', accentSoft: 'rgba(0,255,136,0.08)',
      text: '#ffffff', text2: '#666', text3: '#333',
    },
  },
  {
    id: 'silk',
    name: 'Silk',
    mode: 'light',
    nav: 'Floating Center Nav',
    desc: 'Luxury light with floating pill bar. Sage green on warm cream.',
    tags: ['light', 'luxury', 'premium'],
    swatch: 'linear-gradient(135deg, #f7f5f0 50%, #3d6b4f)',
    colors: {
      bg: '#f7f5f0', bg1: '#f2efe9', bg2: '#fefefe',
      surface: '#ffffff', border: 'rgba(0,0,0,0.07)',
      accent: '#3d6b4f', accentSoft: 'rgba(61,107,79,0.08)',
      text: '#1a1a16', text2: '#6b6757', text3: '#aba898',
    },
  },
]
