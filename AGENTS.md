# Project Rules & Agent Guidelines

## 1. Component Library (shadcn/ui)

- **Official CLI Required**: All `shadcn/ui` components MUST be added via CLI (e.g. `bunx shadcn@latest add [component]`). Do not manually copy-paste unless necessary and documented.

## 2. Runtime & Package Manager (Bun)

- Use `bun` for package management and scripts; use `bunx` instead of `npx`.

## 3. Code Cleanliness (Unused Item Cleanup)

- **Unused imports**: Delete any import not referenced in the file. Use `import type` for types; delete unused type imports.
- **Unused files**: Delete any file not imported or referenced (routes, config, entry points, tests). Exceptions: entry/config/convention-loaded files, intentional docs/examples.

## 4. TypeScript Types

- **Location**: Domain/feature types live in `src/types/`, one file per domain (e.g. `editor.ts`, `post.ts`, `admin.ts`). No shared/domain types inline in components or pages.
- **Imports**: Use `import type { ... }` for types. Prefer `@/types/editor` over barrel `@/types` for tree-shaking.
- **Naming**: Props → `XxxProps`; domain state → semantic names (e.g. `PostState`, `StatItem`). Internal-only types → JSDoc `@internal`.

## 5. JSDoc (Types in `src/types`)

- All exported types MUST have JSDoc (short description; property descriptions where helpful).
- Use `@internal` for non-public types; `@example` for non-trivial/public types; `@see` to link related types.
- Follow the project’s jsdoc-typescript-docs skill when adding or updating type docs.
