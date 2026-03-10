## Project Context: Aurora Landing Page

You are working on **Aurora**, a high-quality, fully custom-built Next.js landing page 
for an AI consulting/development company targeting enterprise B2B clients.

---

## Tech Stack

- **Framework**: Next.js 15.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS (no external UI libraries)
- **React**: v19.2.3 with React Compiler (babel-plugin-react-compiler)
- **Fonts**: Google Fonts — Syne (display) + DM Sans (body)
- **Animations**: Custom Canvas (WebGL/Canvas API), native CSS animations, 
  custom hooks (useScrollReveal, useStaggeredReveal via IntersectionObserver)
- **Linting**: ESLint

---

## Design System

**Theme**: Dark-first, deep space aesthetic. Everything custom — no component libraries.

**Color Palette:**
| Token       | Value     | Usage                    |
|-------------|-----------|--------------------------|
| Primary     | #2563eb   | Accents, CTAs, highlights |
| Background  | #0a0a0a   | Page background           |
| Surface     | #111111   | Cards, elevated elements  |
| Foreground  | #f5f5f5   | Primary text              |

**Typography:**
- Display/Headings: `Syne` — weights 400, 600, 700, 800
- Body/UI: `DM Sans` — weights 300, 400, 500
- Base spacing grid: 8px

**Animations:**
- Subtle fade/slide reveals on scroll
- Canvas hero: stars, shooting stars, planetary atmosphere (requestAnimationFrame)
- Full `prefers-reduced-motion: reduce` support
- No GSAP, Framer Motion, or heavy animation libraries

---

## Page Structure

1. **Hero** — Animated space canvas scene + headline + CTA
2. **Features Grid** — AI capability highlights
3. **Transformation Section** — Enterprise value proposition
4. **Contact Section** — Client-side validated form with custom error states
5. **Footer** — Navigation links

---

## Responsive Breakpoints (Tailwind v4)

| Prefix | Min-width |
|--------|-----------|
| sm     | 640px     |
| md     | 768px     |
| lg     | 1024px    |
| xl     | 1280px    |
| 2xl    | 1536px    |

Primary mobile target: 375px (iPhone SE) and 390px (iPhone 14)

---

## Constraints & Standards

- **No external UI libraries** — all components are hand-built
- **Accessibility**: Semantic HTML, ARIA labels, keyboard focus management
- **Performance**: Canvas animations run via rAF, no blocking operations
- **TypeScript**: Strict typing throughout — do not use `any`
- **Tailwind only**: All styling via Tailwind utility classes + Tailwind v4 
  CSS variables where needed. No inline styles unless unavoidable.
- **Preserve design intent**: The space/dark aesthetic is intentional and 
  central to the brand. Do not simplify or flatten the visual design.
- **Mobile-first**: When adding or editing styles, write mobile base styles 
  first, then layer up with `md:`, `lg:` etc.

---

## Tone & Copy Direction

- Enterprise B2B, AI transformation focus
- Language: confident, technical, premium — e.g. "Acceleration Systems", 
  "Ascension Architectures", "Made for enterprise. Powered by AI."
- Avoid casual, consumer-facing language

---

Always refer back to this context before making any changes to ensure 
consistency with the design system, constraints, and project standards.
