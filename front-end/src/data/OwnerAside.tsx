import { LayoutDashboard, TrendingUp } from "lucide-react";
import type { SidebarItem } from "types/Index.types";

export const OwnerAside : SidebarItem[] = [
  {
    type: "link",
    title: "General",
    url: "/dashboard/general",
    icon: <LayoutDashboard size={24} />
  },
  {
    type: "link",
    title: "Configuración",
    url: "/dashboard/settings",
    icon: <TrendingUp size={24} />
  }
];

// {
//     "group": "General",
//     "items": [
//       { "name": "Dashboard", "icon": "LayoutDashboard", "path": "/dashboard" },
//       { "name": "Analytics", "icon": "TrendingUp", "path": "/analytics" }
//     ]
//   },
//   {
//     "group": "Empresa",
//     "items": [
//       { "name": "Sucursales", "icon": "MapPin", "path": "/branches" },
//       { "name": "Equipo & Roles", "icon": "Users", "path": "/team" }
//     ]
//   },
//   {
//     "group": "Configuración",
//     "items": [
//       { "name": "Ajustes del Negocio", "icon": "Settings", "path": "/settings/general" },
//       { "name": "Facturación & Plan", "icon": "CreditCard", "path": "/settings/billing" },
//       { "name": "Integraciones & API", "icon": "Blocks", "path": "/settings/integrations" }
//     ]
//   }
