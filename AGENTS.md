# Project Rules & Agent Guidelines

## 1. Agent Skills (Project Skills)

**Purpose**: Prefer skills under `.cursor/skills/` when they apply, so implementation aligns with project conventions and best practices.

### Autonomous Skill Selection

- **User intent may be vague**: The user may describe the task in broad or indirect terms and might not mention exact keywords (e.g. "JSDoc", "shadcn", "accessibility"). Do not rely on keyword matching alone.
- **Decide during execution**: Infer which skill applies from (1) the *kind* of work (new feature vs. refactor vs. bugfix), (2) the *files and patterns* involved (e.g. editor code → tiptap, UI components → shadcn-ui), and (3) the *outcome* the user likely wants. If a skill clearly fits, use it even when the user did not name it.
- **Read before applying**: Before following a skill, read its `SKILL.md` (or main skill file) with the Read tool and execute according to its steps and conventions. Do not rely on memory or summaries.

### When to Use Which Skill

| Skill | Path | Use when (infer from task and context) |
|-------|------|----------------------------------------|
| **brainstorming** | `.cursor/skills/brainstorming/SKILL.md` | New features, new components, new flows, or behavior changes—clarify intent and design before coding. |
| **shadcn-ui** | `.cursor/skills/shadcn-ui/SKILL.md` | Adding or wiring UI (buttons, dialogs, forms, tables, themes); forms with validation; Tailwind/theme work. |
| **tiptap** | `.cursor/skills/tiptap/SKILL.md` | Rich text / blog / comment / Notion-like editing; SSR hydration, typography, or image upload issues. |
| **ui-ux-pro-max** | `.cursor/skills/ui-ux-pro-max/SKILL.md` | Visual/UX decisions: style, palette, typography, charts, layout. |
| **vercel-composition-patterns** | `.cursor/skills/vercel-composition-patterns/SKILL.md` | Refactoring components, too many boolean props, compound components, context, or React 19 patterns. |
| **vercel-react-best-practices** | `.cursor/skills/vercel-react-best-practices/SKILL.md` | Writing or changing React/Next.js code (components, data fetching, bundle/performance). |
| **web-design-guidelines** | `.cursor/skills/web-design-guidelines/SKILL.md` | UI/UX review, accessibility, design audit, or checking pages against best practices (even if user says "check the page" or "make it better"). |
| **jsdoc-typescript-docs** | `.cursor/skills/jsdoc-typescript-docs/SKILL.md` | Documenting code, APIs, or types—or user asks for docs, comments, or "explain this in code". |

### Optional Skills (use when intent is clear)

- **create-rule** / **create-skill**: User wants to add or change a Cursor rule or skill.
- **agent-browser**: User needs browser automation, form filling, screenshots, or scraping.

---

## 2. Component Library (shadcn/ui)

- **Official CLI Required**: All `shadcn/ui` components MUST be added using the official CLI command (e.g., `bunx shadcn@latest add [component]`). Do not manually copy-paste component code unless absolutely necessary and documented.

## 3. Runtime & Package Manager (Bun)

- **Bun Required**: Use `bun` for all package management and script execution.
- **npx Command Replacement**: Use `bunx` instead of `npx`.

## 4. Code Cleanliness (Unused Item Cleanup)

**Purpose**: Reduce noise, lower maintenance costs, avoid dead code and misleading dependencies; maintain a readable codebase and smaller build size.

### Unused Imports

- **Must Be Deleted**: If a module is not referenced in the current file (not used in JSX, expressions, type annotations, etc.), the import statement must be deleted.

- **When to Check**: After modifying or adding a file, check for any redundant `import` statements within the file and remove unused items.

- **Type Imports**: Only use `import type { ... }` for type imports; if the type is not used, it should also be deleted.

### Unused Files

- **Must Be Deleted**: If a file is not imported or referenced by any module in the entire project (including routes, configurations, entry points, tests, etc.), the file should be deleted to avoid dead code residue.

- **Scope of References**: Consider all reference methods—`import`/`require`, dynamic `import()`, routing conventions (such as Next.js's `app/`, `pages/`), paths in configuration files, files referenced in builds/scripts, etc.

- **Exceptions**: Entry files, configuration files, files loaded by tools/frameworks according to conventions (such as `next.config.ts`, `tailwind.config.*`), intentionally retained examples or documentation are not considered "unused"; if there is a reasonable reason for retention, it should be confirmed or marked before deletion.
