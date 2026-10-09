import { useState } from "react";
import { Building2, LogOut, X } from "lucide-react";

import {
  MEMBER_ROLES,
  type NavGroup,
} from "@/types/Index.types";

import { NAVIGATION_SCHEMA } from "@/data/EmployeeNavigation";

type AsideBranchMobileProps = {
  setIsMobileDrawerOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function AsideBranchMobile({
  setIsMobileDrawerOpen,
}: AsideBranchMobileProps) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  // TODO: Obtener el rol del usuario autenticado.
  const currentUserRole = MEMBER_ROLES.ADMIN;

  // Filtrar las opciones de navegación según el rol.
  const filteredNavigation: NavGroup[] = NAVIGATION_SCHEMA
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          !item.roles || item.roles.includes(currentUserRole),
      ),
    }))
    .filter((group) => group.items.length > 0);

  const closeDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Overlay translúcido */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer móvil */}
      <aside
        className="relative z-10 flex h-full w-72 max-w-[80vw] flex-col bg-white shadow-2xl"
        aria-label="Navegación de sucursal"
      >
        {/* Header Drawer */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-700 text-base font-black text-white shadow-sm">
              S
            </div>

            <span className="text-base font-extrabold tracking-tight text-slate-900">
              SERVA
            </span>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contexto de la sucursal */}
        <div className="border-b border-slate-100 p-3">
          <div className="space-y-2 rounded-2xl border border-slate-200/70 bg-slate-50 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-orange-200/80 bg-orange-50 text-orange-700">
                <Building2 className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900">
                  Sucursal Centro
                </p>

                <p className="truncate text-[11px] text-slate-500">
                  Nuevo Casas Grandes
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/50 pt-1 text-[10px]">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Activa
              </span>

              <button
                type="button"
                className="font-semibold text-orange-700 transition-colors hover:text-orange-800"
                onClick={() => {
                  // TODO: Navegar al selector de sucursales.
                }}
              >
                Cambiar sucursal
              </button>
            </div>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav
          className="flex-1 space-y-4 overflow-y-auto px-3 py-3"
          aria-label="Opciones de sucursal"
        >
          {filteredNavigation.map((group, groupIdx) => (
            <div key={group.groupLabel ?? groupIdx} className="space-y-1">
              {group.groupLabel && (
                <h3 className="mb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                      closeDrawer();
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                      isActive
                        ? "border-orange-200/60 bg-orange-50/80 font-bold text-orange-700"
                        : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`h-4 w-4 ${
                          isActive
                            ? "text-orange-700"
                            : "text-slate-400"
                        }`}
                      />

                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? "bg-orange-700 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Usuario y acciones */}
        <div className="border-t border-slate-100 p-3">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-orange-100 text-xs font-bold text-orange-700">
                CM
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-800">
                  Carlos Mendoza
                </p>

                <p className="truncate text-[10px] text-slate-400">
                  Admin / Owner
                </p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
              aria-label="Cerrar sesión"
              onClick={() => {
                // TODO: Ejecutar el flujo de cierre de sesión.
              }}
            >
              <LogOut className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}