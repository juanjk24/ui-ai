"use client"

import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

export default function AppearanceContent() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onClick={() => setTheme("light")}
        className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 bg-card hover:bg-muted/50 transition-colors cursor-pointer ${
          theme === "light" ? "border-primary" : "border-border"
        }`}
      >
        <Sun className="h-8 w-8 mb-3" />
        <span className="font-semibold">Claro</span>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 bg-card hover:bg-muted/50 transition-colors cursor-pointer ${
          theme === "dark" ? "border-primary" : "border-border"
        }`}
      >
        <Moon className="h-8 w-8 mb-3" />
        <span className="font-semibold">Oscuro</span>
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 bg-card hover:bg-muted/50 transition-colors cursor-pointer ${
          theme === "system" ? "border-primary" : "border-border"
        }`}
      >
        <Laptop className="h-8 w-8 mb-3" />
        <span className="font-semibold">Sistema</span>
      </button>
    </div>
  );
}
