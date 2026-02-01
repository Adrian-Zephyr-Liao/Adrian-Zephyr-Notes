import type { Editor } from '@tiptap/react'
import type { ComponentType } from 'react'

/**
 * Props for the TiptapEditor component.
 *
 * @example
 * ```tsx
 * <TiptapEditor
 *   content={post.content}
 *   onChange={(markdown) => setPost(prev => ({ ...prev, content: markdown }))}
 *   className="min-h-[400px]"
 * />
 * ```
 */
export interface TiptapEditorProps {
  /** Initial or controlled markdown content. */
  content: string
  /** Called when content changes; receives current markdown string. */
  onChange: (content: string) => void
  /** Optional CSS class for the root wrapper. */
  className?: string
}

/**
 * Storage interface exposed by the tiptap-markdown extension.
 * Used to read current markdown from the editor instance.
 *
 * @internal
 */
export interface MarkdownStorage {
  /** Returns the current document as markdown string. */
  getMarkdown: () => string
}

/**
 * Props for the read-only Tiptap preview (TiptapPreview).
 * Same extensions and prose as TiptapEditor; used for consistent rendering.
 *
 * @example
 * ```tsx
 * <TiptapPreview content={markdown} className="rounded-xl" />
 * ```
 *
 * @see {@link TiptapEditorProps} - Editor props for comparison
 */
export interface TiptapPreviewProps {
  /** Markdown content to render. */
  content: string
  /** Optional CSS class for the root wrapper. */
  className?: string
}

/**
 * Props for the toolbar rendered above the editor (TiptapToolbar).
 *
 * @internal
 */
export interface TiptapToolbarProps {
  /** Tiptap editor instance for commands and active state. */
  editor: Editor
  /** Callback to open insert-image flow (e.g. URL prompt). */
  onInsertImage: () => void
}

/**
 * Props for a single toolbar icon button (ToolbarButton).
 *
 * @internal
 */
export interface ToolbarButtonProps {
  /** Click handler (e.g. runs editor command). */
  onClick: () => void
  /** Whether the format is active (e.g. bold on current selection). */
  isActive?: boolean
  /** Disables the button (e.g. no undo available). */
  disabled?: boolean
  /** Lucide icon component. */
  icon: ComponentType<{ className?: string }>
  /** Accessible label and tooltip. */
  title: string
}
