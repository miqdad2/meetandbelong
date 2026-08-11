# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Next.js marketing/landing site for Meet & Belong, a friendship-circle community launching in Kuwait. The application form is a three-step wizard that submits to `app/api/apply/route.ts` — that route currently has no real destination wired up (no database, email service, or storage) and always responds 501, so submissions cannot succeed in production until a provider is chosen and the route is implemented. There is no WhatsApp integration anywhere in the site.

## Commands

- `npm run dev` — start the dev server (Next.js App Router, Turbopack by default)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)

There is no test suite configured in this repo.

## Architecture

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (imported via `@import "tailwindcss"` in `app/globals.css`, not a `tailwind.config` file).
- `app/page.tsx` is the landing page: hero, circle switcher, how-it-works, safety, pricing, FAQ, and the `join` section — all in one client component (`"use client"`). Content arrays (`circles`, `steps`, `fitPoints`, `faqs`) at the top of the file drive the repeated sections; edit those arrays rather than duplicating markup.
- `app/components/ApplicationForm.tsx` is the three-step application wizard used in the `join` section (About you → Your circle → Confirm). It owns all form state, per-step validation, focus management on error, and the submit call to `app/api/apply`. It receives `circleOptions` (derived from the `circles` array in `page.tsx`) as a prop rather than duplicating that list.
- `app/api/apply/route.ts` is the submission endpoint. It currently has no real destination and always returns 501 — see the comment in that file. Wiring up real submissions requires picking a provider (see the note at the bottom of this file) and replacing that handler.
- Static content pages under `app/privacy/`, `app/code-of-conduct/`, `app/cancellation/` are simple server components (no client interactivity), sharing the `.policy-page` styles from `globals.css`.
- `app/layout.tsx` sets global metadata (Open Graph, Twitter cards, JSON-LD-adjacent fields) — `metadataBase` is hardcoded to `https://meetandbelong.com`.
- `app/globals.css` is the entire visual system: CSS custom properties in `:root` (`--cream`, `--ink`, `--green`, `--orange`, `--sage`, `--white`, `--line`), hand-written responsive breakpoints at the bottom of the file (1050px / 820px / 620px / 480px / 360px, plus landscape and reduced-motion/hover queries), and a per-circle `--active` / `--active-soft` color pair set inline via `style` on `<main>` in `page.tsx` to theme the hero when the user switches circles. There's no CSS module or component-scoped styling — everything is global, class-name driven, and mostly single-line rule blocks appended chronologically (see the section comments like "Three-step application form").
- Deployment target is Vercel (`vercel.json` pins `framework: nextjs` and an explicit `npx next build` command). No environment variables are required today; enabling real form submission will require adding at least one (a provider API key or database URL, depending on the chosen destination).

## Application form submission — decision needed

`app/api/apply/route.ts` is a stub that always returns 501 so the client never shows a fake success. Before this can go to production, a provider decision is needed: e.g. a transactional email service (Resend/SendGrid) to email the team each submission, a database (Supabase/Postgres) to store applications, or a spreadsheet/webhook integration. Whichever is chosen needs credentials added as environment variables (in Vercel project settings, not committed) and the route handler updated to actually persist/send the payload before returning 200.
