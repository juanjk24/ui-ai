import { Tabs } from "@/components/ui/tabs";
import AsideTabsList from "./components/aside-tabs-list";
import SettingsSections from "./components/settings-sections";

export default function SettingsPage() {
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
          defaultValue="profile" 
          className="flex flex-col md:flex-row gap-8"
        >
          <AsideTabsList />
          <SettingsSections />
        </Tabs>
      </div>
    </div>
  );
}
