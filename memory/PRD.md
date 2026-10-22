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

## Motion upgrade pass (2026-07-22, after user feedback vs reference animations)
- Velocity-reactive marquees (framer-motion useVelocity + skew + direction flip) for hero strip and client marquee.
- Hero: mouse-parallax on headline and strip, per-image bob/drift float, Lenis-driven anchor scrolling.
- Services: staggered row offsets, sibling dimming on hover, cursor-following floating image preview, mixed Syne + Instrument Serif italic vermilion accents, dashed dividers.
- About: scroll-linked word-by-word statement highlighting, drifting asterisk marks.
- Wordmark: letter-by-letter stagger reveal + scroll drift. Work cards: internal image parallax.
- Custom blend-mode cursor (desktop, fine pointers only) + nav hides on scroll down / shows on scroll up.
- Verified via screenshots: hero, services hover state, about partial/full highlight, wordmark, work grid, clients marquee.

## Floating collage hero + case-study pages (2026-07-22)
- Hero strip replaced with free-floating collage: 6 images absolutely positioned around the headline, each with continuous drift/rotation loops, depth-based mouse parallax, staggered pop-in on load; frosted-glass zone keeps headline readable.
- React Router added: `/` home and `/work/:id` case-study pages (masked word-by-word title, clip-path hero image reveal with scroll parallax, brief + facts grid, giant next-case footer link chaining all projects).
- Curtain route transitions (ink panel wipe via AnimatePresence mode="wait"); nav is route-aware (navigates home then scrolls to section); project cards now navigate to case pages (modal removed).
- Verified via screenshots: collage hero (1366 + 375), mid-transition curtain, case page, next-case chain (lumina → nova), back-to-home.

## Brand identity (2026-07-22, user-provided)
- Name: Himanshu Nautiyal (brand wordmark "HIMANSHU®"); email himanshun0011@gmail.com wired into all mailto links and footer.
- Logo mark redrawn as "H" (nav, footer, preloader, favicon.svg). Location line "[ from india to everywhere ]", footer clock switched to Asia/Kolkata ("New Delhi"). Socials still placeholders (user hasn't provided links).

## Branded preloader (2026-07-22)
- First-visit-per-session preloader (sessionStorage flag `duarte_intro`): ink panel with masked tagline + wordmark reveal, giant 0→100 counter (framer-motion tween), acid progress hairline, scroll locked while loading; exits with an upward curtain lift that hands off to the hero reveal via a `duarte:intro-done` window event gating hero animations.
- Verified: counter mid-run, lift, hero revealed after, scroll/Lenis resumed, repeat visit skips preloader.

## Backlog
- P0: Swap placeholder brand "DUARTE" for user's real name/brand; replace placeholder projects with user's real work; real email + social links (content.js).
- P1: Individual case-study pages per project; contact form with email delivery (Resend); about page with story/process.
- P2: Dark/light toggle; custom cursor; page transitions; WebGL hero object; blog/notes section; SEO + OG images; analytics.

## Next tasks
1. Collect real name, projects, email, socials from user and update content.js.
2. Add case-study detail routes.
3. Wire newsletter to an email provider if real sending is needed.
