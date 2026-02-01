import { TiptapPreview } from '@/components/features/TiptapEditor';
import { ThemeToggle } from '@/components/theme-toggle';
import { TEST_MARKDOWN } from '@/lib/test-markdown';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function PreviewPage() {
  // Mock Data mimicking a real post
  const post = {
    title: "The Future of Digital Workspace Design",
    date: "October 24, 2025",
    readTime: "5 min read",
    tags: ["Design", "Productivity", "Workspace"],
    coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Adrian Zephyr",
      role: "Product Designer",
      avatar: "https://github.com/shadcn.png"
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">

        {/* Navigation */}
        <div className="mb-12 flex items-center justify-between">
          <Button variant="ghost" className="group pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <header className="mb-16 space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-medium text-primary">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 border border-border">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-muted-foreground text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center justify-center md:justify-start gap-4 pt-4 border-t border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full ring-2 ring-border" />
            <div className="text-left">
              <div className="text-foreground font-medium">{post.author.name}</div>
              <div className="text-xs text-muted-foreground">{post.author.role}</div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative aspect-21/9 mb-16 rounded-2xl overflow-hidden shadow-2xl border border-border group">
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt="Cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content: read-only Tiptap; prose follows global theme (Z_BLUE_PROSE_CLASS + html.dark) */}
        <TiptapPreview content={TEST_MARKDOWN} />
      </div>
    </main>
  );
}
