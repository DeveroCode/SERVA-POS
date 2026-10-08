import { Building2, LogOut } from "lucide-react";

export default function HBranch() {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo Serva */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-700 text-white font-bold text-lg tracking-tight shadow-sm shadow-orange-700/20">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 tracking-tight text-base leading-none">
              SERVA
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
              POS & Management
            </span>
          </div>
        </div>

        {/* Business & Account Info */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right pr-4 border-r border-slate-200">
            <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 justify-end">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Serva
            </span>
            <span className="text-[11px] text-slate-500">
              {/* {MOCK_BUSINESS.userName} • {MOCK_BUSINESS.userRole} */}
              Serva • Administrador
            </span>
          </div>

          <button
            onClick={() => console.log("Cerrando sesión...")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-700/20"
            title="Cerrar sesión activa"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
