# SURVIVE

A privacy-first personal & business **financial runway calculator**. Answer one
question honestly: _if income or revenue stopped today, how long could the money
last — and what could you temporarily cut to buy more time?_

- **Deterministic math only** — no AI in calculations or recommendations.
- **Private by design** — everything runs in your browser. No account, no server,
  no analytics. Your plan is stored only in your own `localStorage`.
- **Personal · Business · Both** — Both shows two plans side by side and never
  merges the money.

## Tech

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vitest ·
deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run unit tests (calculation engine) |

## Environment

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_SITE_URL` — canonical origin, used for metadata, canonicals,
  sitemap and Open Graph. Set it to your deployed URL.
- `DATABASE_URL` — **reserved**. V1 is fully offline and does not read it.

## Project structure

```
app/          routes (home, calculator, results, content pages, SEO files)
components/    UI, plan inputs, result views
lib/          calculations (pure engine + tests), validation, formatting, seo
```

The calculation engine in `lib/calculations` is pure and unit-tested; the UI only
renders its output.

> SURVIVE provides informational estimates only and is **not** financial advice.
