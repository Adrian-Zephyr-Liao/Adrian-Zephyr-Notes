"use client"

import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { Markdown } from 'tiptap-markdown'
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Code, Undo, Redo } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CodeBlockComponent } from './CodeBlockComponent'

const lowlight = createLowlight(common)

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  className?: string
}

interface MarkdownStorage {
  getMarkdown: () => string
}

export function TiptapEditor({ content, onChange, className }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent)
        },
      }).configure({ lowlight }),
      Markdown.configure({
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: cn(
          // Base Typography - Fira Sans for body
          "prose prose-lg max-w-none focus:outline-none min-h-[500px] p-8 font-['Fira_Sans']",
          // Adaptive Prose
          "prose-slate dark:prose-invert",

          // Headings - Fira Code for technical feel
          "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:font-['Fira_Code']",

          // Links
          "prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 hover:prose-a:underline",

          // Blockquotes
          "prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-blockquote:text-muted-foreground",

          // Images
          "prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border",

          // Code Blocks & Inline Code - Fira Code
          "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded font-['Fira_Code']",
          "prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",

          // Horizontal Rules
          "prose-hr:border-border border-0 border-b"
        ),
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      // Get markdown content safely
      const storage = editor.storage as unknown as Record<string, unknown>
      const markdown = (storage.markdown as MarkdownStorage).getMarkdown()
      onChange(markdown)
    },
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  const toolbarGroups = [
    {
      id: 'text-style',
      items: [
        { onClick: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), icon: Bold, title: "Bold" },
        { onClick: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), icon: Italic, title: "Italic" },
      ]
    },
    {
      id: 'headings',
      items: [
        { onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }), icon: Heading1, title: "Heading 1" },
        { onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }), icon: Heading2, title: "Heading 2" },
      ]
    },
    {
      id: 'lists',
      items: [
        { onClick: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), icon: List, title: "Bullet List" },
        { onClick: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList'), icon: ListOrdered, title: "Ordered List" },
      ]
    },
    {
      id: 'blocks',
      items: [
        { onClick: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote'), icon: Quote, title: "Quote" },
        { onClick: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive('codeBlock'), icon: Code, title: "Code Block" },
      ]
    }
  ]

  return (
    <div className={cn(
      "flex flex-col h-full bg-card overflow-hidden",
      className
    )}>
      {/* Toolbar - Soft UI Evolution */}
      <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-muted/20 flex-wrap">
        {toolbarGroups.map((group, i) => (
          <div key={group.id} className="flex items-center gap-0.5">
            {i > 0 && <div className="w-px h-5 bg-border/50 mx-1.5" />}
            {group.items.map((item) => (
              <ToolbarButton
                key={item.title}
                onClick={item.onClick}
                isActive={item.isActive}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </div>
        ))}

        <div className="flex-1" />

        <div className="flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={Undo}
            title="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={Redo}
            title="Redo"
          />
        </div>
      </div>

      {/* Editor Content Surface */}
      <div className="flex-1 relative min-h-0">
        <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
          <EditorContent
            editor={editor}
            className="h-full focus:outline-none"
          />
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: color-mix(in oklch, var(--primary) 20%, transparent);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: color-mix(in oklch, var(--primary) 30%, transparent);
        }
      `}</style>
    </div>
  )
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  icon: React.ComponentType<{ className?: string }>
  title: string
}

function ToolbarButton({ onClick, isActive, disabled, icon: Icon, title }: ToolbarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-8 w-8 rounded-xl transition-all duration-200 cursor-pointer",
        isActive
          ? "neumorphic-pressed text-primary"
          : "text-muted-foreground hover:text-foreground neumorphic hover:scale-105 active:neumorphic-pressed",
        disabled && "opacity-40 cursor-not-allowed"
      )}
      title={title}
    >
      <Icon className={cn("h-4 w-4 transition-transform duration-300", isActive && "scale-110")} />
    </Button>
  )
}
