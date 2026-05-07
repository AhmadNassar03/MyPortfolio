# Portfolio

Personal portfolio for Ahmad Nassar — AI-focused full-stack engineer.

Built with Next.js 16, TypeScript, and Tailwind CSS v4. Editorial dark-default design with a light companion, animated aurora atmosphere, glassmorphic surfaces, and motion that respects `prefers-reduced-motion`.

## Tech stack

- **Framework** — Next.js 16 (App Router, Turbopack)
- **Language** — TypeScript (strict)
- **Styling** — Tailwind CSS v4 + CSS custom properties (oklch design tokens)
- **Animation** — motion (Framer Motion v11)
- **Theme** — next-themes (dark default + light toggle)
- **Fonts** — Instrument Serif · Geist · Geist Mono (via `next/font`)
- **Deploy** — Vercel

## Architecture highlights

- **`content/cv.ts`** — single typed source of truth that drives every UI section, the structured CV endpoint, and the JSON-LD schemas
- **AI-discoverable layer** — `/llms.txt`, `/api/cv.json`, JSON-LD (`Person`, `WebSite`, `CreativeWork`), auto sitemap + robots, dynamic OG images
- **Build-time GitHub feed** — recent repos fetched at build via `@octokit/request`, no client-side API hits
- **Reduced-motion safe** — global `MotionConfig reducedMotion="user"` plus CSS-level fallbacks

## Local development

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build       # production build
npm run start       # serve production build locally
npm run type-check  # TypeScript without emit
```

## Project structure

```
app/                # routes (homepage, /projects/[slug], api, sitemap, robots, OG)
components/         # feature-folder UI (hero, about, skills, projects, ...)
content/cv.ts       # typed CV — single source of truth
lib/                # jsonld + GitHub fetch helpers
public/             # static assets, llms.txt
styles/tokens.css   # Aurora Lab design tokens (oklch)
```

## License

All rights reserved. The code is published for transparency; the content (CV, project copy, visual identity) is © Ahmad Nassar.
