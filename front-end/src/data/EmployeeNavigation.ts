import { MEMBER_ROLES, type NavGroup } from "@/types/Index.types";
import { LayoutDashboard, ShoppingCart, ClipboardList, Table2, BookOpen, Users, Package, UserRoundCog, Receipt, ChartNoAxesCombined, Settings } from "lucide-react";

export const NAVIGATION_SCHEMA: NavGroup[] = [
    {
        items: [
            { id: 'overview', label: 'Overview', icon: LayoutDashboard }
        ]
    },
    {
        groupLabel: 'OPERACIÓN',
        items: [
            { id: 'pos', label: 'POS', icon: ShoppingCart, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER, MEMBER_ROLES.STAFF, MEMBER_ROLES.EMPLOYEE] },
            { id: 'ordenes', label: 'Órdenes', icon: ClipboardList, badge: 3, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER, MEMBER_ROLES.STAFF, MEMBER_ROLES.EMPLOYEE] },
            { id: 'mesas', label: 'Mesas', icon: Table2, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER, MEMBER_ROLES.STAFF, MEMBER_ROLES.EMPLOYEE] }
        ]
    },
    {
        groupLabel: 'CATÁLOGO',
        items: [
            { id: 'menu', label: 'Menú', icon: BookOpen, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER, MEMBER_ROLES.OWNER] },
            { id: 'clientes', label: 'Clientes', icon: Users, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER, MEMBER_ROLES.OWNER] },
            { id: 'inventario', label: 'Inventario', icon: Package, badge: 5, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER, MEMBER_ROLES.OWNER] }
        ]
    },
    {
        groupLabel: 'ADMINISTRACIÓN',
        items: [
            { id: 'equipo', label: 'Equipo', icon: UserRoundCog, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.OWNER] },
            { id: 'facturacion', label: 'Facturación', icon: Receipt, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.OWNER] },
            { id: 'reportes', label: 'Reportes', icon: ChartNoAxesCombined, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.MANAGER, MEMBER_ROLES.OWNER] }
        ]
    },
    {
        groupLabel: 'CONFIGURACIÓN',
        items: [
            { id: 'ajustes', label: 'Ajustes', icon: Settings, roles: [MEMBER_ROLES.ADMIN, MEMBER_ROLES.OWNER] }
        ]
    }
];