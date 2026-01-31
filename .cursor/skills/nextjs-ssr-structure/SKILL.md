---
name: nextjs-ssr-structure
description: |
  Next.js 16 App Router SSR project directory structure and file conventions (official docs as of 16.1.6).
  Use when scaffolding or reorganizing a Next.js app, adding routes/layouts/API routes/loading/error UI, deciding where to put components/lib/server code, or using route groups and colocation.
---

# Next.js 16 App Router Project Structure (SSR)

**Source**: [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) (16.1.6). Prefer App Router for new SSR projects.

## Top-level

| Folder / File | Purpose |
|---------------|--------|
| `app` | App Router (routes, layouts, pages, API) |
| `public` | Static assets (stays at root) |
| `src` | Optional: put `app`, `components`, `lib` under `src/` to separate app code from root config |
| Root | `next.config.js`, `package.json`, `tsconfig.json`, `.env.*`, `eslint.config.mjs` stay at root |

With `src/`: move `app` → `src/app`; move shared code (e.g. `components`, `lib`) into `src/`. `public` and config files remain at root.

## Routing files (inside `app` or `src/app`)

| File | Role |
|------|------|
| `layout` | Shared UI (wraps segment and children) |
| `page` | Public route; segment becomes reachable when `page` or `route` exists |
| `loading` | Loading UI / skeleton |
| `error` | Error boundary |
| `not-found` | 404 UI |
| `global-error` | Global error UI |
| `route` | API endpoint (GET/POST/etc.) |
| `template` | Re-rendered layout (no shared state with children) |
| `default` | Fallback for parallel route slots |

Only the content returned by `page` or `route` is sent to the client; other files (e.g. colocated components) are not routable.

## Routes and segments

- **Nested routes**: Folders = URL segments. `app/blog/page.tsx` → `/blog`; `app/blog/authors/page.tsx` → `/blog/authors`.
- **Dynamic**: `[slug]` (single), `[...slug]` (catch-all), `[[...slug]]` (optional catch-all). Params via `params` prop.
- **Route groups** `(name)`: Organize without changing URL. `app/(marketing)/page.tsx` → `/`; `app/(shop)/cart/page.tsx` → `/cart`. Use for different layouts per section.
- **Private folders** `_name`: Not routable; use to colocate implementation (e.g. `_components`, `_lib`) under a segment.

## Colocation

Files under a route segment are **not** routable unless they are a special file (`page`, `route`, etc.). You can colocate components, lib, and data under `app/...` safely. Prefer colocating route-specific code in that segment; put shared code in a common folder (e.g. `src/components`, `src/lib`).

## Recommended structure for SSR apps

- **Outside `app`** (or under `src/`): `components/` (ui, layout, features), `lib/` (helpers, API clients, validation), `hooks/`, `types/`, optional `server/` (server actions, DB access). Keeps `app` focused on routing and composition.
- **Inside `app`**: Use route groups for sections (e.g. `(marketing)`, `(dashboard)`), each with its own `layout.tsx` if needed. Add `loading.tsx` / `error.tsx` / `not-found.tsx` at the level they should apply.
- **API routes**: `app/api/.../route.ts` (e.g. `app/api/users/route.ts` → GET/POST `/api/users`).

For full file-convention tables, dynamic/parallel/intercepting routes, and metadata files (favicon, opengraph, sitemap, robots), see [references/project-structure.md](references/project-structure.md).
