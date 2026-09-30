import { LAST_BUSINESS_KEY } from "@/utils/key";
import {
  Store,
  Shield,
  CreditCard,
  Calculator,
  LogOut,
  UserPlus,
} from "lucide-react";
import type { SidebarItem } from "types/Index.types";

const businessId = localStorage.getItem(LAST_BUSINESS_KEY);
// Shorcurts
export const ShorcurtsBusiness: SidebarItem[] = [
  {
    type: "link",
    title: "Nueva sucursal",
    url: `/dashboard/business/${businessId}/branches/new`,
    icon: <Store size={19} />,
    macro: "NEW_BRANCH",
  },

  {
    type: "link",
    title: "Punto de venta",
    url: `/dashboard/business/${businessId}/POS`,
    icon: <Calculator size={19} />,
    macro: "POS",
  },

  {
    type: "link",
    title: "Roles generales",
    url: `/dashboard/business/${businessId}/personnel`,
    icon: <Shield size={19} />,
    macro: "GENERAL_ROLES",
  },

  {
    type: "link",
    title: "Facturación SaaS",
    url: `/dashboard/business/${businessId}/billing`,
    icon: <CreditCard size={19} />,
    macro: "SAAS_BILLING",
  },

  {
    type: "link",
    title: "Nuevo personal",
    url: `/dashboard/business/${businessId}/personnel/register`,
    icon: <UserPlus size={19} />,
    macro: "NEW_PERSONNEL",
  },

  {
    type: "link",
    title: "Cerrar sesión",
    url: "",
    icon: <LogOut size={19} />,
    macro: "LOGOUT",
  },
];

// type: "link",
//         title: "Mi Perfil",
//         url: "/profile/index",
//         icon: <User size={24} />
