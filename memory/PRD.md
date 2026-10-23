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

## Gallery breakpoint fix + project reorder (2026-07-23, user-reported)
- User's ~1000px window was getting the mobile stacked fallback (no scroll cycling). Gallery breakpoint lowered lg→md (768px+); tighter paddings/text for 768-1024px range; mobile stack now only <768px.
- Cycle speed increased: 70vh → 55vh per project so scrolling advances faster like the reference video.
- PROJECTS reordered: vivid-labs first, beauvoir-hair second, then pen-and-park, ai-motion-ads, fizz-bloom, placeholders last.
- Verified at 1000px + 1366px: title index renders, scroll advances projects (01→04), VIVID LABS first.

## Work section → scroll-driven gallery (2026-07-23, user-directed, replaces IG grid)
- IG-post grid replaced per user feedback with reference-video style: desktop = sticky full-screen scroll gallery (70vh per project) — left vertical title index (active title shifts right + turns vermilion, counter "0X — 09", titles clickable to jump via Lenis), right large media stage (76vh, rounded-2xl) with crossfade/scale/rise transitions between projects, category + year chips, hover "View case" pill → case page. Mobile = stacked large square posts. Videos supported in the stage.
- Also re-cropped penandpark images to exact white card bounds (removed dark edge slivers).
- Verified via screenshots: two scroll segments (active title + media switch correctly), mobile stack, clean card edges.

## Nav label change (2026-07-23, user-directed)
- Header nav "Studio" renamed to "About" (still anchors to #studio section). Verified via screenshot + nav-link-about testid.

## Work section → IG post style (2026-07-23, user-directed)
- "Selected Work" heading renamed to "Social Media Design".
- All project cards restyled like the user's reference (Instagram posts on dark bg): square aspect images with a social action bar below (Heart — fills orange on hover, MessageCircle, Send left; Bookmark right), title + year beneath. Works for video cards too.
- Filter pills (All / UI-UX / Motion & 3D / Branding) removed per user request; grid always shows all projects. FILTERS/AnimatePresence code removed.
- Verified via screenshots: full grid in IG-post presentation.

## New project: PEN & PARK DECOR (2026-07-23, user-uploaded)
- User uploaded Artboard 4.png (3-post furniture social carousel). Cropped into 3 clean post images (penandpark-1/2/3.jpg, chair/table/sofa) served from /public/media.
- Added as first project in Selected Work: filter "branding", category "Social Media / Content Design", 3-artifact gallery; added "PEN & PARK DECOR" to client marquee.
- Verified via screenshots: work grid card, case page hero + artifacts gallery.

## Wavy section divider (2026-07-23, user-directed, v2 after feedback)
- New WaveDivider component at the hero→About seam (the boundary the user marked): single continuous hand-drawn vermilion wave, 480px wavelength (~1/3 screen), 36px amplitude, thick 4.5px marker stroke, gliding right-to-left in a 30s seamless loop (.animate-wave). One 1440px SVG pattern (3 periods, matched horizontal tangents at joints) duplicated 2x with -50% translate — no tile gaps. Straddles the dark/cream seam (-mb-16/-mb-20).
- v1 (small 180px tiles) rejected by user as choppy; v2 verified via frames 2s apart: continuous unbroken line visibly gliding, desktop + mobile.
- v3 (2026-07-23): user asked to remove the animation — wave line is now STATIC (animate-wave class removed; keyframes remain in CSS unused). Verified: two frames 2s apart pixel-identical.

## Hero ambient → design-tool assets (2026-07-23, user-directed)
- Replaced glow-only backdrop with floating design-tool UI assets (from user's uploaded reference): easing curve editor panel (animated green playhead sweeping a bezier with yellow keyframe handles), timeline panel (purple/blue/orange layer bars, keyframe diamonds, sweeping playhead), character panel (Felt Tip Roman 220pt, orange swatch, T style boxes), T toolbar chip, orange fx badge, animated dashed motion path with anchor points. All dark glass (#1d100a) panels with white/10 borders, mouse-parallax depths, entrance pop, idle drift/rotation loops. Two soft vermilion glows retained for warmth. Panels hidden on mobile except T + fx chips.
- Verified via screenshots: desktop + mobile; fx chip repositioned after initial overlap with STUDIO nav link.

## Section reorder (2026-07-23, user-directed)
- About/Studio section moved directly below Hero, above Capabilities (Services). New page order: Hero → About → Services → Wordmark → Work → Clients → Testimonials → Contact. Verified via section offsets (studio:800 < services:2075) + screenshot.

## About section → resume-style layout (2026-07-23, user-directed)
- Restyled "Who I Am" section per user's reference image (editorial resume layout), keeping site theme (cream bg, chocolate text, vermilion italic serif accent headings, dashed dividers).
- Real details from Himanshu's resume image: giant HIMANSHU NAUTIYAL name (Nautiyal outlined) + bio; Contact rows (email, +91 82643 42808, Upwork profile); Experience timeline (SEO Discover 2021-23, Click Sailors 2023-24, Upwork 2024-Present); Education (Chandigarh College of Engineering, Architectural Engineering 2016-19); Tools chips (Ps Ai Ae Pr Lr Fr); Skills chips (Multimedia Design, Creative Direction, etc.).
- Data lives in content.js as ABOUT; old ScrollWords statement + parallax ABOUT_IMAGES removed.
- Verified via screenshots: desktop top/bottom + mobile.

## Nav wordmark + boxless header (2026-07-23, user-directed)
- Removed the "H" logo mark from nav; logo is now just "Himanshu" in Felt Tip Roman with hover tilt/grow. LogoMark still used in Preloader/Contact.
- Header glass box removed entirely: always transparent, no bg/border on scroll. Nav colors now adapt via scroll-aware `onLight` state (dark text/pill over cream #studio and #contact sections, cream text over dark sections) after blend-mode approach failed due to transformed-header stacking context.
- Fixed swap side-effects: Upwork badge card hardcoded back to dark (#2C180F) with cream text (bg-ink had become cream), Work card hover overlay darkened explicitly.
- Verified via screenshots: logo/link/pill legible over dark hero, cream studio, cream footer; no header box on scroll-up.

## Hero collage → ambient glow field (2026-07-23, user-directed)
- Removed the floating project-image collage behind the hero (user found it cluttered). Replaced with an ambient animated backdrop: 6 soft radial-gradient glow orbs (vermilion/peach/cream, heavily blurred) drifting on independent loops with depth-based mouse parallax and scroll parallax, plus 2 rotating dashed rings with orbiting accent dots. HERO_IMAGES export removed from content.js (now unused).
- Verified via screenshots: desktop + mobile show warm glow field, headline crisp and centered, no image clutter.

## Hero label cleanup (2026-07-23, user-directed)
- Removed "[ from india to everywhere ]" location label and "[ for small businesses · startups · d2c brands ]" audience label from hero; year chip (©2026) moved right-aligned, availability pill stays centered below headline. Verified via screenshot: both gone, layout intact.

## Felt Tip Roman + bubble-in hero animation (2026-07-23, user-directed)
- User-provided Felt Tip Roman Regular font (uploaded zip) installed at src/fonts/felt-tip-roman.ttf with @font-face; tailwind `blob` family now maps to it (Chicle removed).
- Hero headline reveal rebuilt to match user's reference video (Studio Loop intro): each letter of "good design sells" bubbles in individually — springs from a point (scale 0, rotated, dropped) with elastic overshoot, staggered left-to-right (~60ms/letter), then every letter keeps a subtle continuous wiggle (rotate/y loop with per-letter phase). Gated on preloader completion as before.
- Verified via screenshots: mid-formation state captured (letters popping in sequence), settled desktop + mobile render correctly.

## Dark inversion + centered blobby hero (2026-07-22, user-directed)
- Full palette inversion: paper ↔ ink swapped site-wide (paper #2C180F chocolate, ink #F7F6F0 cream), paper2 → #3A2318, smoke → #A99688 (light taupe for dark bg); index.css body/:root HSL vars/scrollbar/text-outline strokes swapped to match. Hero, work, services, about now dark; preloader, footer/contact now cream. LogoMark inverted-prop usages flipped (Nav inverted; Preloader/Contact default).
- Hero rewritten: centered "good design sells" in Chicle (Google Font, bubbly style matching user's reference image), lowercase, "sells" in acid orange; meta labels moved to frosted chips (bg-paper/50 backdrop-blur) for readability over the floating collage; bottom row centered.
- Verified via screenshots at 1366/768/375: hero centered + blob font, dark sections, cream footer, chips legible.

## Footer + orb tweaks (2026-07-22, user-directed)
- Footer "Socials" column (placeholder Instagram/LinkedIn/Behance links) removed; footer grid now 2 columns.
- WhatsApp CTA wired to real number: https://wa.me/918264342808 with prefilled project-brief greeting.
- Services hover orb reduced from w-64 (256px) to w-44 (176px).
- Verified via screenshot: social links gone (count 0), whatsapp href correct, smaller orb renders on hover.

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
