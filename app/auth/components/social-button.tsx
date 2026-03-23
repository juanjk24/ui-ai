import { Button } from "@/components/ui/button";

interface SocialButtonProps {
    children: React.ReactNode;
    action: () => void;
}

export default function SocialButton({ children, action }: SocialButtonProps) {
    return <Button onClick={action} variant="outline" className="w-full">{children}</Button>;
}
