"use client"

import { useCallback, useEffect, useRef, memo } from 'react'
import { useEditor, EditorContent, ReactNodeViewRenderer, type Editor } from '@tiptap/react'
import type {
  TiptapEditorProps,
  TiptapPreviewProps,
  TiptapToolbarProps,
  ToolbarButtonProps,
  MarkdownStorage,
} from '@/types/editor'
import StarterKit from '@tiptap/starter-kit'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import Typography from '@tiptap/extension-typography'
import { common, createLowlight } from 'lowlight'
import { Markdown } from 'tiptap-markdown'
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Quote, Code, Undo, Redo, Minus, ImageIcon, Strikethrough } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CodeBlockComponent } from './CodeBlockComponent'

const lowlight = createLowlight(common)

/**
 * Shared prose classes for editor and preview (Juejin z-blue style).
 * Single source of truth so both render identically.
 * @internal
 */
export const Z_BLUE_PROSE_CLASS = cn(
  'prose prose-lg max-w-none focus:outline-none p-6 font-[\'Fira_Sans\']',
  'prose-slate dark:prose-invert',
  'prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:font-[\'Fira_Code\']',
  'prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 hover:prose-a:underline',
  'prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-blockquote:text-muted-foreground',
  'prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border',
  'prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded font-[\'Fira_Code\']',
  'prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
  'prose-hr:border-border border-0 border-b'
)

/** Shared extensions for editable and read-only Tiptap (markdown + code highlight). */
function getTiptapExtensions() {
  return [
    StarterKit.configure({
      codeBlock: false,
      heading: { levels: [1, 2, 3] },
      link: { openOnClick: false, HTMLAttributes: { class: 'text-primary underline hover:text-primary/80' } },
    }),
    CodeBlockLowlight.extend({
      addNodeView() {
        return ReactNodeViewRenderer(CodeBlockComponent) as unknown as import('@tiptap/core').NodeViewRenderer
      },
    }).configure({ lowlight }),
    Typography,
    Image.configure({
      allowBase64: false,
      HTMLAttributes: { class: 'rounded-xl shadow-lg border border-border max-w-full h-auto' },
    }),
    Markdown.configure({
      html: false,
      transformPastedText: true,
      transformCopiedText: true,
    }),
  ] as import('@tiptap/react').AnyExtension[]
}

/**
 * Rich text editor built with Tiptap, storing content as Markdown.
 *
 * @remarks
 * Uses StarterKit, CodeBlockLowlight (syntax highlighting), Typography,
 * Image (URL only, no base64), and tiptap-markdown. Toolbar provides
 * bold/italic/strike, H1–H3, lists, blockquote, code block, horizontal rule,
 * insert image, undo/redo. Configured for SSR (immediatelyRender: false).
 *
 * @param props - See {@link TiptapEditorProps}
 * @returns The editor UI or `null` until the editor instance is ready
 *
 * @example
 * ```tsx
 * const [content, setContent] = useState('')
 * return (
 *   <TiptapEditor
 *     content={content}
 *     onChange={setContent}
 *     className="min-h-[400px]"
 *   />
 * )
 * ```
 */
export function TiptapEditor({ content, onChange, className }: TiptapEditorProps) {
  const lastEmittedMarkdownRef = useRef<string>(content)

  const editor = useEditor({
    extensions: getTiptapExtensions(),
    editorProps: {
      attributes: { class: Z_BLUE_PROSE_CLASS + ' min-h-[400px]' },
    },
    content,
    editable: true,
    onUpdate: ({ editor: ed }) => {
      const storage = ed.storage as unknown as Record<string, unknown>
      const markdown = (storage.markdown as MarkdownStorage).getMarkdown()
      lastEmittedMarkdownRef.current = markdown
      onChange(markdown)
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (!editor) return
    if (content === lastEmittedMarkdownRef.current) return
    lastEmittedMarkdownRef.current = content
    editor.commands.setContent(content, { emitUpdate: false })
  }, [editor, content])

  const insertImageByUrl = useCallback(() => {
    const url = window.prompt('图片 URL')
    if (url?.trim()) editor?.chain().focus().setImage({ src: url.trim() }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className={cn('flex flex-col h-full overflow-hidden rounded-xl gap-4', className)}>
      <TiptapToolbar editor={editor} onInsertImage={insertImageByUrl} />
      <div className="flex-1 relative min-h-0 bg-card rounded-xl overflow-y-auto overflow-x-hidden">
        <EditorContent editor={editor} className="min-h-full focus:outline-none" />
      </div>
    </div>
  )
}

TiptapEditor.displayName = 'TiptapEditor'

/**
 * Read-only Tiptap renderer; same extensions and prose as TiptapEditor.
 * Use for preview so editor and preview render identically.
 */
export function TiptapPreview({ content, className }: TiptapPreviewProps) {
  const editor = useEditor({
    extensions: getTiptapExtensions(),
    editorProps: {
      attributes: { class: Z_BLUE_PROSE_CLASS },
    },
    content,
    editable: false,
    immediatelyRender: false,
  })

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(content, { emitUpdate: false })
  }, [editor, content])

  if (!editor) {
    return null
  }

  return (
    <div className={cn('rounded-xl overflow-hidden', className)}>
      <EditorContent editor={editor} className="min-h-0 focus:outline-none" />
    </div>
  )
}

TiptapPreview.displayName = 'TiptapPreview'

/**
 * Toolbar with formatting buttons and undo/redo.
 *
 * @param props - See {@link TiptapToolbarProps}
 * @returns The toolbar JSX
 * @internal
 */
function TiptapToolbar({ editor, onInsertImage }: TiptapToolbarProps) {
  const toolbarGroups = [
    {
      id: 'text-style',
      items: [
        { onClick: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold'), icon: Bold, title: 'Bold' },
        { onClick: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic'), icon: Italic, title: 'Italic' },
        { onClick: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive('strike'), icon: Strikethrough, title: 'Strikethrough' },
      ],
    },
    {
      id: 'headings',
      items: [
        { onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }), icon: Heading1, title: 'Heading 1' },
        { onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }), icon: Heading2, title: 'Heading 2' },
        { onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }), icon: Heading3, title: 'Heading 3' },
      ],
    },
    {
      id: 'lists',
      items: [
        { onClick: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList'), icon: List, title: 'Bullet List' },
        { onClick: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList'), icon: ListOrdered, title: 'Ordered List' },
      ],
    },
    {
      id: 'blocks',
      items: [
        { onClick: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote'), icon: Quote, title: 'Quote' },
        { onClick: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive('codeBlock'), icon: Code, title: 'Code Block' },
        { onClick: () => editor.chain().focus().setHorizontalRule().run(), isActive: false, icon: Minus, title: 'Horizontal Rule' },
        { onClick: onInsertImage, isActive: false, icon: ImageIcon, title: 'Insert Image' },
      ],
    },
  ]

  return (
    <div className="flex items-center gap-1 px-4 py-2.5 bg-card flex-wrap shrink-0 rounded-xl">
      {toolbarGroups.map((group, i) => (
        <div key={group.id} className="flex items-center gap-0.5">
          {i > 0 ? <div className="w-px h-5 bg-border/50 mx-1.5" /> : null}
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
  )
}

/**
 * Memoized toolbar button with neumorphic styling.
 *
 * @param props - See {@link ToolbarButtonProps}
 * @returns A ghost Button with icon
 * @internal
 */
const ToolbarButton = memo(function ToolbarButton({
  onClick,
  isActive,
  disabled,
  icon: Icon,
  title,
}: ToolbarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-8 w-8 rounded-xl transition-all duration-200 cursor-pointer',
        isActive
          ? 'neumorphic-pressed text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/80 neumorphic active:neumorphic-pressed',
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      )}
      title={title}
    >
      <Icon className={cn('h-4 w-4 transition-transform duration-300', isActive ? 'scale-110' : '')} />
    </Button>
  )
})
ToolbarButton.displayName = 'ToolbarButton'
