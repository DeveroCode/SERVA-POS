import { ArrowLeft, ArrowLeftRight, ChevronRight, MenuIcon } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

type POSHeaderProps = {
    setIsMobileDrawerOpen: Dispatch<SetStateAction<boolean>>
};

export default function POSHeader({ setIsMobileDrawerOpen }: POSHeaderProps) {
  return (
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
            <span className="text-slate-400 truncate hidden md:inline">
              Mi Restaurante S.A.
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden md:inline" />
            <span className="text-slate-900 font-semibold truncate">
              Sucursal Centro
            </span>
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
  );
}
