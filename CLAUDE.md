# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Next.js marketing/landing site for Meet & Belong, a friendship-circle community launching in Kuwait. There is no backend, database, or API — the entire "signup flow" is a form that builds a WhatsApp deep link (`wa.me/96541103254?text=...`) and opens it in a new tab for the user to review and send manually.

## Commands

- `npm run dev` — start the dev server (Next.js App Router, Turbopack by default)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)

There is no test suite configured in this repo.

## Architecture

- Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (imported via `@import "tailwindcss"` in `app/globals.css`, not a `tailwind.config` file).
- `app/page.tsx` is the entire landing page: hero, circle switcher, how-it-works, safety, pricing, FAQ, and the WhatsApp application form — all in one client component (`"use client"`). Content arrays (`circles`, `steps`, `fitPoints`, `faqs`) at the top of the file drive the repeated sections; edit those arrays rather than duplicating markup.
- Static content pages under `app/privacy/`, `app/code-of-conduct/`, `app/cancellation/` are simple server components (no client interactivity), sharing the `.policy-page` styles from `globals.css`.
- `app/layout.tsx` sets global metadata (Open Graph, Twitter cards, JSON-LD-adjacent fields) — `metadataBase` is hardcoded to `https://meetandbelong.com`.
- `app/globals.css` is the entire visual system: CSS custom properties in `:root` (`--cream`, `--ink`, `--green`, `--orange`, `--sage`, `--white`, `--line`), hand-written responsive breakpoints at the bottom of the file (1050px / 820px / 620px / 480px / 360px, plus landscape and reduced-motion/hover queries), and a per-circle `--active` / `--active-soft` color pair set inline via `style` on `<main>` in `page.tsx` to theme the hero when the user switches circles. There's no CSS module or component-scoped styling — everything is global, class-name driven, and mostly single-line rule blocks appended chronologically (see the section comments like "Launch transparency, matching form and supporting pages").
- The WhatsApp contact number (`+965 4110 3254`) is duplicated as a literal string across `app/page.tsx` (multiple `wa.me` links) and `app/layout.tsx` (JSON-LD-like metadata) — update all occurrences together if it changes.
- Deployment target is Vercel (`vercel.json` pins `framework: nextjs` and an explicit `npx next build` command). No environment variables are required.
