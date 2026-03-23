"use client";

import { redirect } from "next/navigation";
import { createClient } from "@/supabase/client";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

interface UserInfoProps {
  name: string;
  email: string;
  avatar_url?: string;
}

export function UserInfo({ user }: { user: UserInfoProps }) {
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Has cerrado sesión");
    redirect("/auth/login");
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
      <Link href="/settings?tab=profile">
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-sidebar-foreground truncate">
          {user.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-pretty">
              Estas seguro que deseas cerrar sesión?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleLogout}>
              Cerrar sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
