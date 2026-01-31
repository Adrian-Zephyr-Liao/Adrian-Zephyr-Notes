"use client"

import { useState, useCallback } from "react"
import { Eye, Save, Settings, PanelLeftClose, PanelRightClose, Image as ImageIcon, Tag, Hash, FileText, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MarkdownPreview } from "@/components/business/MarkdownPreview"
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

  // Post State
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

  // Auto-generate slug from title if slug is empty or matches previous title slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    const currentSlug = post.slug
    const expectedOldSlug = generateSlug(post.title)

    setPost(prev => ({
      ...prev,
      title: newTitle,
      slug: (!currentSlug || currentSlug === expectedOldSlug) ? generateSlug(newTitle) : currentSlug
    }))
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Top Action Bar - Neumorphism */}
      <div className="m-4 mb-0 neumorphic">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer rounded-xl">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold tracking-tight text-foreground font-['Fira_Code']">New Post</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Input
              placeholder="Post title..."
              className="h-9 w-80 neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary text-sm text-foreground placeholder:text-muted-foreground transition-all font-['Fira_Sans']"
              value={post.title}
              onChange={handleTitleChange}
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMetadata(!showMetadata)}
              className={cn(
                "transition-all duration-200 cursor-pointer rounded-xl neumorphic-pressed",
                showMetadata
                  ? "text-primary font-['Fira_Code']"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {showMetadata ? <PanelRightClose className="mr-2 h-4 w-4" /> : <PanelLeftClose className="mr-2 h-4 w-4" />}
              Metadata
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="neumorphic cursor-pointer transition-all duration-200 active:neumorphic-pressed">Save Draft</Button>
              <Button variant="default" size="sm" className="neumorphic bg-accent hover:bg-accent/90 text-accent-background cursor-pointer transition-all duration-200 active:neumorphic-pressed">
                <Save className="mr-2 h-4 w-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden gap-4 px-4 pb-4">
        {/* Main Editor Area */}
        <div className="flex flex-1 min-w-0 flex-col">
          <div className="flex-1 min-h-0 neumorphic">
            <TiptapEditor
              content={post.content}
              onChange={(content) => updatePost({ content })}
              className="h-full"
            />
          </div>
        </div>

        {/* Metadata Sidebar */}
        {showMetadata && (
          <div className="w-80 flex-shrink-0 neumorphic flex flex-col overflow-hidden">
            <div className="h-12 border-b border-border/50 flex items-center px-4">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 font-['Fira_Code']">
                <Settings className="h-4 w-4" />
                Post Settings
              </h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Slug */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5" />
                    Slug
                  </label>
                  <Input
                    value={post.slug}
                    onChange={(e) => updatePost({ slug: e.target.value })}
                    className="h-9 text-sm neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary font-['Fira_Code']"
                    placeholder="post-slug"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" />
                    Excerpt
                  </label>
                  <Textarea
                    value={post.excerpt}
                    onChange={(e) => updatePost({ excerpt: e.target.value })}
                    className="resize-none h-24 text-sm neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary leading-relaxed"
                    placeholder="Brief description..."
                  />
                </div>

                <Separator />

                {/* Cover Image */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground flex items-center gap-2">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Cover Image
                  </label>
                  <div className="group relative aspect-video neumorphic overflow-hidden flex items-center justify-center transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                    {post.coverImage ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.coverImage} alt="Cover" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="neumorphic cursor-pointer transition-all duration-200 active:neumorphic-pressed"
                            onClick={(e) => { e.stopPropagation(); updatePost({ coverImage: "" }); }}
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
                    value={post.coverImage}
                    onChange={(e) => updatePost({ coverImage: e.target.value })}
                    className="h-9 text-sm neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="Image URL"
                  />
                </div>

                <Separator />

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5" />
                    Tags
                  </label>
                  <Input
                    value={post.tags}
                    onChange={(e) => updatePost({ tags: e.target.value })}
                    className="h-9 text-sm neumorphic-inset focus-visible:ring-1 focus-visible:ring-primary"
                    placeholder="tag1, tag2, tag3"
                  />
                  {post.tags.split(',').filter(t => t.trim()).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {post.tags.split(',').filter(t => t.trim()).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-xl text-xs font-medium neumorphic text-primary">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}
