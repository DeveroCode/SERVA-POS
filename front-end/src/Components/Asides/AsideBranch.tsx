import { useState } from "react";
import {
    ChevronsRight,
    ChevronsLeft,
    Building2,
    ChevronRight
} from "lucide-react";

import {
    MEMBER_ROLES,
    type NavGroup,
} from "@/types/Index.types";

import { NAVIGATION_SCHEMA } from "@/data/EmployeeNavigation";

export default function AsideBranch() {
  // Actions for the sidebar
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const currentUserRole = MEMBER_ROLES.ADMIN;
  // Filtered by roles
  const filterNavByRole = (groups: NavGroup[]): NavGroup[] => {
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => !item.roles || item.roles.includes(currentUserRole),
        ),
      }))
      .filter((group) => group.items.length > 0);
  };

  const filteredNavigation = filterNavByRole(NAVIGATION_SCHEMA);

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-slate-200/90 transition-all duration-300 ease-in-out z-20 select-none ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo & Marca Serva */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-orange-700 text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm shadow-orange-700/20">
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
          {isSidebarCollapsed ? (
            <ChevronsRight className="w-4 h-4" />
          ) : (
            <ChevronsLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Identidad de la Branch Actual */}
      <div className="p-3 border-b border-slate-100">
        {isSidebarCollapsed ? (
          <div
            className="flex justify-center"
            title="Sucursal Centro - Nuevo Casas Grandes"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
        ) : (
          <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center shrink-0">
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
                className="text-slate-500 hover:text-orange-700 font-semibold transition-colors flex items-center gap-0.5"
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
                      ? "bg-orange-50/80 text-orange-700 font-bold border border-orange-200/60 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-orange-700"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />

                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>

                  {/* Badges de notificación */}
                  {item.badge !== undefined &&
                    item.badge > 0 &&
                    (isSidebarCollapsed ? (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-700" />
                    ) : (
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                          isActive
                            ? "bg-orange-700 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    ))}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
