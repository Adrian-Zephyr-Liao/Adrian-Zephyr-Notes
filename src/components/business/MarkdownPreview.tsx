import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (
    <div className={cn(
      "relative p-8 rounded-3xl overflow-hidden transition-all duration-300",
      // Adaptive Background: Light mode uses solid-ish white/70, Dark mode use translucent gradient
      "bg-white/70 dark:bg-gradient-to-br dark:from-white/10 dark:via-white/5 dark:to-transparent",
      "backdrop-blur-xl border border-slate-200 dark:border-white/20 ring-1 ring-slate-100 dark:ring-white/10 shadow-2xl",
      // Adaptive Text
      "text-slate-800 dark:text-slate-200",
      "prose prose-slate dark:prose-invert prose-lg max-w-none",
      // Typography enhancements
      "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:drop-shadow-sm",
      "prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300",
      "prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-500 dark:hover:prose-a:text-cyan-300 hover:prose-a:underline transition-colors",
      "prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none",
      "prose-blockquote:border-l-cyan-500/50 prose-blockquote:bg-slate-100/50 dark:prose-blockquote:bg-white/5 prose-blockquote:py-3 prose-blockquote:px-8 prose-blockquote:italic prose-blockquote:rounded-2xl prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300",
      "prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-slate-200 dark:prose-img:border-white/10",
      "prose-hr:border-slate-200 dark:prose-hr:border-white/10",
      "prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold",
      "prose-code:text-cyan-700 dark:prose-code:text-cyan-300 prose-code:bg-slate-100 dark:prose-code:bg-white/5 prose-code:ring-1 prose-code:ring-slate-200 dark:prose-code:ring-white/10",
      className
    )}>
      {/* Subtle top-light effect - Only in dark mode */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none hidden dark:block" />

      <ReactMarkdown
        components={{
          code({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { className?: string }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !parsedIsBlock(children as string);

            if (isInline) {
              return (
                <code className="bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded-md text-cyan-700 dark:text-cyan-300 font-mono text-[0.85em] border border-slate-200 dark:border-white/10" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 my-8 shadow-2xl transition-all hover:border-slate-300 dark:hover:border-white/20">
                {/* Mac Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner" />
                  </div>
                  {match && (
                    <span className="ml-auto text-[10px] text-slate-400 dark:text-white/40 font-mono uppercase tracking-[0.2em]">
                      {match[1]}
                    </span>
                  )}
                </div>

                <div className="rounded-none !m-0 !bg-transparent overflow-x-auto">
                  <SyntaxHighlighter
                    style={oneDark as any}
                    language={match?.[1] || 'text'}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.875rem',
                      lineHeight: '1.7',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Helper to detect if content is meant to be a block (fallback)
function parsedIsBlock(content: string) {
  return content.includes('\n');
}
