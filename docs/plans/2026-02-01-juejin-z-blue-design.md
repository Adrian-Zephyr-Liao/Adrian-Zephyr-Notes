# Juejin z-blue Markdown Theme (Preview + Editor)

## Summary

Implement a Juejin z-blue inspired **light** theme for Markdown rendering, applied consistently to both the Tiptap editor content area and the read-only preview. Replace the current MarkdownPreview with a read-only Tiptap renderer so both views share the same extensions, node views, and visual styles.

## Goals

- Match Juejin z-blue (light) typography and spacing for headings, paragraphs, links, code, blockquotes, and images.
- Ensure editor and preview render identically for the same markdown.
- Keep a single source of truth for markdown styles (no duplicate style stacks).
- Preserve existing code block theme switching.

## Architecture

- Introduce a shared, reusable **TiptapEditorBase** component:
  - Creates the Tiptap editor instance.
  - Provides shared extensions and node views.
  - Renders `EditorContent`.
- Provide two wrappers:
  - `TiptapEditor` (editable): includes toolbar and `onUpdate`.
  - `TiptapPreview` (read-only): hides toolbar and disables editing.
- Replace `MarkdownPreview` usage with `TiptapPreview`.

## Components and Files

- `src/components/features/TiptapEditor.tsx`
  - Extract `TiptapEditorBase`.
  - Add `readOnly` option and `onChange` conditional.
  - Keep existing toolbar for editable mode.
- `src/components/features/TiptapPreview.tsx` (new)
  - Thin wrapper over `TiptapEditorBase` with `readOnly: true`.
- `src/components/features/MarkdownPreview.tsx`
  - Deprecated; remove usage and delete if no longer referenced.
- `src/app/(client)/preview/page.tsx`
  - Replace `MarkdownPreview` with `TiptapPreview`.
- `src/app/globals.css`
  - Add z-blue light theme CSS variables (link color, text color, code bg, blockquote bg/border).
  - Add a shared `Z_BLUE_PROSE_CLASS` (or CSS class) used by editor and preview.

## Shared Styling Strategy

- Define a single `Z_BLUE_PROSE_CLASS` (Tailwind class string) to cover:
  - Body text color and line-height.
  - Headings sizes/weights/spacing.
  - Link color + hover behavior.
  - Blockquote border + background.
  - Inline code + code block base styles.
  - Image border/radius/shadow.
- Ensure `EditorContent` uses the same class in both editable and read-only modes.
- Keep code block node view and theme switching unchanged.

## Data Flow

- **Editable**:
  - `content` (markdown) → Tiptap render.
  - `onUpdate` → markdown storage → `onChange`.
- **Read-only**:
  - `content` (markdown) → Tiptap render.
  - No `onUpdate`; editor is read-only.

## Error Handling

- If content is empty, render an empty state or blank output.
- Keep existing image behavior (invalid URLs do not crash rendering).
- Read-only mode never mutates state or emits `onChange`.

## Test Plan

- Visual parity: same markdown renders identically in editor and preview.
- Read-only behavior: cannot edit, cursor input does not change content.
- Code blocks: theme switching applies to both editor and preview.
- Edge cases: empty content, long content, many images, only code, only headings.

## Open Questions

- None (only light theme requested).
