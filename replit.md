# Faizul Rahman — Portfolio

A personal portfolio site for Faizul Rahman, a Full Stack Developer and AI/ML undergraduate, showcasing his real projects, skills, experience, and education.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio frontend (Vite)
- `pnpm --filter @workspace/api-server run dev` — run the API server (currently only exposes `/api/healthz`; unused by the portfolio)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/scripts run generate-resume` (see `scripts/src/generate-resume.ts`) — regenerate `artifacts/portfolio/public/resume.pdf` if resume content changes

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend artifact: `artifacts/portfolio` — React + Vite, Tailwind CSS v4, Radix UI, Framer Motion, wouter
- API: Express 5 (`artifacts/api-server`) — scaffolded but not currently used by the portfolio (no DB-backed features yet)
- Resume PDF generated programmatically with `pdfkit` (no native/binary PDF converters available in this environment)

## Where things live

- `artifacts/portfolio/src/components/` — one component per section (hero, navbar, about, skills, projects, experience, education, achievements, contact, footer, command-palette)
- `artifacts/portfolio/src/index.css` — theme tokens (light/dark HSL custom properties)
- `attached_assets/` — profile photo and project screenshots, imported via the `@assets` Vite alias
- `artifacts/portfolio/public/resume.pdf` — generated resume download

## Architecture decisions

- No backend/database is used for the portfolio — all content (projects, skills, experience) is hardcoded real data in the component files, not fetched from an API.
- Theme colors are a deliberate brand choice (see User preferences) — don't revert to default shadcn/Tailwind palette.
- Resume PDF is generated via a one-off `pdfkit` script rather than a docx/HTML→PDF converter, since no such converters (soffice, pandoc, puppeteer) are reliably available in this environment.

## Product

- Single-page portfolio with: hero (profile photo, typed role text), About (with dropdown sub-nav to Experience/Education/Achievements), Skills (filterable by category), Projects (4 real projects with case-study modals), Experience, Education, Achievements, Contact (client-side form, no backend email delivery yet).
- Light/dark theme toggle; command palette (Cmd/Ctrl+K) for quick navigation.

## User preferences

- Real contact/social data is the source of truth: email `rahmanadnan412@gmail.com`, GitHub `FaizulRahman786`, LinkedIn `faizul-rahman-87974b397`.
- Theme colors: light mode = cream-white background (`hsl(42 35% 97%)`) with taupe accent `#D9D0C1` (`hsl(37 24% 80%)`); dark mode = near-black background (`hsl(0 0% 5%)`) with dark green accent (`hsl(150 58% 32%)`).
- When the master prompt and the resume docx conflict on facts, prefer the master prompt.

## Gotchas

- This project's `artifacts/*` directories had `artifact.toml` files on disk from an import but were not registered with the platform (`listArtifacts()` returned empty and no workflows existed) — had to move the existing `artifacts/portfolio` content aside, call `createArtifact` fresh to register + get a workflow, then restore the original `src/`, `public/`, and dependency-bearing `package.json` on top of the scaffold.
- No PDF/docx conversion tools (soffice, pandoc, puppeteer) are available in this environment; use `pdfkit` for programmatic PDF generation instead.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
