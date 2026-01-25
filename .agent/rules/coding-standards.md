# Coding Best Practices & Standards

## Next.js & React Patterns

### Server Components First
- Default to Server Components. Only add `"use client"` when necessary (state, effects, event listeners).
- Pass data down to Client Components as props.

### Data Fetching
- **Do not** use `useEffect` for data fetching.
- Use **Server Actions** or standard `async/await` in Server Components.
- Use `TanStack Query` (if installed) only for client-side polling or complex optimistic updates where Server Actions fall short.

### Server Actions
- Place server actions in `actions.ts` within the relevant `src/features/<feature>` directory.
- Always validate inputs using **Zod** schema in the action before processing.

### Component Design
- **Single Responsibility**: Provide small, focused components.
- **Composition**: Use `children` prop to compose layouts instead of deep prop drilling.
- **Props**: Define strict interfaces for props. Avoid `React.FC`.
  ```ts
  interface CleanButtonProps {
    onClick: () => void;
    label: string;
  }
  export function CleanButton({ onClick, label }: CleanButtonProps) { ... }
  ```

## Styling (TailwindCSS)
- Use standard Tailwind utility classes.
- Group layout properties first, then checking, then visual styling.
- Example: `className="flex items-center justify-between p-4 bg-white rounded-lg shadow"`

## State Management
- Prefer URL Search Params for shareable state (filters, pagination).
- Use local `useState` for transient UI state (modals, dropdowns).
- Use `Zustand` (if needed) for complex global client state, but minimize its use.

## Advanced Next.js Patterns

### Metadata & SEO
- Use `generateMetadata` in `page.tsx`/`layout.tsx` for dynamic SEO tags.
- Define a root `metadata` object in `src/app/layout.tsx` for template titles.
  ```ts
  export const metadata: Metadata = {
    title: {
      template: '%s | My Blog',
      default: 'My Blog',
    },
  };
  ```

### Image Optimization
- **MANDATORY**: Use the `<Image />` component from `next/image`.
- Do not use `<img>` tags unless absolutely necessary (e.g., within SVG foreignObject).
- Always provide `alt`, `width` (or `fill`), and `height`.

### Route Handling
- Use file conventions for UI states:
  - `loading.tsx`: For instant loading skeletons.
  - `error.tsx`: For graceful error handling (must be "use client").
  - `not-found.tsx`: For custom 404 pages.
- Group routes logically using `(groupName)` to avoid URL path pollution, as seen in `(blog)` and `(admin)`.

### Middleware
- Use `middleware.ts` for:
  - Route protection (redirecting unauthenticated users from `/admin`).
  - Internationalization (i18n) routing.
  - Adding security headers.
  - **NOT** for complex data fetching or heavy logic.

### Performance
- **Font Optimization**: Use `next/font` (e.g., `Inter`) to prevent layout shift.
- **Lazy Loading**: Use `next/dynamic` for heavy Client Components that are below the fold or interaction-dependent (like rich text editors).
  ```ts
  const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });
  ```

### Environment Variables
- Validate environment variables at build/runtime (using `t3-env` or custom Zod validation in `src/env.mjs`).
- Never destructure `process.env` in Client Components (unless using `NEXT_PUBLIC_` prefix).

