"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Save, Settings, Image as ImageIcon, Tag, Hash, FileText, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TiptapEditor } from "@/components/business/TiptapEditor"
import { TEST_MARKDOWN } from "@/lib/test-markdown"
import { cn } from "@/lib/utils"

interface PostState {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  tags: string
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export default function NewPostPage() {
  const [showMetadata, setShowMetadata] = useState(true)

  const [post, setPost] = useState<PostState>({
    title: "",
    slug: "",
    excerpt: "",
    content: TEST_MARKDOWN,
    coverImage: "",
    tags: ""
  })

  const updatePost = useCallback((updates: Partial<PostState>) => {
    setPost(prev => ({ ...prev, ...updates }))
  }, [])

  const toggleMetadata = useCallback(() => setShowMetadata(s => !s), [])

  const handleContentChange = useCallback(
    (content: string) => updatePost({ content }),
    [updatePost]
  )

  const handleRemoveCover = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      updatePost({ coverImage: "" })
    },
    [updatePost]
  )

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setPost(prev => {
      const expectedOldSlug = generateSlug(prev.title)
      const shouldUpdateSlug = !prev.slug || prev.slug === expectedOldSlug
      return {
        ...prev,
        title: newTitle,
        slug: shouldUpdateSlug ? generateSlug(newTitle) : prev.slug,
      }
    })
  }, [])

  const tagsList = post.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Action Bar - Card */}
      <div className="shrink-0 m-3 mb-0 bg-card rounded-xl">
        <div className="flex items-center h-12 px-4 gap-3">
          {/* Left - Back Button */}
          <Link href="/admin">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Back to admin" 
              className="text-muted-foreground hover:text-foreground hover:bg-muted neumorphic transition-all duration-200 cursor-pointer rounded-xl shrink-0 h-9 w-9"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </Button>
          </Link>

          {/* Center - Title Input (flex-1) */}
          <Input
            id="post-title"
            aria-label="Post title"
            placeholder="Untitled post..."
            className="flex-1 h-9 text-base font-medium neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/70 font-['Fira_Sans']"
            value={post.title}
            onChange={handleTitleChange}
          />

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMetadata}
              aria-label="Toggle settings panel"
              className={cn(
                "h-9 w-9 transition-all duration-200 cursor-pointer rounded-xl",
                showMetadata
                  ? "bg-primary/15 text-primary hover:bg-primary/20 hover:text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Settings className="h-4 w-4" aria-hidden />
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 neumorphic cursor-pointer transition-all duration-200 hover:bg-muted text-foreground"
            >
              Save Draft
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-all duration-200 active:neumorphic-pressed"
            >
              <Save className="mr-2 h-4 w-4" aria-hidden />
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0 overflow-hidden gap-3 px-3 pt-3 pb-3">
        {/* Main Editor Area */}
        <div className="flex flex-1 min-w-0 flex-col min-h-0 rounded-xl">
          <TiptapEditor
            content={post.content}
            onChange={handleContentChange}
            className="h-full"
          />
        </div>

        {/* Metadata Sidebar - Neumorphic with transition */}
        <div 
          className={cn(
            "shrink-0 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
            showMetadata ? "w-72" : "w-0 min-w-0"
          )}
        >
          <div className="w-72 min-w-72 h-full bg-card rounded-xl border-border flex flex-col overflow-hidden">
            <div className="h-11 border-b border-border/40 flex items-center px-3 shrink-0">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 font-['Fira_Code'] whitespace-nowrap">
                <Settings className="h-4 w-4" aria-hidden />
                Post Settings
              </h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-4">
              {/* Slug */}
              <div className="space-y-1.5">
                <Label htmlFor="post-slug" className="text-xs font-medium text-foreground flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5" aria-hidden />
                  Slug
                </Label>
                <Input
                  id="post-slug"
                  value={post.slug}
                  onChange={(e) => updatePost({ slug: e.target.value })}
                  className="h-8 text-sm neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary font-['Fira_Code']"
                  placeholder="post-slug"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <Label htmlFor="post-excerpt" className="text-xs font-medium text-foreground flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  Excerpt
                </Label>
                <Textarea
                  id="post-excerpt"
                  value={post.excerpt}
                  onChange={(e) => updatePost({ excerpt: e.target.value })}
                  className="resize-none h-20 text-sm leading-relaxed neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary"
                  placeholder="Brief description…"
                />
              </div>

              <Separator />

              {/* Cover Image */}
              <div className="space-y-1.5">
                <Label htmlFor="post-cover-image" className="text-xs font-medium text-foreground flex items-center gap-2">
                  <ImageIcon className="h-3.5 w-3.5" aria-hidden />
                  Cover Image
                </Label>
                <div className="group relative aspect-video neumorphic overflow-hidden flex items-center justify-center transition-[transform,opacity] duration-200 hover:scale-[1.01] cursor-pointer rounded-xl">
                  {post.coverImage ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer transition-all duration-200"
                            onClick={handleRemoveCover}
                        >
                          Remove
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-6 w-6" />
                      <span className="text-xs">Add cover image</span>
                    </div>
                  )}
                </div>
                <Input
                  id="post-cover-image"
                  value={post.coverImage}
                  onChange={(e) => updatePost({ coverImage: e.target.value })}
                  className="h-8 text-sm neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary"
                  placeholder="Image URL"
                />
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-1.5">
                <Label htmlFor="post-tags" className="text-xs font-medium text-foreground flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5" aria-hidden />
                  Tags
                </Label>
                <Input
                  id="post-tags"
                  value={post.tags}
                  onChange={(e) => updatePost({ tags: e.target.value })}
                  className="h-8 text-sm neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary"
                  placeholder="tag1, tag2, tag3"
                />
                {tagsList.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {tagsList.map((tag, i) => (
                      <span key={`${tag}-${i}`} className="px-2 py-0.5 rounded-lg text-xs font-medium neumorphic text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
