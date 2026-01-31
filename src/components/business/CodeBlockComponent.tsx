"use client"

import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '@tiptap/react'
import { cn } from '@/lib/utils'
import 'highlight.js/styles/atom-one-dark.css'

export function CodeBlockComponent({ node }: NodeViewProps) {
  const language = node.attrs.language || 'text'

  return (
    <NodeViewWrapper className="my-6">
      <div className="rounded-lg overflow-hidden border border-white/10 bg-[#282c34] shadow-2xl">
        {/* Mac Window Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5 select-none" contentEditable={false}>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-auto text-xs text-white/40 font-mono uppercase tracking-wider">
            {language}
          </div>
        </div>

        {/* Code Content with syntax highlighting */}
        <pre className="!m-0 !p-6 !bg-transparent text-sm font-mono overflow-auto">
          <NodeViewContent className="hljs !bg-transparent !p-0" />
        </pre>
      </div>
    </NodeViewWrapper>
  )
}
