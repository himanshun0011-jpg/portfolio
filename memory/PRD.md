# PRD — DUARTE® Portfolio

## Original problem statement
"using this reference build me exact same portfolio for me https://www.studioloop.com.br/?ref=a1.gallery"
Goal: recreate the Studio Loop-style portfolio structure and vibe as an original, award-worthy personal portfolio (not a copy of their copy/assets). User answers: use own name (not provided yet — placeholder brand "DUARTE"), craft = web design / UI-UX + motion/animation, real project details to be provided later (placeholders in use), socials placeholders, theme = designer decides.

## Architecture
- Frontend: React (CRA/craco) single-page site, Tailwind, framer-motion (reveals, modals, parallax), Lenis smooth momentum scrolling, sonner toasts, lucide-react icons.
- Backend: FastAPI, `/api` prefix. Endpoints: GET `/api/health`, POST `/api/newsletter` (email validation, dedupe, stores in MongoDB `subscribers`).
- DB: MongoDB via MONGO_URL/DB_NAME (preview environment).
- Content: all editable site content centralized in `/app/frontend/src/data/content.js` (brand name, projects, services, clients, images).

## User personas
- Prospective client browsing work and capabilities, contacting via email/newsletter.
- Portfolio owner (user) swapping placeholder brand/projects for their own.

## Core requirements (static)
1. Kinetic hero with masked line-by-line reveal, bracketed location label, year, image marquee strip.
2. Numbered services index (01–05) with expandable rows.
3. "Who we are" studio statement section (dark) with parallax imagery.
4. Giant scrolling wordmark.
5. Filterable selected-work grid (All / UI-UX / Motion & 3D / Branding) with case-detail modal.
6. Slow client wordmark marquee.
7. Big typographic CTA + newsletter signup + footer with live São Paulo clock.

## Implemented (2026-07-22)
- Full single-page portfolio: Nav (glass on scroll, mobile menu), Hero (masked reveal, kinetic image marquee, parallax fade), Services accordion, About (dark editorial, parallax images), giant "DUARTE®" wordmark with scroll-linked drift, Work grid + filters + project modal, Clients marquee, CTA + newsletter (backend-persisted), Footer with live clock and back-to-top.
- Original SVG logo mark (loop "D") used in nav, footer, and favicon.svg.
- Custom palette: paper #F6F5F2, ink #121212, acid #CCFF00, vermilion #E63946. Fonts: Syne / Plus Jakarta Sans / JetBrains Mono.
- Fixed: framer-motion whileInView not firing → hand-rolled IntersectionObserver Reveal; hero headline overflow on small screens.
- Verified: backend health + newsletter (ok/dup/invalid) via curl; full page flows via screenshots at 1366/768/375.

## Backlog
- P0: Swap placeholder brand "DUARTE" for user's real name/brand; replace placeholder projects with user's real work; real email + social links (content.js).
- P1: Individual case-study pages per project; contact form with email delivery (Resend); about page with story/process.
- P2: Dark/light toggle; custom cursor; page transitions; WebGL hero object; blog/notes section; SEO + OG images; analytics.

## Next tasks
1. Collect real name, projects, email, socials from user and update content.js.
2. Add case-study detail routes.
3. Wire newsletter to an email provider if real sending is needed.
