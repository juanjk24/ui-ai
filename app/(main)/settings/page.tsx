"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const tab = searchParams.get("tab") || "profile";
    
    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("tab", value);
        router.push(`${pathname}?${params.toString()}`);
    };
    
  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
            <p className="text-muted-foreground mt-1">Aquí puedes ajustar tus preferencias y configuraciones</p>
          </div>
        </header>

        <Tabs 
          defaultValue={tab} 
          onValueChange={handleTabChange}
          className="flex flex-col md:flex-row gap-8"
        >
          <TabsList className="flex flex-col flex-none h-fit max-h-min bg-transparent space-y-2 items-start w-full md:w-56 p-0 rounded-none shrink-0 justify-start">
            <TabsTrigger 
              value="profile" 
              className="w-full flex-none h-9 justify-start data-[state=active]:bg-muted hover:bg-muted/50 data-[state=active]:shadow-none rounded-md px-4 py-0 font-normal outline-none cursor-pointer"
            >
              Perfil
            </TabsTrigger>

            <TabsTrigger 
              value="appearance" 
              className="w-full flex-none h-9 justify-start data-[state=active]:bg-muted hover:bg-muted/50 data-[state=active]:shadow-none rounded-md px-4 py-0 font-normal outline-none cursor-pointer"
            >
              Apariencia
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 max-w-3xl">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil del Usuario</CardTitle>
                  <CardDescription>
                    Administra tu información personal y cómo te ven los demás.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Aquí irá el contenido del perfil */}
                  <div className="rounded-lg border bg-card p-8 flex items-center justify-center text-muted-foreground">
                    Contenido y formulario del perfil irán aquí.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Apariencia</CardTitle>
                  <CardDescription>
                    Personaliza la interfaz de la aplicación según tus preferencias.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Aquí irá el contenido del tema */}
                  <div className="rounded-lg border bg-card p-8 flex items-center justify-center text-muted-foreground">
                    Opciones de temas claro, oscuro y sistema irán aquí.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
