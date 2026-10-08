import { ArrowRight, Clock, MapPin, Store } from "lucide-react";
// condition for animation ${
//   selectedBranchId === lastUsedBranch.id
//     ? "border-orange-700 ring-2 ring-orange-700/10 bg-orange-50/30"
//     : "border-slate-200 hover:border-orange-300"
// }
export default function QuickSelection() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-orange-700" />
          Continuar rápida
        </span>
      </div>

      <div
        onClick={() => ""}
        className={`group relative bg-white rounded-2xl border transition-all duration-200 p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md border-slate-200 hover:border-orange-300`}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-700 shrink-0 group-hover:bg-orange-700 group-hover:text-white transition-colors duration-200">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-slate-900 text-base group-hover:text-orange-700 transition-colors">
                {/* {lastUsedBranch.name} */}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Última sesión
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {/* {lastUsedBranch.address}, {lastUsedBranch.city} */}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end sm:justify-start gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
          <span className="text-xs font-semibold text-orange-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            {/* {selectedBranchId === lastUsedBranch.id && isNavigating
              ? "Entrando..."
              : "Ingresar ahora"} */}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
