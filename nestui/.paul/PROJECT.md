# Nest UI — Project Definition

## What
Nest UI is a SaaS that lets GoHighLevel agencies rebrand their GHL dashboard with premium themes via a single `<script>` tag injection.

## Tech Stack
React 18 + Vite, Supabase (auth/db/storage), Tailwind CSS, Vercel, Stripe, TypeScript, Zustand, React Router v6

## Value Proposition
Agencies install one script tag, pick a theme from the Nest UI dashboard, and their GHL instance looks like a custom $500K CRM.

## Pricing
- Free: $0/mo — 3 themes, 1 sub-account
- Pro: $97/mo ($79/mo annual) — All 9 themes, 5 sub-accounts, AI generator
- Agency: $399/mo ($329/mo annual) — All + custom themes, unlimited sub-accounts, AI generator

## Key Decisions
| Decision | Phase | Rationale |
|----------|-------|-----------|
| Agency price $399/mo (not $297) | 4 | User direction — higher revenue tier |
| Annual billing with ~20% discount | 4 | User request — incentivize annual commitment |

## Validated Requirements
- ✓ Stripe checkout flow — Phase 4
- ✓ Webhook subscription lifecycle — Phase 4
- ✓ Customer portal access — Phase 4
- ✓ Plan selection UI with pricing cards — Phase 4
- ✓ Monthly/annual billing toggle — Phase 4

---
*Last updated: 2026-03-23 after Phase 4*
