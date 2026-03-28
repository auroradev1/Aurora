# AI-CODER-PRO.md — Frontend Website Rules

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Model Context

- You are running on **KAT-Coder-Pro V1** by KwaiKAT (Kuaishou), a ~72B MoE agentic coding model.
- Context window: **256K tokens** | Max output: **128K tokens**
- Optimized for: multi-file refactors, autonomous workflows, test generation, monorepo analysis.
- Use your full 256K context window when processing large codebases — do not truncate or summarize files unless explicitly asked.
- Leverage agentic RL strengths: reflect on your plan before executing, critique your own diffs, and prefer minimal correct edits over verbose rewrites.

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server

- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow

- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — KAT-Coder-Pro can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Agentic Workflow Standards

- **Reflect before acting:** Before writing any code, state your plan. Critique it. Then execute.
- **Minimal diffs:** Prefer the smallest correct change. Never rewrite working code to add style.
- **Multi-file awareness:** When editing, always check for downstream effects across related files before finalizing.
- **Rejection sampling mindset:** If your first output feels verbose or uncertain, generate a leaner alternative and prefer it.
- **Tool use:** Use tools in logical sequence. Do not call tools redundantly. Confirm tool output before proceeding.
- **Reflection loops:** After completing a task, briefly audit: "Did I introduce regressions? Are there simpler alternatives?"

## Output Defaults

- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets

- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Base-First Layout Rule

- **Every layout class needs a base (unprefixed) value that works at 320px. Prefixed classes are enhancements, not the definition.**
- Grid: `grid grid-cols-1 sm:grid-cols-2` — never `grid sm:grid-cols-2`
- Flex: `flex flex-col sm:flex-row` — never `flex sm:flex-row`
- Spacing: `p-4 sm:p-6` — never `sm:p-6` alone
- Typography: `text-2xl sm:text-3xl` — never `sm:text-3xl` alone
- Width: `w-full sm:w-1/2` — never `sm:w-1/2` alone
- Alignment: `text-center md:text-left` — never `md:text-left` alone
- Visibility: `hidden sm:block` is valid only as an intentional paired component swap
- Grid/flex children that should span their container must include `w-full`
- Before committing, audit with: `(sm|md|lg|xl|2xl):(grid-cols|flex-|w-|p-|px-|py-|text-|gap-|block|inline)` — verify each match has an unprefixed base

## Hard Rules

- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not hallucinate file contents — read files before editing them
- Do not delete existing code without explicit instruction (mirrors KAT-Coder-Pro's agentic RL safety alignment)
- Do not exceed task scope — complete what was asked, flag anything additional as a suggestion only
