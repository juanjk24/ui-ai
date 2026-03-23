import { 
  LayoutDashboard, 
  Plus, 
  FolderOpen, 
  Settings, 
  Sparkles,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { UserInfo } from "./user-info"
import { createClient } from "@/supabase/server"

const recentProjects = [
  { id: "1", name: "E-commerce App", color: "bg-blue-500" },
  { id: "2", name: "Dashboard SaaS", color: "bg-emerald-500" },
  { id: "3", name: "Landing Startup", color: "bg-amber-500" },
  { id: "4", name: "New Project", color: "bg-purple-500" },
  { id: "5", name: "Portfolio Website", color: "bg-red-500" },
  { id: "6", name: "Blog Platform", color: "bg-indigo-500" },
]

export async function AppSidebar() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-lg text-sidebar-foreground">UI-AI</span>
      </div>

      <Separator className="h-px"/>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-3 space-y-1 min-h-0">
        <div className="shrink-0 space-y-1">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>

          <Link href="/new-project" passHref>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
            >
              <Plus className="w-4 h-4" />
              Nuevo proyecto
            </Button>
          </Link>

          <Link href="/projects" passHref>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
            >
              <FolderOpen className="w-4 h-4" />
              Mis proyectos
            </Button>
          </Link>

          <Separator className="my-4 h-px" />

          <p className="text-xs font-medium text-muted-foreground px-3 mb-2">RECIENTES</p>
        </div>
        
        <ScrollArea className="flex-1 overflow-hidden">
          <div className="space-y-1 pr-4">
            {recentProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} passHref>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sidebar-foreground text-sm"
                >
                  <div className={cn("w-2 h-2 rounded-full", project.color)} />
                  <span className="truncate flex-1 text-left">{project.name}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                </Button>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="vertical" className="text-sidebar w-2" />
        </ScrollArea>
      </nav>

      <Separator className="h-px shrink-0"/>

      {/* User section */}
      <div className="p-3 space-y-1 shrink-0">
        <Link href="/settings" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground"
          >
            <Settings className="w-4 h-4" />
            Configuración
          </Button>
        </Link>

        <UserInfo 
          user={{
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'Usuario',
            email: user.email || user.user_metadata?.email || '',
            avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
          }} 
        />
      </div>
    </aside>
  )
}
