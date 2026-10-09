import { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Edit3,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Settings,
  Printer,
  AlertTriangle,
  Copy,
  Check,
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Table2,
  BookOpen,
  Package,
  UserRoundCog,
  Receipt,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Menu as MenuIcon,
  X,
  LogOut,
  User,
  SlidersHorizontal,
  ArrowLeftRight
} from 'lucide-react';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

type UserRole = 'Owner' | 'Admin' | 'Manager' | 'Staff';

interface BranchMember {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarText: string;
}

interface ScheduleDay {
  day: string;
  hours: string;
  isToday?: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  roles?: UserRole[]; // Si no está definido, todos los roles tienen acceso
}

interface NavGroup {
  groupLabel?: string;
  items: NavItem[];
}

// ============================================================================
// DATOS DE PRUEBA (MOCKS)
// ============================================================================

const MOCK_BRANCH_MEMBERS: BranchMember[] = [
  { id: '1', name: 'Carlos Mendoza', role: 'Owner / Propietario', avatarBg: 'bg-orange-100 border-orange-200 text-[#C2410C]', avatarText: 'CM' },
  { id: '2', name: 'Mariana Ríos', role: 'Gerente de Sucursal', avatarBg: 'bg-slate-100 border-slate-200 text-slate-700', avatarText: 'MR' },
  { id: '3', name: 'Jorge Gutierrez', role: 'Encargado de Caja', avatarBg: 'bg-slate-100 border-slate-200 text-slate-700', avatarText: 'JG' },
];

const MOCK_SCHEDULE: ScheduleDay[] = [
  { day: 'Lunes', hours: '08:00 — 20:00' },
  { day: 'Martes', hours: '08:00 — 20:00' },
  { day: 'Miércoles', hours: '08:00 — 20:00' },
  { day: 'Jueves', hours: '08:00 — 20:00', isToday: true },
  { day: 'Viernes', hours: '08:00 — 22:00' },
  { day: 'Sábado', hours: '09:00 — 22:00' },
  { day: 'Domingo', hours: '09:00 — 18:00' },
];

// ESTRUCTURA CONCEPTUAL DE LA NAVEGACIÓN
const NAVIGATION_SCHEMA: NavGroup[] = [
  {
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard }
    ]
  },
  {
    groupLabel: 'OPERACIÓN',
    items: [
      { id: 'pos', label: 'POS', icon: ShoppingCart, roles: ['Owner', 'Admin', 'Manager', 'Staff'] },
      { id: 'ordenes', label: 'Órdenes', icon: ClipboardList, badge: 3, roles: ['Owner', 'Admin', 'Manager', 'Staff'] },
      { id: 'mesas', label: 'Mesas', icon: Table2, roles: ['Owner', 'Admin', 'Manager', 'Staff'] }
    ]
  },
  {
    groupLabel: 'CATÁLOGO',
    items: [
      { id: 'menu', label: 'Menú', icon: BookOpen, roles: ['Owner', 'Admin', 'Manager'] },
      { id: 'clientes', label: 'Clientes', icon: Users, roles: ['Owner', 'Admin', 'Manager'] },
      { id: 'inventario', label: 'Inventario', icon: Package, badge: 5, roles: ['Owner', 'Admin', 'Manager'] }
    ]
  },
  {
    groupLabel: 'ADMINISTRACIÓN',
    items: [
      { id: 'equipo', label: 'Equipo', icon: UserRoundCog, roles: ['Owner', 'Admin'] },
      { id: 'facturacion', label: 'Facturación', icon: Receipt, roles: ['Owner', 'Admin'] },
      { id: 'reportes', label: 'Reportes', icon: ChartNoAxesCombined, roles: ['Owner', 'Admin', 'Manager'] }
    ]
  },
  {
    groupLabel: 'CONFIGURACIÓN',
    items: [
      { id: 'ajustes', label: 'Ajustes', icon: Settings, roles: ['Owner', 'Admin'] }
    ]
  }
];

// ============================================================================
// COMPONENTE PRINCIPAL: SERVA APP SHELL
// ============================================================================

export default function BranchExampleLayout() {
  // Estados de navegación e interfaz
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [currentUserRole] = useState<UserRole>('Owner'); // Puede cambiar para probar permisos

  // Estados del Overview original
  const [copiedCode, setCopiedCode] = useState(false);
  const [isBranchActive, setIsBranchActive] = useState(true);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BR-NCG-001');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Filtrar elementos según permisos de rol
  const filterNavByRole = (groups: NavGroup[]): NavGroup[] => {
    return groups.map(group => ({
      ...group,
      items: group.items.filter(item => !item.roles || item.roles.includes(currentUserRole))
    })).filter(group => group.items.length > 0);
  };

  const filteredNavigation = filterNavByRole(NAVIGATION_SCHEMA);

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 flex flex-col antialiased selection:bg-orange-100 selection:text-orange-900">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SUPERIOR GLOBAL (BREADCRUMBS & ACCIONES GLOBAL)
         ───────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 h-14 flex items-center shrink-0">
        <div className="w-full px-4 sm:px-6 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 min-w-0">
            {/* Botón menú móvil */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Abrir menú"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 truncate">
              <button
                type="button"
                className="hover:text-slate-900 transition-colors flex items-center gap-1 shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Volver a</span> Sucursales
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-400 truncate hidden md:inline">Mi Restaurante S.A.</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden md:inline" />
              <span className="text-slate-900 font-semibold truncate">Sucursal Centro</span>
            </nav>
          </div>

          {/* Acciones del Header */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
              <span>Cambiar sucursal</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          CONTENEDOR PRINCIPAL: SIDEBAR + ÁREA DE CONTENIDO
         ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 relative">

        {/* ─────────────────────────────────────────────────────────────
            2. SIDEBAR DESKTOP
           ───────────────────────────────────────────────────────────── */}
        <aside
          className={`hidden lg:flex flex-col bg-white border-r border-slate-200/90 transition-all duration-300 ease-in-out z-20 select-none ${
            isSidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Logo & Marca Serva */}
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-[#C2410C] text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm shadow-orange-700/20">
                S
              </div>
              {!isSidebarCollapsed && (
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  SERVA
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title={isSidebarCollapsed ? "Expandir menú" : "Colapsar menú"}
            >
              {isSidebarCollapsed ? <ChevronsRight className="w-4 h-4" /> : <ChevronsLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Identidad de la Branch Actual */}
          <div className="p-3 border-b border-slate-100">
            {isSidebarCollapsed ? (
              <div className="flex justify-center" title="Sucursal Centro - Nuevo Casas Grandes">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-[#C2410C] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
            ) : (
              <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 text-[#C2410C] flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                        Sucursal Centro
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        Nuevo Casas Grandes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px]">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Activa
                  </span>
                  <button
                    type="button"
                    className="text-slate-500 hover:text-[#C2410C] font-semibold transition-colors flex items-center gap-0.5"
                  >
                    <span>Cambiar</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menú de Navegación */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-scrollbar">
            {filteredNavigation.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {group.groupLabel && !isSidebarCollapsed && (
                  <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    {group.groupLabel}
                  </h3>
                )}

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      title={isSidebarCollapsed ? item.label : undefined}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                        isActive
                          ? 'bg-orange-50/80 text-[#C2410C] font-bold border border-orange-200/60 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#C2410C]' : 'text-slate-400 group-hover:text-slate-600'
                        }`} />
                        
                        {!isSidebarCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </div>

                      {/* Badges de notificación */}
                      {item.badge !== undefined && item.badge > 0 && (
                        isSidebarCollapsed ? (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C2410C]" />
                        ) : (
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                            isActive ? 'bg-[#C2410C] text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {item.badge}
                          </span>
                        )
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Footer de Usuario (User Menu) */}
          <div className="p-3 border-t border-slate-100 relative">
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 text-xs space-y-0.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors font-medium"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mi Perfil</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors font-medium"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Preferencias</span>
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors ${
                isUserMenuOpen ? 'bg-slate-100' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 text-[#C2410C] font-bold text-xs flex items-center justify-center shrink-0">
                  CM
                </div>
                {!isSidebarCollapsed && (
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                      Carlos Mendoza
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      Admin / Owner
                    </p>
                  </div>
                )}
              </div>
              {!isSidebarCollapsed && (
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>
          </div>
        </aside>

        {/* ─────────────────────────────────────────────────────────────
            3. DRAWER MÓVIL / TABLET (MOBILE SIDEBAR)
           ───────────────────────────────────────────────────────────── */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Overlay traslúcido */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileDrawerOpen(false)}
            />

            <div className="relative w-72 max-w-[80vw] bg-white flex flex-col h-full shadow-2xl z-10">
              {/* Header Drawer */}
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C2410C] text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                    S
                  </div>
                  <span className="font-extrabold text-base tracking-tight text-slate-900">
                    SERVA
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contexto Branch Móvil */}
              <div className="p-3 border-b border-slate-100">
                <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/80 text-[#C2410C] flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">Sucursal Centro</p>
                      <p className="text-[11px] text-slate-500 truncate">Nuevo Casas Grandes</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 text-[10px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Activa
                    </span>
                    <button type="button" className="text-[#C2410C] font-semibold">
                      Cambiar sucursal
                    </button>
                  </div>
                </div>
              </div>

              {/* Menú Móvil */}
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                {filteredNavigation.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1">
                    {group.groupLabel && (
                      <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {group.groupLabel}
                      </h3>
                    )}
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsMobileDrawerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-orange-50/80 text-[#C2410C] font-bold border border-orange-200/60'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-[#C2410C]' : 'text-slate-400'}`} />
                            <span>{item.label}</span>
                          </div>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-[#C2410C] text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* User Menu Móvil */}
              <div className="p-3 border-t border-slate-100">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-200 text-[#C2410C] font-bold text-xs flex items-center justify-center">
                      CM
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Carlos Mendoza</p>
                      <p className="text-[10px] text-slate-400">Admin / Owner</p>
                    </div>
                  </div>
                  <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600">
                    <LogOut className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            4. ÁREA DE CONTENIDO PRINCIPAL (MAIN VIEWPORT)
           ───────────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 overflow-y-auto">
          
          {/* SI LA PESTAÑA ACTIVA ES OVERVIEW, RENDEREAMOS LA VISTA DE REFERENCIA INTAMBIA */}
          {activeTab === 'overview' ? (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

              {/* HERO / HEADER DE LA SUCURSAL */}
              <div className="bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#C2410C]" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#C2410C] flex items-center justify-center shrink-0 shadow-sm">
                      <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                          Sucursal Centro
                        </h1>

                        {isBranchActive ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Activa
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Inactiva
                          </span>
                        )}

                        <span className="px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200/70 text-[#C2410C] text-[11px] font-semibold">
                          Contexto Actual
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Av. Constitución 402, Col. Centro — Nuevo Casas Grandes, Chih.</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#C2410C] hover:bg-[#a3360a] rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Editar Sucursal</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TWO-COLUMN LAYOUT (GRID 8:4 / 12 COLS) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* COLUMNA IZQUIERDA (8 COLS) */}
                <div className="lg:col-span-8 space-y-6">

                  {/* CARD 1: INFORMACIÓN GENERAL */}
                  <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Información General
                      </h2>
                      <span className="text-[11px] font-medium text-slate-400">
                        Registrada el 12 Ene 2024
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Nombre de la Sucursal</span>
                        <p className="text-slate-900 font-bold text-sm">Sucursal Centro</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Código Identificador (ID)</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            BR-NCG-001
                          </span>
                          <button
                            onClick={handleCopyCode}
                            className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                            title="Copiar código"
                          >
                            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Tipo de Establecimiento</span>
                        <p className="text-slate-800 font-semibold">Restaurante / Sucursal Principal</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Régimen / Razón Social</span>
                        <p className="text-slate-800 font-semibold">Mi Restaurante S.A. de C.V.</p>
                      </div>

                      <div className="sm:col-span-2 space-y-1 pt-1">
                        <span className="text-slate-400 font-medium">Descripción / Notas Internas</span>
                        <p className="text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                          Sucursal matriz de atención en comedor, servicio para llevar y terminales POS de caja principal.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: UBICACIÓN Y DIRECCIÓN */}
                  <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#C2410C]" />
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Ubicación y Dirección
                        </h2>
                      </div>

                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#C2410C] hover:underline"
                      >
                        <span>Abrir en Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="sm:col-span-2 space-y-1">
                        <span className="text-slate-400 font-medium">Calle y Número</span>
                        <p className="text-slate-900 font-semibold">Av. Constitución #402 (Esq. Lic. Verdad)</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Colonia / Zona</span>
                        <p className="text-slate-800 font-semibold">Colonia Centro</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Ciudad</span>
                        <p className="text-slate-800 font-semibold">Nuevo Casas Grandes</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Estado / Provincia</span>
                        <p className="text-slate-800 font-semibold">Chihuahua</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-400 font-medium">Código Postal & País</span>
                        <p className="text-slate-800 font-semibold">31700 — México</p>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: CONTACTO DE OPERACIONES */}
                  <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 space-y-5 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Datos de Contacto Directo
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl border border-slate-200/60">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                          <Phone className="w-4 h-4 text-[#C2410C]" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[11px] text-slate-400 font-medium">Teléfono de la Sucursal</span>
                          <p className="text-slate-900 font-bold">+52 636 123 4567</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl border border-slate-200/60">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                          <Mail className="w-4 h-4 text-[#C2410C]" />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[11px] text-slate-400 font-medium">Correo Operativo</span>
                          <p className="text-slate-900 font-bold truncate">centro@mirestaurante.com</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4: DANGER ZONE */}
                  <div className="bg-white rounded-[20px] border border-red-200/80 p-6 space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 pb-2 border-b border-red-100">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <h2 className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        Acciones de Administración Sensibles
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <div className="space-y-0.5">
                        <h3 className="text-xs font-bold text-slate-800">
                          {isBranchActive ? 'Desactivar esta sucursal' : 'Reactivar esta sucursal'}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Al desactivar, las terminales POS vinculadas no podrán registrar nuevas ventas ni pedidos.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsBranchActive(!isBranchActive)}
                        className="px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/80 rounded-xl transition-colors shrink-0 self-start sm:self-auto"
                      >
                        {isBranchActive ? 'Desactivar Sucursal' : 'Activar Sucursal'}
                      </button>
                    </div>
                  </div>

                </div>

                {/* COLUMNA DERECHA (4 COLS) */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
                  
                  {/* WIDGET 1: HORARIOS */}
                  <div className="bg-white rounded-[20px] border border-slate-200/90 p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#C2410C]" />
                        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Horario de Atención
                        </h2>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/80">
                        Abierto ahora
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      {MOCK_SCHEDULE.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                            item.isToday
                              ? 'bg-orange-50/80 font-bold text-slate-900 border border-orange-200/60'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {item.isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />}
                            {item.day}
                          </span>
                          <span className="font-mono text-[11px] text-slate-500">{item.hours}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-colors"
                    >
                      Configurar Horarios
                    </button>
                  </div>

                  {/* WIDGET 2: PERSONAL CON ACCESO */}
                  <div className="bg-white rounded-[20px] border border-slate-200/90 p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C2410C]" />
                        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Personal con Acceso
                        </h2>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400">3 Usuarios</span>
                    </div>

                    <div className="space-y-3">
                      {MOCK_BRANCH_MEMBERS.map((member) => (
                        <div key={member.id} className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${member.avatarBg}`}>
                              {member.avatarText}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 truncate">{member.name}</p>
                              <p className="text-[11px] text-slate-400 truncate">{member.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 text-xs font-bold text-[#C2410C] bg-orange-50/60 hover:bg-orange-50 border border-orange-200/60 rounded-xl transition-colors"
                    >
                      Gestionar Personal y Permisos
                    </button>
                  </div>

                  {/* WIDGET 3: AJUSTES RÁPIDOS */}
                  <div className="bg-white rounded-[20px] border border-slate-200/90 p-5 space-y-3 shadow-sm">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                      Ajustes de la Sucursal
                    </h2>

                    <div className="space-y-1 text-xs">
                      <button
                        type="button"
                        className="w-full flex items-center justify-between p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Printer className="w-4 h-4 text-slate-400 group-hover:text-[#C2410C]" />
                          <span>Impresoras & Comanderas</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />
                      </button>

                      <button
                        type="button"
                        className="w-full flex items-center justify-between p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4 text-slate-400 group-hover:text-[#C2410C]" />
                          <span>Terminales POS & Cajas</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </main>
          ) : (
            /* VISTAS PLACEHOLDER PARA LOS OTROS MÓDULOS DE NAVEGACIÓN */
            <div className="p-8 max-w-4xl mx-auto space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#C2410C] flex items-center justify-center mx-auto border border-orange-200">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 capitalize">
                  Módulo de {activeTab}
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Estás navegando en la sucursal <strong className="text-slate-800">Sucursal Centro</strong>. La ruta activa asignada es <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[#C2410C]">/branch/BR-NCG-001/{activeTab}</code>.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#C2410C] bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a Overview</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}