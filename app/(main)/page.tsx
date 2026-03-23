"use client"

import { Plus, TrendingUp, Layers, Palette, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface DashboardViewProps {
  onNewProject: () => void
  onProjectSelect: (id: string) => void
}

const stats = [
  { label: "Proyectos", value: "12", icon: Layers, trend: "+3 este mes" },
  { label: "Componentes", value: "148", icon: Palette, trend: "+24 esta semana" },
  { label: "Horas ahorradas", value: "36h", icon: Clock, trend: "estimado" },
]

const recentActivity = [
  { id: "1", project: "E-commerce App", action: "Generaste 5 botones", time: "Hace 2 horas", color: "bg-blue-500" },
  { id: "2", project: "Dashboard SaaS", action: "Nueva paleta de colores", time: "Hace 5 horas", color: "bg-emerald-500" },
  { id: "3", project: "Landing Startup", action: "Formulario de contacto", time: "Ayer", color: "bg-amber-500" },
  { id: "4", project: "E-commerce App", action: "Cards de producto", time: "Hace 2 días", color: "bg-blue-500" },
]

export default function Dashboard({ onNewProject, onProjectSelect }: DashboardViewProps) {
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground mt-1">Aquí tienes un resumen de tu actividad</p>
          </div>

          <Link href="/new-project" passHref>
            <Button onClick={onNewProject} className="gap-2">
              <Plus className="w-4 h-4" />
              Nuevo proyecto
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-white" />
                      <span className="text-xs text-muted-foreground">{stat.trend}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Quick Start */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Actividad reciente</CardTitle>
              <CardDescription>Últimas acciones en tus proyectos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id + activity.action}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onProjectSelect(activity.id)}
                >
                  <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.project}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Inicio rápido</CardTitle>
              <CardDescription>Crea componentes en segundos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <QuickStartItem 
                title="Paleta de colores"
                description="Define la identidad visual de tu proyecto"
                onClick={onNewProject}
              />
              <QuickStartItem 
                title="Sistema de botones"
                description="Primary, secondary, ghost y más"
                onClick={onNewProject}
              />
              <QuickStartItem 
                title="Formularios completos"
                description="Inputs, selects, checkboxes..."
                onClick={onNewProject}
              />
              <QuickStartItem 
                title="Cards y contenedores"
                description="Layouts responsivos y elegantes"
                onClick={onNewProject}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function QuickStartItem({ title, description, onClick }: { title: string; description: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Plus className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}
