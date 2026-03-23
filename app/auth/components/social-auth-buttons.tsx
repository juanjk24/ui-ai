import Image from "next/image";
import SocialButton from "./social-button";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

type Provider = "google" | "github";
type ProviderType = {
    name: Provider;
    label: string;
    icon: string;
    size: number
}

const providers: ProviderType[] = [
    {
        name: "google",
        label: "Iniciar sesión con Google",
        icon: "/icons/google.svg",
        size: 24
    },
    {
        name: "github",
        label: "Iniciar sesión con GitHub",
        icon: "/icons/github.svg",
        size: 24
    }
];

export default function SocialAuthButtons() {
    const handleLogin = async (provider: Provider) => {
        const supabase = createClient();

        await supabase.auth.signInWithOAuth({ 
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });

        toast.loading(`Redirigiendo a ${provider} para iniciar sesión...`);
    }

    return (
        <div className="flex flex-col gap-3">
            {providers.map((provider) => (
                <SocialButton key={provider.name} action={() => handleLogin(provider.name)}>
                    <Image src={provider.icon} className="w-6 h-6" alt={provider.label} width={provider.size} height={provider.size} />
                    {provider.label}
                </SocialButton>
            ))}
        </div>
    )
}