# Kanaku landing

Configuration-driven landing site built with Next.js (App Router), TypeScript and Tailwind.

## How it works

- `src/features/landing/config/default-config.ts` holds the page content, section order, FAQs and theme overrides.
- Set `LANDING_API_URL` to load the same shape from `GET {LANDING_API_URL}/landing` instead (see `.env.example`). Invalid sections are skipped; an invalid payload falls back to the default config.
- Sections are chosen by `type` via `src/features/landing/registry.ts`. To add one: add a schema in `schemas/`, include it in `sectionSchema` (`schemas/config.ts`), build the component, register it.
- Sections can be hidden with `enabled: false`, or conditionally with `showIf` / `hideIf` against the top-level `flags`.
- Themes: `theme.light` / `theme.dark` are partial colour overrides of the built-in palettes (`theme.ts`); `theme.defaultMode` is `light`, `dark` or `system`. Both palettes are emitted as CSS variables, so switching is instant. A navbar with `themeToggle: true` shows the toggle; the visitor's choice is saved in `localStorage`.
- All visible text, including numbers, UI labels (`site.labels`), 404 code and step markers, comes from the config. Nothing user-facing is hardcoded in components.

## BFF

Route handlers in `src/app/api/` stay thin and use `src/services/bff/` (envelope, validation, error handling, bearer-secret auth) and `src/services/` (upstream clients).

- `GET /api/landing` – validated landing config.
- `GET /api/landing/schema` – JSON Schema of the config, for the admin console's forms.
- `POST /api/landing/validate` – dry-run validation of a draft; same bearer secret as revalidate.
- `POST /api/revalidate` – `Authorization: Bearer $REVALIDATE_SECRET`, optional `{ "tags": [...] }`; call it when content changes.

## Quality gates (Husky)

- `pre-commit`: lint-staged (Prettier + ESLint on staged files) then `tsc --noEmit`.
- `pre-push`: `npm run check` (Prettier, ESLint, tsc) then `npm run build`.
- ESLint enforces a 500-line maximum per file.

## Scripts

`npm run dev | build | start | lint | format | typecheck | check`

## Content comes from the Admin Portal

Set `LANDING_API_URL` to the admin's public API (e.g. `https://<admin>/api/v1/public`); the page then renders `GET {LANDING_API_URL}/landing` (hero, features, steps, pricing with live prices, FAQ, call-to-action, footer, theme, SEO), validated section by section. The bundled default is used only if the Admin Portal is unreachable. The admin calls `POST /api/revalidate` (`Authorization: Bearer $REVALIDATE_SECRET`) after each publish so edits appear immediately. API docs: `{admin origin}/docs/landing`.

## API documentation (Swagger)

The Landing Page's own API is documented at **`/docs`** (Swagger UI) with the machine-readable spec at **`/openapi.json`**
(`public/openapi.json`): `GET /api/landing`, `POST /api/landing/validate`, `GET /api/landing/schema`, `POST /api/revalidate`.
The spec is generated from the Admin Portal's `src/openapi/landing.ts`; re-export it there if these endpoints change.
