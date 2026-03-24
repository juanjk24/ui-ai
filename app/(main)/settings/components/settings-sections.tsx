import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import AppearanceContent from "./appearance-content";
import ProfileContent from "./profile-content";

export default async function SettingsSections() {
  return (
    <div className="flex-1 max-w-3xl">
      <TabsContent value="profile" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Perfil del Usuario</CardTitle>
            <CardDescription>
              Visualiza tu información de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileContent />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Tema</CardTitle>
            <CardDescription>
              Selecciona el tema para la interfaz de usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AppearanceContent />
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
}
