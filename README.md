# Ahmad Nassar — Portfolio

AI-forward personal portfolio. Built with Next.js 16, TypeScript, Tailwind CSS v4, and the **Aurora Lab** design system — editorial AI-research aesthetic, dark-default with a true light companion.

Live at: `https://ahmadnassar.dev` _(set up in deploy step below)_

---

## What's inside

| Section | Highlights |
|---|---|
| **Hero** | Animated aurora background, italic editorial display type, "currently exploring" live model pill, magnetic CTA buttons. |
| **About** | Rich profile + facts grid (location / languages / education / availability). |
| **Skills** | AI/LLM-first matrix. AI section featured with `// primary focus` tag. |
| **Projects (Bento)** | 4 hero projects with accent-coded cards, status badges (live / private / archived), live demos, deep case studies. |
| **Experience** | Vertical timeline, three roles (Orange Jordan → Future Advanced → SHAI for AI). |
| **Certifications** | 7 AI certs (4 Anthropic, 2 Google, 1 Coursera) — issuer-color-coded grid. |
| **GitHub feed** | Build-time fetch of recent active repos via Octokit. |
| **Contact** | Email, phone, GitHub, LinkedIn, downloadable CV PDF. |

---

## Architecture

```
H:\My Portfolio\
├── app/
│   ├── layout.tsx               # Root: fonts, theme, motion, JSON-LD
│   ├── page.tsx                 # Homepage section composition
│   ├── projects/
│   │   ├── page.tsx             # All projects index
│   │   └── [slug]/page.tsx      # Case study (4 routes)
│   ├── api/cv.json/route.ts     # Structured CV for AI agents
│   ├── opengraph-image.tsx      # Dynamic OG image
│   ├── sitemap.ts · robots.ts
│   └── globals.css
├── components/
│   ├── nav/ about/ skills/ projects/ experience/
│   ├── certifications/ contact/ hero/
│   ├── ui/ (ThemeToggle, MagneticButton, GlassSurface, NoiseLayer, SectionHeader)
│   ├── motion/ (FadeIn)
│   └── providers/ (ThemeProvider, MotionRoot)
├── content/cv.ts                # Single source of truth — typed
├── lib/
│   ├── jsonld.ts                # Person, WebSite, CreativeWork, Breadcrumb
│   └── github.ts                # Build-time GitHub fetch
├── public/llms.txt              # AI-agent friendly summary
└── styles/tokens.css            # Aurora Lab design tokens (oklch)
```

### Single source of truth

`content/cv.ts` is the **only** place to edit profile data. It drives:
- Every UI section
- `/api/cv.json` (structured endpoint)
- JSON-LD Person + Project schemas
- Sitemap entries

Edit one file → entire site updates.

### AI-discoverable layer

| Endpoint | Purpose |
|---|---|
| `/llms.txt` | Markdown summary AI agents can read directly. |
| `/api/cv.json` | Structured CV data, daily-revalidated, `Access-Control-Allow-Origin: *`. |
| JSON-LD on every page | Schema.org `Person`, `WebSite`, `CreativeWork`, `BreadcrumbList`. |
| `/sitemap.xml` + `/robots.txt` | Auto-generated. |
| OG images via `@vercel/og` | Aurora-styled, one per route. |

---

## Local development

```powershell
cd "H:\My Portfolio"

# Install (already done)
npm install

# Dev server — Turbopack, hot reload
npm run dev

# Production build (static + edge)
npm run build

# Production preview locally
npm run start

# Type check (no emit)
npm run type-check
```

Dev server runs on http://localhost:3000.

---

## Editing content

To update **profile, skills, experience, projects, certifications**, or **education** — edit `content/cv.ts` only. Everything else propagates.

To update the **CV PDF**, drop a new `ahmad-nassar-cv.pdf` into `public/`.

To change the **visual direction**, edit `styles/tokens.css` (oklch palette) and `app/globals.css` (animations, glass effects).

---

## Deploying to Vercel

1. **Push to GitHub** (create a repo first):
   ```powershell
   cd "H:\My Portfolio"
   git init
   git add .
   git commit -m "feat: initial Aurora Lab portfolio"
   gh repo create ahmad-portfolio --public --source=. --push
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com/new
   - Import the GitHub repo
   - Framework auto-detects as Next.js
   - No environment variables needed — GitHub feed is unauthenticated public API
   - Click **Deploy**

3. **Set up custom domain** (optional):
   - In Vercel project → Settings → Domains
   - Add `ahmadnassar.dev` (or whatever you bought)
   - Update `SITE_URL` in `lib/jsonld.ts` if you change the domain

4. **Verify**:
   - `https://your-domain/` — homepage
   - `https://your-domain/api/cv.json` — structured CV
   - `https://your-domain/llms.txt` — AI summary
   - `https://your-domain/sitemap.xml` — sitemap
   - `https://your-domain/projects/omniagent` — case study sample

---

## Design system — Aurora Lab

**Palette** (oklch dark default):
- Surface: `oklch(14% 0.02 280)` (deep midnight violet)
- Aurora gradient: violet → cyan → soft pink
- Accent: cyan `oklch(75% 0.16 200)`
- Light theme: paper `oklch(98% 0.005 90)` + ink `oklch(18% 0.005 280)`

**Typography**:
- Display: **Instrument Serif** (italic for emphasis)
- Body: **Geist**
- Mono: **JetBrains Mono / Geist Mono** (used in "currently exploring" pill, eyebrows, code)

**Atmosphere**:
- Animated aurora gradient (CSS `@keyframes` on `transform`, GPU-only)
- 4% noise overlay (`feTurbulence` SVG)
- Glassmorphic surfaces with gradient borders
- Magnetic cursor on primary CTAs
- Parallax-lift project cards
- All motion gated by `prefers-reduced-motion`

---

## Performance targets

| Metric | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 200ms |
| CLS | < 0.05 |
| Lighthouse Perf | ≥ 95 |
| Lighthouse A11y | 100 |
| Lighthouse SEO | 100 |
| JS bundle (homepage, gz) | < 150kb |

Bundle achieved by: lazy-loading motion library, only preloading Instrument Serif italic + Geist regular, deferring GitHub feed JS until in-viewport.

---

## Tech stack

- **Framework**: Next.js 16.2.5 (App Router, Turbopack)
- **Language**: TypeScript strict
- **Styling**: Tailwind CSS v4 + CSS custom properties (oklch tokens)
- **Animation**: motion (formerly Framer Motion) v11
- **Theme**: next-themes
- **Icons**: inline SVG (no icon lib)
- **Deployment**: Vercel
- **GitHub data**: @octokit/request (build-time fetch)

---

## License

Private project. Content is © Ahmad Nassar.

---

## Built in Amman, Jordan
