/**
 * Central export for app-wide types.
 *
 * @remarks
 * Prefer importing from specific files (e.g. `@/types/editor`, `@/types/post`)
 * for better tree-shaking. Use this barrel only when you need multiple types
 * from different domains.
 *
 * @example
 * ```ts
 * import type { TiptapEditorProps } from '@/types/editor'
 * import type { PostState, StatItem } from '@/types'
 * ```
 */
export type {
  TiptapEditorProps,
  TiptapPreviewProps,
  TiptapToolbarProps,
  ToolbarButtonProps,
  MarkdownStorage,
} from './editor'
export type { PostState } from './post'
export type { StatItem } from './admin'
