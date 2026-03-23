"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SocialAuthButtons from "../components/social-auth-buttons";

export default function Login() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 h-full flex flex-col justify-center mt-[-10vh]">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bienvenido de vuelta
          </h1>
          <p className="text-muted-foreground">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-center">Iniciar sesión</CardTitle>
            <CardDescription className="text-center">
              Selecciona tu método preferido para acceder.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <SocialAuthButtons />
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 pt-2">
            <div className="text-center text-sm text-muted-foreground w-full">
              Al continuar, aceptas nuestros{" "}
              <Link
                href="/terms"
                className="underline hover:text-foreground transition-colors"
              >
                Términos de servicio
              </Link>{" "}
              y{" "}
              <Link
                href="/privacy"
                className="underline hover:text-foreground transition-colors"
              >
                Política de privacidad
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
