'use client'

import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '@tiptap/react'
import { useCodeBlockTheme } from '@/contexts/CodeBlockThemeContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/**
 * Custom node view for Tiptap code blocks with syntax highlighting.
 * Supports switching highlight.js theme via context; theme is persisted and applied globally to all code blocks.
 *
 * @param props - Tiptap node view props; uses `node.attrs.language` for the label
 * @returns The code block wrapper with header (language + theme selector) and highlighted content
 *
 * @see {@link TiptapEditor} - Where this component is registered as a node view
 * @see {@link CodeBlockThemeProvider} - Must wrap the editor to enable theme switching
 */
export function CodeBlockComponent({ node }: NodeViewProps) {
  const language = node.attrs.language || 'text'
  const { theme, setTheme, themes, isLoading } = useCodeBlockTheme()

  return (
    <NodeViewWrapper className="my-6 not-prose">
      <div className="rounded-lg overflow-hidden border border-border shadow-lg">
        {/* Header: window dots + language + theme selector */}
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
          <div className="ml-auto">
            <Select
              value={themes.some((t) => t.id === theme) ? theme : undefined}
              onValueChange={setTheme}
              disabled={isLoading || themes.length === 0}
            >
              <SelectTrigger
                size="sm"
                className="h-7 min-w-0 w-[140px] border-border/80 bg-background/80 text-xs font-medium"
              >
                <SelectValue placeholder={isLoading ? 'Loading…' : 'Theme'} />
              </SelectTrigger>
              <SelectContent align="end">
                {themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Code content: .hljs gets background from theme; padding on .hljs so theme bg fills the whole area */}
        <pre className="m-0! p-0! text-sm font-mono overflow-auto">
          <NodeViewContent className="hljs block p-4 min-h-[2em]" />
        </pre>
      </div>
    </NodeViewWrapper>
  )
}
