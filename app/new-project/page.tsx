"use client"

import { useState } from "react"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NewProjectViewProps {
  onProjectCreated: (id: string) => void
}

const projectTypes = [
  { id: "ecommerce", label: "E-commerce", icon: "🛒" },
  { id: "saas", label: "SaaS / Dashboard", icon: "📊" },
  { id: "landing", label: "Landing Page", icon: "🚀" },
  { id: "blog", label: "Blog / Editorial", icon: "📝" },
  { id: "portfolio", label: "Portfolio", icon: "🎨" },
  { id: "app", label: "Aplicación móvil", icon: "📱" },
]

const stylePresets = [
  { id: "minimal", label: "Minimalista", description: "Limpio, espacioso, tipografía elegante" },
  { id: "bold", label: "Bold & Moderno", description: "Colores vibrantes, formas geométricas" },
  { id: "elegant", label: "Elegante", description: "Sofisticado, premium, detalles finos" },
  { id: "playful", label: "Divertido", description: "Colorido, redondeado, amigable" },
  { id: "corporate", label: "Corporativo", description: "Profesional, serio, confiable" },
  { id: "tech", label: "Tech / Startup", description: "Moderno, innovador, dark mode" },
]

const colorMoods = [
  { id: "warm", label: "Cálidos", colors: ["#F97316", "#EF4444", "#F59E0B", "#DC2626"] },
  { id: "cool", label: "Fríos", colors: ["#3B82F6", "#06B6D4", "#8B5CF6", "#0EA5E9"] },
  { id: "nature", label: "Naturaleza", colors: ["#10B981", "#84CC16", "#22C55E", "#14B8A6"] },
  { id: "neutral", label: "Neutros", colors: ["#6B7280", "#9CA3AF", "#374151", "#D1D5DB"] },
  { id: "vibrant", label: "Vibrantes", colors: ["#EC4899", "#8B5CF6", "#F97316", "#06B6D4"] },
]

export default function NewProject({ onProjectCreated }: NewProjectViewProps) {
  const [step, setStep] = useState(1)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const canProceed = () => {
    if (step === 1) return projectName.length > 0
    if (step === 2) return selectedType !== null
    if (step === 3) return selectedStyle !== null && selectedMood !== null
    return false
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Create project and navigate to editor
      onProjectCreated("new-" + Date.now())
    }
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                s < step ? "bg-primary text-primary-foreground" :
                s === step ? "bg-primary text-primary-foreground" :
                "bg-muted text-muted-foreground"
              )}>
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={cn(
                  "w-16 h-0.5 transition-colors",
                  s < step ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Crea tu proyecto</h1>
              <p className="text-muted-foreground mt-2">Comienza dándole un nombre y descripción a tu proyecto</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del proyecto</Label>
                <Input
                  id="name"
                  placeholder="Mi increíble proyecto"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe brevemente de qué trata tu proyecto..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="bg-input border-border resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Project Type */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tipo de proyecto</h1>
              <p className="text-muted-foreground mt-2">¿Qué tipo de interfaz vas a construir?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projectTypes.map((type) => (
                <Card
                  key={type.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary/50",
                    selectedType === type.id ? "border-primary bg-primary/5" : "bg-card border-border"
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-6 text-center">
                    <span className="text-4xl mb-3 block">{type.icon}</span>
                    <p className="font-medium text-foreground">{type.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Style & Colors */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Estilo visual</h1>
              <p className="text-muted-foreground mt-2">Define la personalidad visual de tu proyecto</p>
            </div>

            {/* Style presets */}
            <div className="space-y-4">
              <Label>Estilo general</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {stylePresets.map((style) => (
                  <Card
                    key={style.id}
                    className={cn(
                      "cursor-pointer transition-all hover:border-primary/50",
                      selectedStyle === style.id ? "border-primary bg-primary/5" : "bg-card border-border"
                    )}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <CardContent className="p-4">
                      <p className="font-medium text-foreground mb-1">{style.label}</p>
                      <p className="text-xs text-muted-foreground">{style.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Color mood */}
            <div className="space-y-4">
              <Label>Paleta de colores</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {colorMoods.map((mood) => (
                  <Card
                    key={mood.id}
                    className={cn(
                      "cursor-pointer transition-all hover:border-primary/50",
                      selectedMood === mood.id ? "border-primary bg-primary/5" : "bg-card border-border"
                    )}
                    onClick={() => setSelectedMood(mood.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-1 mb-3">
                        {mood.colors.map((color, i) => (
                          <div 
                            key={i} 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-foreground">{mood.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              Atrás
            </Button>
          ) : (
            <div />
          )}
          <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
            {step === 3 ? (
              <>
                <Sparkles className="w-4 h-4" />
                Crear proyecto
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
