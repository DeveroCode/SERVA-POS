import { LucideSettings2, Shield, User } from "lucide-react";
import type { SidebarItem } from "types/Index.types";

// Admin Aside - Navigation
export const ASideLink: SidebarItem[] = [
    {
        type: "link",
        title: "Mi Perfil",
        url: "/profile/index",
        icon: <User size={24} />
    },
    {
        type: "link",
        title: "Seguridad",
        url: "/profile/security",
        icon: <Shield size={24} />
    },
    {
        "type": "link",
        "title": "Preferencias",
        "url": "/profile/preferences",
        "icon": <LucideSettings2 size={24} />
    }
];