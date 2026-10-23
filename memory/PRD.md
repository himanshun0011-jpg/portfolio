# PRD — Himanshu Nautiyal® Portfolio

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

- Added first batch of 5 real project images uploaded by Himanshu: VIVID LABS Cyberkit (3D cyberpunk hardware series, 3 artifacts) and BEAUVOIR Editorial (luxury haircare campaign, 2 artifacts).
- Integrated across the floating hero collage, the selected-work grid, capability hover previews, about section, client ticker, and added a multi-artifact project gallery to case pages.
- Verified via screenshots: hero floating collage, work grid, case pages for both projects with artifacts gallery.
- Batch 2 (2026-07-22): FIZZ & BLOOM botanical soda branding (5 artifacts: packaging six-packs, two flavour campaign portraits, Times Square OOH takeover). Added as first project in the grid (branding filter), hero collage portrait, client ticker. Verified grid, case page, gallery, branding filter.
- Batch 3 (2026-07-22): three AI motion graphic ads (2 beauty spots + 1 t-shirt ad). Grouped as "AI Motion Ads" project (motion filter) with video support across work cards, case hero and artifact gallery. Videos transcoded/remuxed to H.264 faststart, self-hosted at /media/*.mp4 (beauty-product-ad 11.6MB → 1.4MB); poster frame extracted. NOTE: headless test browser lacks H.264 codec — playback verified via codec/container inspection + serving checks (200 video/mp4), not visually.
- Batch 4 (2026-07-22): two VIVID LABS videos (SKYBREACH transmission + ENGINEERING LOG_08) added to the vivid-labs case gallery, remuxed faststart at /media/vivid-skybreach.mp4 and /media/vivid-engineering-log.mp4. Verified: 200 video/mp4 serving + 5 gallery items / 2 video elements in DOM.
- First-visit-per-session preloader (sessionStorage flag `duarte_intro`): ink panel with masked tagline + wordmark reveal, giant 0→100 counter (framer-motion tween), acid progress hairline, scroll locked while loading; exits with an upward curtain lift that hands off to the hero reveal via a `duarte:intro-done` window event gating hero animations.
- Verified: counter mid-run, lift, hero revealed after, scroll/Lenis resumed, repeat visit skips preloader.

## Content repositioning (2026-07-22, user-directed)
- Hero: headline "SOCIAL CONTENT THAT SELLS.", audience line "[ for small businesses · startups · d2c brands ]", availability "Available now".
- Capabilities replaced with real services: Social Media Management, Content Creation, Graphic Design, Ad Creatives, Reels & AI Video (1-line descriptions).
- Client marquee: real names only (FIZZ & BLOOM, VIVID LABS, BEAUVOIR); placeholders removed.
- About: first person — "[ who i am ]", "One designer. Founder of SocialFloe." + SocialFloe statement; fixed word-spacing bug in scroll-highlight text.
- CTA: "LET'S MAKE SOMETHING WORTH SHARING." + Book a call (mailto fallback) + WhatsApp button (PLACEHOLDER link — needs real number); newsletter removed per user request.
- New Proof section: Top Rated Plus on Upwork badge card (PLACEHOLDER upwork.com link — needs real profile URL) + 3 testimonial cards (PLACEHOLDER quotes — user to send real ones).
- Verified via screenshots: hero (desktop+mobile), services, about, proof, contact.
## Static-only conversion (2026-07-22, user-directed)
- Frontend is now 100% static: zero axios/API calls remain (grep-verified), sonner Toaster removed.
- New "drop a brief" contact form (name/email/message) in Contact: posts to Formspree when `BRAND.formspree` endpoint is set in content.js, otherwise mailto compose fallback with prefilled subject/body; inline success state. Verified via form fill + submit.
- /app/frontend/vercel.json handles SPA rewrites; deploys to Vercel as frontend-only (root dir `frontend`). Backend folder unused by the site.

## Theme swap to Studio Loop palette (2026-07-22, user-directed)
- Reference palette applied: cream #F7F6F0 paper, chocolate #2C180F ink, orange-red accent; Inter Tight + Instrument Serif typography; SVG logos recolored.
- Verified via testing agent (iteration_1): body bg rgb(247,246,240), text rgb(44,24,15), nav/sections render correctly.

## Services hover preview → 3D orb effect (2026-07-22, user-directed)
- Replaced cursor-following project image on service-row hover with an animated holographic orb: floating 3D sphere (rotating conic gradient + radial highlight/shadow shading), two tilted dashed orbit rings with satellite dots, ambient color glow, per-service warm hue variations, service number label. Pure CSS/framer-motion, no images.
- Removed now-unused SERVICES[].image field from content.js.
- Verified via screenshot: orb renders on hover at 1366px, rows dim correctly, layout intact.

## Upwork profile link fix (2026-07-22, user-reported bug)
- Testimonials.jsx Upwork badge card (data-testid="upwork-badge-link") href changed from generic upwork.com to https://www.upwork.com/freelancers/himanshunautiyal?mp_source=share.
- Verified via testing agent (iteration_1, 100% frontend pass): href exact match, testimonials section + theme intact.

## Backlog
- P0: Swap placeholder brand "DUARTE" for user's real name/brand; replace placeholder projects with user's real work; real email + social links (content.js).
- P1: Individual case-study pages per project; contact form with email delivery (Resend); about page with story/process.
- P2: Dark/light toggle; custom cursor; page transitions; WebGL hero object; blog/notes section; SEO + OG images; analytics.

## Next tasks
1. Collect real name, projects, email, socials from user and update content.js.
2. Add case-study detail routes.
3. Wire newsletter to an email provider if real sending is needed.
