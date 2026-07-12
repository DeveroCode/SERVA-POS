import {
    LayoutDashboard,
    TextAlignJustify,
    Ticket,
    HandPlatter,
    Calculator,
    Settings,
    LogOut,
} from "lucide-react";
import type { SidebarItem } from "types/Index.types";

export const DAsideLinks: SidebarItem[] = [
    {
        type: "link",
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboard size={32} />
    },
    {
        type: "link",
        title: "Menu",
        url: "/dashboard/menu",
        icon: <TextAlignJustify size={32} />
    },
    {
        type: "link",
        title: "Orders",
        url: "/dashboard/orders",
        icon: <Ticket size={32} />
    },
    {
        type: "link",
        title: "Tables",
        url: "/dashboard/tables",
        icon: <HandPlatter size={32} />
    },
    {
        type: "link",
        title: "POS",
        url: "/dashboard/pos",
        icon: <Calculator size={32} />
    },
];

export const DUAside: SidebarItem[] = [
    {
        type: "link",
        title: "Settings",
        url: "/profile/index",
        icon: <Settings size={32} />
    },
    {
        type: "link",
        title: "Logout",
        url: "/profile/logout",
        icon: <LogOut size={32} />
    },
];