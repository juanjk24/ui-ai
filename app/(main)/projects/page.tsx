"use client";

import { useState } from "react";
import {
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Calendar,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const projects = [
  {
    id: "1",
    name: "E-commerce App",
    description: "Tienda online con diseño minimalista y moderno",
    color: "bg-blue-500",
    components: 24,
    lastUpdated: "Hace 2 horas",
    status: "active",
    palette: ["#3B82F6", "#10B981", "#1F2937", "#F3F4F6"],
  },
  {
    id: "2",
    name: "Dashboard SaaS",
    description: "Panel de control para aplicación de analytics",
    color: "bg-emerald-500",
    components: 18,
    lastUpdated: "Hace 5 horas",
    status: "active",
    palette: ["#10B981", "#6366F1", "#1F2937", "#F3F4F6"],
  },
  {
    id: "3",
    name: "Landing Startup",
    description: "Página de presentación para startup fintech",
    color: "bg-amber-500",
    components: 12,
    lastUpdated: "Ayer",
    status: "draft",
    palette: ["#F59E0B", "#3B82F6", "#1F2937", "#FFFFFF"],
  },
  {
    id: "4",
    name: "Blog Personal",
    description: "Diseño editorial limpio y legible",
    color: "bg-rose-500",
    components: 8,
    lastUpdated: "Hace 3 días",
    status: "completed",
    palette: ["#F43F5E", "#0EA5E9", "#1F2937", "#FAFAFA"],
  },
  {
    id: "5",
    name: "App Fitness",
    description: "Interfaz energética para tracking de ejercicios",
    color: "bg-cyan-500",
    components: 31,
    lastUpdated: "Hace 1 semana",
    status: "active",
    palette: ["#06B6D4", "#8B5CF6", "#0F172A", "#F8FAFC"],
  },
  {
    id: "6",
    name: "Portfolio Creativo",
    description: "Showcase de trabajos con estilo artístico",
    color: "bg-fuchsia-500",
    components: 15,
    lastUpdated: "Hace 2 semanas",
    status: "draft",
    palette: ["#D946EF", "#EC4899", "#18181B", "#FAFAF9"],
  },
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Mis proyectos
            </h1>
            <p className="text-muted-foreground mt-1">
              {projects.length} proyectos en total
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar proyectos..."
              className="pl-10 bg-input border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div
          className={cn(
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "flex flex-col gap-3",
          )}
        >
          {filteredProjects.map((project) =>
            viewMode === "grid" ? (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="group"
              >
                <Card
                  key={project.id}
                  className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <CardContent className="p-0">
                    {/* Color preview header */}
                    <div className="h-24 rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex">
                        {project.palette.map((color, i) => (
                          <div
                            key={i}
                            className="flex-1"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="absolute top-3 right-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e: React.MouseEvent) =>
                              e.stopPropagation()
                            }
                          >
                            <Button
                              variant="secondary"
                              size="icon"
                              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Duplicar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={cn("w-3 h-3 rounded-full", project.color)}
                        />
                        <h3 className="font-semibold text-foreground">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            {project.components}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {project.lastUpdated}
                          </span>
                        </div>
                        <Badge
                          variant={
                            project.status === "active"
                              ? "default"
                              : project.status === "completed"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {project.status === "active"
                            ? "Activo"
                            : project.status === "completed"
                              ? "Completado"
                              : "Borrador"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Link href={`/projects/${project.id}`} key={project.id} className="group">
                <Card
                  key={project.id}
                  className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <CardContent className="p-4 flex items-center gap-4 relative">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex">
                      {project.palette.slice(0, 2).map((color, i) => (
                        <div
                          key={i}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={cn("w-2 h-2 rounded-full", project.color)}
                        />
                        <h3 className="font-semibold text-foreground">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground pr-10">
                      <span className="flex items-center gap-1">
                        <Layers className="w-4 h-4" />
                        {project.components}
                      </span>
                      <span>{project.lastUpdated}</span>
                      <Badge
                        variant={
                          project.status === "active"
                            ? "default"
                            : project.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status === "active"
                          ? "Activo"
                          : project.status === "completed"
                            ? "Completado"
                            : "Borrador"}
                      </Badge>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                          <Button
                            variant="secondary"
                            size="icon"
                            className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
