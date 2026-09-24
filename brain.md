# brain.md — SURVIVE

Single source of truth for status, decisions, and the parallel task board.
_Last updated: 2026-09-24_

## Product
Privacy-first personal + business financial survival planner. Core question:
**If income/revenue stopped today, how long could the money last, and what can be
temporarily cut to buy more time?**

- Deterministic math only. No AI in calculations or recommendations.
- Modes: Personal · Business · Both (side-by-side, **never** combine funds).
- V1 works 100% offline. No login/DB required.

## Stack (locked)
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 (CSS-first) ·
Lucide (icons only) · Vercel. Pure CSS/Tailwind motion (no Framer Motion needed).
Test runner: Vitest (required by "tests must pass"). No other runtime deps.

## Key decisions
- **Database:** User provided a Neon URL. The locked spec lists **no** DB-backed
  feature and says "V1 works completely without login or database". Per YAGNI we
  do **not** add a DB dependency or feature in V1. `DATABASE_URL` is kept in env
  (gitignored + Vercel env) reserved for a future V2. Nothing in V1 reads it.
- **Share:** fully client-side, privacy-safe (no financial amounts) — Web Share
  API + clipboard. No server, no stored data.
- **Validation:** isomorphic pure functions. All client inputs validated; data
  loaded from localStorage is sanitized (untrusted input path).
- **Theme:** single polished light theme using locked tokens (dark mode = YAGNI).
- **Reduce factor:** an expense marked "Reduce" with no explicit reduced amount
  defaults to 50% of original.
- **Depletion date:** estimate using 30.4375 days/month (labelled "estimated").
- Default currency: PKR (first in list).

## Parallel task board
| Track | Scope | Status |
|-------|-------|--------|
| A Foundation | init, design system, logo, layout, nav, footer, 404 | ✅ done |
| B Calc engine | pure functions + unit tests (43 passing) | ✅ done |
| C Calculator UI | multi-step form, mode selector, localStorage, validation | ✅ done |
| D Results | hierarchy, survival mode, SVG graph, share, export | ✅ done |
| E Marketing/SEO | homepage, educational pages, full metadata | ✅ done |
| F Hardening | security headers, a11y, perf, tests, CI | ✅ done |

## Live
- Production: https://survive-ivory.vercel.app  ("survive" name was taken)
- Repo: https://github.com/uncrownedprince786-collab/Survive (main; Vercel auto-deploy connected)
- Vercel project: uncrownedprince786-6663s-projects/survive
- lint · typecheck · 43 tests · build all pass. Security headers + CSP verified live.

## Routes
`/` `/calculator` `/results` `/how-it-works` `/about` `/privacy` `/terms`
`not-found` · `sitemap.ts` · `robots.ts` · `manifest`

## Env
- `NEXT_PUBLIC_SITE_URL` — canonical origin (set after deploy).
- `DATABASE_URL` — reserved (unused in V1).

## Ship checklist
- [x] lint · [x] typecheck · [x] test · [x] production build
- [x] push to github.com/uncrownedprince786-collab/Survive
- [x] Vercel deploy + set `NEXT_PUBLIC_SITE_URL` (+ DATABASE_URL reserved)

## Post-launch (owner action)
- Submit sitemap in Google Search Console (verify domain first) to accelerate indexing.
- Optionally add a custom domain in Vercel and update `NEXT_PUBLIC_SITE_URL`.
- Rotate the Neon DB password (it was shared in plaintext).
