<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Ahmad Nassar Portfolio (Aurora Lab)

- **Single source of truth**: `content/cv.ts` — every section reads from this. Don't duplicate content into components.
- **Design system**: Aurora Lab palette in `styles/tokens.css`. Use `var(--surface-*)`, `var(--text-*)`, `var(--accent)` etc. — don't hardcode hex.
- **Theme**: dark default + light companion via `next-themes` (`data-theme` attribute). Always test BOTH themes.
- **Motion**: gated globally by `<MotionConfig reducedMotion="user">` in `MotionRoot`. Don't call `useReducedMotion()` per component — that caused SSR hydration issues.
- **JSON-LD**: scripts go inside `<body>` (not `<head>`). React 19 warns when scripts are inside client components.
- **Next.js 16 async params**: `params: Promise<{slug: string}>`, then `await params`. Same for `searchParams`.
