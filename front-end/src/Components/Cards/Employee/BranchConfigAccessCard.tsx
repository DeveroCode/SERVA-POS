import { ChevronRight, Printer, Settings } from "lucide-react";

export default function BranchConfigAccessCard() {
  return (
       <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
              Ajustes de la Sucursal
            </h2>

            <div className="space-y-1 text-xs">
              <button
                type="button"
                className="w-full flex items-center justify-between p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-slate-400 group-hover:text-orange-700" />
                  <span>Impresoras & Comanderas</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-between p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-400 group-hover:text-orange-700" />
                  <span>Terminales POS & Cajas</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500" />
              </button>
            </div>
          </div>
  )
}
