'use client'

import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '@tiptap/react'

/**
 * Custom node view for Tiptap code blocks with syntax highlighting.
 * Uses the fixed atom-one-dark theme (loaded in root layout).
 *
 * @param props - Tiptap node view props; uses `node.attrs.language` for the language label
 * @returns The code block wrapper with header (language) and highlighted content
 *
 * @see {@link TiptapEditor} - Where this component is registered as a node view
 *
 * @example
 * Registered via `ReactNodeViewRenderer(CodeBlockComponent)` in Tiptap extensions; not used directly.
 */
export function CodeBlockComponent({ node }: NodeViewProps) {
  const language = node.attrs.language || 'text'

  return (
    <NodeViewWrapper className="my-6 not-prose">
      <div className="rounded-lg overflow-hidden border border-border shadow-lg">
        {/* Header: window dots + language */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 border-b border-border select-none"
          contentEditable={false}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider ml-2">
            {language}
          </span>
        </div>

        {/* Code content: .hljs gets background from atom-one-dark; padding on .hljs so theme bg fills the whole area */}
        <pre className="m-0! p-0! text-sm font-mono overflow-auto">
          <NodeViewContent className="hljs block p-4 min-h-[2em]" />
        </pre>
      </div>
    </NodeViewWrapper>
  )
}
