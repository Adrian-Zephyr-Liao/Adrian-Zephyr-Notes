"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, PenTool, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const NAV_BTN_CLASS =
  "w-full justify-start gap-3 h-10 px-3 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-pointer rounded-xl"

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts/new", label: "New Post", icon: PenTool },
] as const

const SETTINGS_ITEM = { href: "/admin/settings", label: "Settings", icon: Settings } as const

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const isNewPost = pathname === "/admin/posts/new"

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {!isNewPost && (
        <Sidebar
          collapsible="none"
          className="hidden w-64 shrink-0 md:block m-4 h-[calc(100vh-2rem)] flex-col neumorphic rounded-xl"
        >
          <SidebarHeader className="h-16 items-center border-b border-border/50 px-6">
            <h1 className="text-lg font-semibold tracking-tight text-foreground font-['Fira_Code']">
              Blog Admin
            </h1>
          </SidebarHeader>
          <ScrollArea className="flex-1">
            <SidebarContent>
              <nav aria-label="Admin navigation" className="flex flex-col gap-2 p-3">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                      <SidebarMenuItem key={href}>
                        <Link href={href}>
                          <Button variant="ghost" className={NAV_BTN_CLASS}>
                            <Icon className="h-4 w-4" aria-hidden />
                            {label}
                          </Button>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="my-2" />
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Link href={SETTINGS_ITEM.href}>
                        <Button variant="ghost" className={NAV_BTN_CLASS}>
                          <SETTINGS_ITEM.icon className="h-4 w-4" aria-hidden />
                          {SETTINGS_ITEM.label}
                        </Button>
                      </Link>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              </nav>
            </SidebarContent>
          </ScrollArea>
        </Sidebar>
        )}

        <SidebarInset className={isNewPost ? "flex-1" : ""}>
          <main id="main-content" className={cn("flex-1", isNewPost ? "overflow-hidden" : "overflow-y-auto")}>
            {isNewPost ? children : <div className="container mx-auto max-w-7xl p-6 md:p-8">{children}</div>}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
