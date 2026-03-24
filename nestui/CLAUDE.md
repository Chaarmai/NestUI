# NEST UI — Claude Code Project Bible

---

## PAUL Framework — Required Workflow

This project uses the **PAUL framework** for all Claude Code sessions. Follow this loop on every task, every phase, every fix.

**P — Prime**
Before writing any code, read this entire CLAUDE.md file. Then state out loud:
- What phase you are on
- What you are about to build
- What files you will create or modify
- What the acceptance criteria are

Wait for confirmation before proceeding.

**A — Action**
Build exactly what was confirmed in the Prime step. Stay in scope. Do not add unrequested features. Do not modify files outside the current phase unless required to fix a dependency.

**U — Understand**
After building, run validation:
```bash
npx tsc --noEmit   # must show zero errors
npm run build      # must succeed
npm run dev        # must load without console errors
```
Report results. If anything fails, fix it before declaring the phase done.

**L — Loop**
Only move to the next phase when:
1. All acceptance criteria from the phase prompt are met
2. TypeScript shows zero errors
3. The build passes
4. The developer has explicitly confirmed "ready for next phase"

Never skip the loop. Never self-advance to the next phase without confirmation.

---

## What Is Nest UI?
Nest UI is a SaaS product that lets GoHighLevel (GHL) agencies completely rebrand their GHL dashboard with premium themes — making it unrecognizable as GHL. Agencies install one `<script>` tag into GHL once, then use the Nest UI dashboard to pick and apply themes instantly, account-wide, with zero code knowledge required.

**Live product URL target:** nestui.io  
**Tech stack:** React + Vite, Supabase, Tailwind CSS, Vercel  
**Current phase:** MVP build  

---

## Core Problem We're Solving
GHL's white-label options only let agencies change colors. Nest UI goes layers deeper — replacing the entire UI skin, navigation structure, icons, typography, and component design — so the dashboard looks like a custom $500K CRM, not GoHighLevel.

---

## Tech Stack (Strict — Do Not Deviate)
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS (utility classes only, no custom CSS files unless necessary)
- **Backend/DB:** Supabase (auth, database, storage)
- **Hosting:** Vercel
- **Payments:** Stripe (for agency subscriptions)
- **Language:** TypeScript throughout
- **State:** Zustand for global state
- **Routing:** React Router v6

---

## Project File Structure
```
nestui/
├── CLAUDE.md                  ← this file, always read first
├── .env.local                 ← env vars (never commit)
├── vite.config.ts
├── tailwind.config.ts
├── package.json
├── public/
│   └── nestui-logo.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── lib/
│   │   ├── supabase.ts        ← supabase client
│   │   ├── stripe.ts          ← stripe helpers
│   │   └── themes.ts          ← theme definitions & engine
│   ├── store/
│   │   └── useAppStore.ts     ← zustand global store
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useThemes.ts
│   │   └── useWorkspace.ts
│   ├── components/
│   │   ├── ui/                ← reusable primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Spinner.tsx
│   │   ├── layout/
│   │   │   ├── Topbar.tsx
│   │   │   ├── LeftPanel.tsx
│   │   │   └── PageShell.tsx
│   │   ├── themes/
│   │   │   ├── ThemeGrid.tsx
│   │   │   ├── ThemeCard.tsx
│   │   │   ├── ThemePreview.tsx
│   │   │   └── ApplyModal.tsx
│   │   └── onboarding/
│   │       ├── ConnectGHL.tsx
│   │       └── InstallSnippet.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx      ← main theme studio
│   │   ├── Onboarding.tsx
│   │   ├── Settings.tsx
│   │   └── Billing.tsx
│   └── inject/                ← THE GHL INJECTION SCRIPT
│       ├── inject.ts          ← compiled and served at nestui.io/inject.js
│       └── themes/
│           ├── obsidian.css
│           ├── aurora.css
│           ├── forge.css
│           ├── phantom.css
│           ├── nova.css
│           ├── ember.css
│           ├── prism.css
│           ├── void.css
│           └── silk.css
```

---

## Supabase Database Schema

### Table: `workspaces`
```sql
id              uuid primary key default gen_random_uuid()
created_at      timestamptz default now()
owner_id        uuid references auth.users(id)
name            text not null
ghl_subdomain   text unique           -- e.g. "apex-growth"
ghl_connected   boolean default false
api_key         text                  -- encrypted GHL API key
active_theme_id text default 'obsidian'
theme_applied_at timestamptz
plan            text default 'free'   -- 'free' | 'pro' | 'agency'
stripe_customer_id text
```

### Table: `theme_applications`
```sql
id              uuid primary key default gen_random_uuid()
workspace_id    uuid references workspaces(id)
theme_id        text not null
applied_at      timestamptz default now()
applied_by      uuid references auth.users(id)
```

### Table: `sub_accounts`
```sql
id              uuid primary key default gen_random_uuid()
workspace_id    uuid references workspaces(id)
ghl_account_id  text not null
name            text
active_theme_id text
created_at      timestamptz default now()
```

---

## Environment Variables (.env.local)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_APP_URL=http://localhost:5173
```

---

## The 9 Themes — Full Definitions

Each theme has an `id`, display metadata, and a full CSS variable set. The inject script reads the active theme from Supabase and injects the correct CSS into GHL.

```typescript
// src/lib/themes.ts

export interface Theme {
  id: string
  name: string
  mode: 'dark' | 'light'
  nav: string
  desc: string
  tags: string[]
  swatch: string        // CSS gradient for preview swatch
  colors: ThemeColors
}

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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
]
```

---

## The Inject Script — How It Works

This is the heart of Nest UI. It lives at `nestui.io/inject.js` and is pasted once into GHL's custom code settings.

```typescript
// src/inject/inject.ts
// This gets compiled to a single JS file and served publicly

(async () => {
  const key = document.currentScript?.getAttribute('data-key')
  if (!key) return

  try {
    // Fetch active theme for this workspace key
    const res = await fetch(`https://nestui.io/api/theme?key=${key}`)
    const { themeId } = await res.json()
    if (!themeId) return

    // Inject the theme CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://nestui.io/themes/${themeId}.css`
    link.id = 'nestui-theme'
    document.head.appendChild(link)

    // Remove GHL branding elements
    removeGHLBranding()

    // Watch for DOM changes (GHL is a SPA)
    const observer = new MutationObserver(() => removeGHLBranding())
    observer.observe(document.body, { childList: true, subtree: true })

  } catch (e) {
    console.warn('[Nest UI] Could not load theme:', e)
  }

  function removeGHLBranding() {
    // Remove GHL logo, "Powered by" text, default colors
    const selectors = [
      '[data-testid="ghl-logo"]',
      '.powered-by-ghl',
      '.hl-branding',
    ]
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        (el as HTMLElement).style.display = 'none'
      })
    })
  }
})()
```

---

## API Routes (Supabase Edge Functions)

### GET /api/theme?key={workspaceKey}
Returns the active theme for a workspace. Called by the inject script on every GHL page load.

```typescript
// Response
{ themeId: string, updatedAt: string }
```

### POST /api/apply-theme
Called by the Nest UI dashboard when an agency applies a theme.

```typescript
// Request body
{ workspaceId: string, themeId: string }

// Response
{ success: boolean, appliedAt: string }
```

---

## Pricing / Plans

| Plan | Price | Themes | Sub-accounts | AI Generator |
|------|-------|--------|--------------|--------------|
| Free | $0/mo | 3 themes | 1 account | ✗ |
| Pro | $97/mo | All 9 themes | 5 accounts | ✓ |
| Agency | $297/mo | All + custom | Unlimited | ✓ |

---

## Build Phases

### Phase 1 — Foundation (Week 1–2) ← START HERE
- [ ] Vite + React + TypeScript scaffold
- [ ] Tailwind config with Nest UI design tokens
- [ ] Supabase project setup + schema migration
- [ ] Auth (email/password + magic link via Supabase)
- [ ] Basic routing (Login → Onboarding → Dashboard)

### Phase 2 — Theme Studio (Week 3–5)
- [ ] Theme grid with all 9 theme cards
- [ ] Mini preview thumbnails for each theme
- [ ] Apply modal with loading + success states
- [ ] Left panel: connection status, active theme, quick actions
- [ ] Filter bar (All / Dark / Light)

### Phase 3 — GHL Integration (Week 6–8)
- [ ] GHL OAuth connection flow
- [ ] Workspace creation on connect
- [ ] Inject script build pipeline (Vite lib mode)
- [ ] Theme CSS files for each of the 9 themes
- [ ] API endpoint: GET /api/theme
- [ ] API endpoint: POST /api/apply-theme
- [ ] Install snippet UI with copy button

### Phase 4 — Billing (Week 9–11)
- [ ] Stripe integration
- [ ] Plan selection UI
- [ ] Upgrade/downgrade flows
- [ ] Billing portal (Stripe customer portal)

### Phase 5 — Polish & Launch (Week 12–14)
- [ ] AI Theme Generator (Claude API → custom theme)
- [ ] Sub-account management
- [ ] Push themes to sub-accounts
- [ ] Onboarding checklist
- [ ] Marketing landing page at nestui.io

---

## Design System — Nest UI Brand

### Colors
```css
--nestui-blue: #5b8fff
--nestui-blue-soft: rgba(91,143,255,0.11)
--nestui-bg: #0b0c10
--nestui-bg1: #10111a
--nestui-surface: #23243a
--nestui-border: rgba(255,255,255,0.07)
--nestui-text: #eeeef5
--nestui-text2: #8585a8
```

### Logo
Nested hexagon — three concentric hexagonal shapes suggesting layers/nesting, with a white center dot. SVG is in `/public/nestui-logo.svg`.

### Typography
- Font: Inter (Google Fonts)
- Mono: JetBrains Mono (for code snippets, badges, metadata)

---

## Adding New Themes — The Pattern

The theme system is designed to grow indefinitely. Adding a new theme always follows this exact 4-step pattern — never deviate:

### Step 1 — Add to `src/lib/themes.ts`
Append a new `Theme` object to the `THEMES` array. Every field is required. The `id` must be lowercase, no spaces, and permanent — never change it once live.

### Step 2 — Create `src/inject/themes/[id].css`
Scope all rules to `body.nestui-active.nestui-[id]`. Override GHL's color variables, surfaces, nav, cards, text, borders, and buttons. Follow the exact same structure as existing theme CSS files.

### Step 3 — Add mini preview case to `ThemePreview.tsx`
The `ThemePreview` component has a switch statement keyed on `theme.id`. Add a new `case '[id]'` that renders an accurate miniature representation of the theme's nav layout using the theme's colors.

### Step 4 — New layout component (only if new nav pattern)
If the theme introduces a nav structure that doesn't exist yet (e.g. split panel, mega nav, collapsible sidebar), create `src/inject/layouts/[id]-layout.ts`. This file runs inside GHL and repositions nav elements via CSS/DOM manipulation. Must be non-destructive.

### What NOT to do
- Never modify an existing theme entry
- Never change a theme's `id` after it's been used by any workspace
- Never hardcode theme colors anywhere except `themes.ts` and the CSS file
- Never add theme logic directly to page components — it all goes through `useThemes()` hook

### The theme grid, apply modal, filter pills, left panel, and inject engine all automatically pick up any new entry in the THEMES array. Zero other changes needed.

---

## Planned Theme Expansions

| ID | Name | Mode | Nav | Status |
|----|------|------|-----|--------|
| obsidian | Obsidian | Dark | Rail + Sidebar | ✅ |
| aurora | Aurora | Light | Left Sidebar | ✅ |
| forge | Forge | Dark | Rail + Sidebar | ✅ |
| phantom | Phantom | Dark | Top Nav Only | ✅ |
| nova | Nova | Dark | Top Pill Tabs | ✅ |
| ember | Ember | Dark | Bottom Dock | ✅ |
| prism | Prism | Dark | Wide Sidebar | ✅ |
| void | Void | Dark | Right Panel | ✅ |
| silk | Silk | Light | Floating Nav | ✅ |
| carbon | Carbon | Dark | Collapsible Sidebar | 🔲 |
| arctic | Arctic | Light | Mega Nav | 🔲 |
| velvet | Velvet | Dark | Split Panel | 🔲 |
| sage | Sage | Light | Left Sidebar | 🔲 |
| vault | Vault | Dark | Left Sidebar | 🔲 |
| neon | Neon | Dark | Pill Tabs | 🔲 |

Use `prompts/add-new-theme.md` to build any of the 🔲 themes, or invent new ones.

---

## Claude Code Behavior Rules

1. **Always read this file first** before writing any code.
2. **Never use** `create-react-app`, class components, or `any` TypeScript type.
3. **Always use** functional components with TypeScript interfaces.
4. **Tailwind only** for styling — no inline styles except where Tailwind can't reach (e.g. dynamic CSS custom properties).
5. **Supabase client** lives in `src/lib/supabase.ts` — never instantiate it elsewhere.
6. **Error handling** on every async operation — no silent failures.
7. **Mobile responsive** — every component works at 375px+.
8. When building a new component, **check `src/components/ui/`** for existing primitives before creating new ones.
9. **Commit messages** follow conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`.
10. All **theme data** lives in `src/lib/themes.ts` — never hardcode theme info in components.

---

## Key Reference: The Studio UI

The Nest UI dashboard (already fully designed as an HTML prototype) is at:
`/mnt/user-data/outputs/nestui-studio.html`

Use this as the **exact visual reference** when building React components. The prototype shows:
- Topbar with Nest UI logo, workspace switcher, plan badge, avatar
- Left panel: connection badge, active theme card, tools list, install snippet
- Right panel: theme grid with filter pills, theme cards with mini previews, hover apply button
- Modal: confirm → loading → success states

Match this design precisely in React/Tailwind.
