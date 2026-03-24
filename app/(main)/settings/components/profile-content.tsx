import { createClient } from "@/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, LogIn, Shield, Github } from "lucide-react";

export default async function ProfileContent() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return (
      <div className="rounded-lg border bg-card p-8 flex items-center justify-center text-destructive">
        Error al cargar el perfil.
      </div>
    );
  }

  const { user_metadata, app_metadata, email, created_at, last_sign_in_at } =
    user;

  const name =
    user_metadata?.full_name ||
    user_metadata?.name ||
    email?.split("@")[0] ||
    "Usuario";
  const avatarUrl = user_metadata?.avatar_url || user_metadata?.picture;

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const getProviderIcon = (providerResult: string) => {
    if (providerResult === "google") return "/icons/google.svg";
    return null;
  };

  return (
    <div className="space-y-8">
      {/* personal information */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Avatar className="w-24 h-24 border-2 border-border shadow-sm">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="text-2xl">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {name}
          </h2>
          <div className="flex items-center justify-center sm:justify-start text-muted-foreground gap-2">
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </div>

          {user_metadata?.user_name && (
            <div className="text-sm text-muted-foreground">
              @{user_metadata.user_name}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="space-y-4 flex flex-col">
          {/* Account Details */}
          <h3 className="text-lg font-semibold tracking-tight">
            Detalles de la Cuenta
          </h3>

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm text-foreground">
                  Usuario desde
                </p>
                <p className="text-sm text-muted-foreground">
                  {created_at ? formatDate(created_at) : "Desconocido"}
                </p>
              </div>
            </div>

            <div className="flex-1 flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
              <LogIn className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm text-foreground">
                  Último acceso
                </p>
                <p className="text-sm text-muted-foreground">
                  {last_sign_in_at
                    ? formatDate(last_sign_in_at)
                    : "Desconocido"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Proveedores de Autenticación */}
        <div className="space-y-4 flex flex-col">
          <h3 className="text-lg font-semibold tracking-tight">
            Proveedores de Sesión
          </h3>

          <div className="flex-1 p-4 rounded-lg bg-muted/50 border border-border flex flex-col space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Proveedor actual
              </p>

              <Badge
                variant="secondary"
                className="capitalize mb-1 px-2 py-1 text-sm bg-background border-border"
              >
                {app_metadata?.provider === "github" && (
                  <Github
                    className="w-3 h-3 mr-2"
                  />
                )}
                {app_metadata?.provider === "google" && (
                  <img
                    src={getProviderIcon("google")!}
                    alt="Google"
                    className="w-3 h-3 mr-2"
                  />
                )}
                {app_metadata?.provider || "Email"}
              </Badge>
            </div>

            {app_metadata?.providers && app_metadata.providers.length > 0 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Historial de proveedores
                </p>

                <div className="flex flex-wrap gap-2">
                  {app_metadata.providers.map((provider: string) => (
                    <Badge
                      key={provider}
                      variant="outline"
                      className="capitalize bg-background text-xs"
                    >
                      {provider === "github" && (
                        <Github
                          className="w-3 h-3 mr-1.5"
                        />
                      )}
                      {provider === "google" && (
                        <img
                          src={getProviderIcon("google")!}
                          alt="Google"
                          className="w-3 h-3 mr-1.5"
                        />
                      )}
                      {provider}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
