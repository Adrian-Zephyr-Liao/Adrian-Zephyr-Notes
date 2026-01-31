import Link from "next/link"
import { LayoutDashboard, PenTool, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Neumorphism */}
      <aside className="w-64 hidden md:block m-4">
        <div className="flex h-[calc(100vh-2rem)] flex-col neumorphic">
          <div className="flex h-16 items-center px-6 border-b border-border/50">
            <h1 className="text-lg font-semibold tracking-tight text-foreground font-['Fira_Code']">
              Blog Admin
            </h1>
          </div>
          <ScrollArea className="flex-1">
            <nav className="p-3 space-y-1">
              <Link href="/admin">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 h-10 px-3 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer rounded-xl"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/admin/posts/new">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 h-10 px-3 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer rounded-xl"
                >
                  <PenTool className="h-4 w-4" />
                  New Post
                </Button>
              </Link>
              <Separator className="my-2" />
              <Link href="/admin/settings">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 h-10 px-3 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-pointer rounded-xl"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
