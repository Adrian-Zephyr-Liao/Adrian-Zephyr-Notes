# Next.js App Router – File Conventions & Examples

Reference for special files, route patterns, and organization strategies. Source: Next.js 16 docs.

## Routing files (extensions: .js .jsx .ts .tsx unless noted)

| File | Extensions | Purpose |
|------|------------|--------|
| `layout` | .js .jsx .tsx | Layout (wraps segment + children) |
| `page` | .js .jsx .tsx | Page; makes segment public |
| `loading` | .js .jsx .tsx | Loading UI (Suspense boundary) |
| `error` | .js .jsx .tsx | Error boundary |
| `not-found` | .js .jsx .tsx | Not found UI |
| `global-error` | .js .jsx .tsx | Global error UI |
| `route` | .js .ts | API endpoint |
| `template` | .js .jsx .tsx | Layout that re-renders (no shared state) |
| `default` | .js .jsx .tsx | Fallback for parallel route slots |

## Path → URL

| Path | URL |
|------|-----|
| `app/layout.tsx` | — (root layout) |
| `app/page.tsx` | `/` |
| `app/blog/page.tsx` | `/blog` |
| `app/blog/[slug]/page.tsx` | `/blog/:slug` |
| `app/shop/[...slug]/page.tsx` | `/shop/*` |
| `app/docs/[[...slug]]/page.tsx` | `/docs`, `/docs/...` |
| `app/(marketing)/page.tsx` | `/` (group not in URL) |
| `app/(shop)/cart/page.tsx` | `/cart` |
| `app/blog/_components/Post.tsx` | — (private, not routable) |

## Parallel & intercepting routes

| Pattern | Use |
|---------|-----|
| `@slot` | Named slot in layout (e.g. sidebar + main) |
| `(.)segment` | Intercept same level (e.g. modal over list) |
| `(..)segment` | Intercept parent |
| `(..)(..)segment` | Intercept two levels up |
| `(...)segment` | Intercept from root |

## Metadata files (in segment)

- **Icons**: `favicon.ico`, `icon.*`, `apple-icon.*` (or generated via `icon.tsx`)
- **OG/Twitter**: `opengraph-image.*`, `twitter-image.*` (or generated)
- **SEO**: `sitemap.xml` / `sitemap.ts`, `robots.txt` / `robots.ts`

## Organization strategies

### 1. Project files outside `app`

Shared code at project root (or under `src/`): `components/`, `lib/`, `hooks/`, `types/`. `app/` only holds route segments and special files. Good for clear separation and tooling.

### 2. Project files inside `app`

Shared folders at `app/` root: `app/components/`, `app/lib/`, etc. Routes live alongside. Keeps everything under `app`.

### 3. Split by feature/route (colocation)

Global shared code at `app/` root; route-specific components/hooks/data live inside that segment (or in `_components`/`_lib` under the segment). Only promote to shared folders when used in multiple routes.

### 4. Route groups for layout/section

- `(marketing)` and `(shop)` each with own `layout.tsx`; URLs stay `/`, `/cart`, etc.
- To give only some routes a layout: put those routes in a group (e.g. `(shop)/account`, `(shop)/cart`) and add `layout.tsx` in the group.
- Loading per route: put `loading.tsx` in a route group so it applies only to that group’s pages.
- Multiple root layouts: remove root `layout.tsx`, add a `layout.tsx` (with `<html>` and `<body>`) inside each top-level route group.

## Component hierarchy (render order)

1. `layout`
2. `template`
3. `error` (boundary)
4. `loading` (Suspense)
5. `not-found` (boundary)
6. `page` or nested `layout`

Nested segments render recursively inside their parent layout.
