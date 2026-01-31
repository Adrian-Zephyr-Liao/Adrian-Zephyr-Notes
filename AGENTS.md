# Project Rules & Agent Guidelines

## 1. Component Library (shadcn/ui)

- **Official CLI Required**: All `shadcn/ui` components MUST be added using the official CLI command (e.g., `bunx shadcn@latest add [component]`). Do not manually copy-paste component code unless absolutely necessary and documented.

## 2. Runtime & Package Manager (Bun)

- **Bun Required**: Use `bun` for all package management and script execution.
- **npx Command Replacement**: Use `bunx` instead of `npx`.

## 3. Code Cleanliness (Unused Item Cleanup)

**Purpose**: Reduce noise, lower maintenance costs, avoid dead code and misleading dependencies; maintain a readable codebase and smaller build size.

### Unused Imports

- **Must Be Deleted**: If a module is not referenced in the current file (not used in JSX, expressions, type annotations, etc.), the import statement must be deleted.

- **When to Check**: After modifying or adding a file, check for any redundant `import` statements within the file and remove unused items.

- **Type Imports**: Only use `import type { ... }` for type imports; if the type is not used, it should also be deleted.

### Unused Files

- **Must Be Deleted**: If a file is not imported or referenced by any module in the entire project (including routes, configurations, entry points, tests, etc.), the file should be deleted to avoid dead code residue.

- **Scope of References**: Consider all reference methods—`import`/`require`, dynamic `import()`, routing conventions (such as Next.js's `app/`, `pages/`), paths in configuration files, files referenced in builds/scripts, etc.

- **Exceptions**: Entry files, configuration files, files loaded by tools/frameworks according to conventions (such as `next.config.ts`, `tailwind.config.*`), intentionally retained examples or documentation are not considered "unused"; if there is a reasonable reason for retention, it should be confirmed or marked before deletion.
