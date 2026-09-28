import useBusinessContext from "@/hooks/useBusinessContext";
import { Building2, Plus } from "lucide-react";

export default function BranchEmptyCard() {
    const {navigate, currentBusinessId: businessId} = useBusinessContext();
  return (
    <div className="bg-white rounded-[20px] border-2 border-dashed border-slate-200/90 p-12 text-center flex flex-col items-center justify-center min-h-100">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700 shadow-sm mb-4">
        <Building2 className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">
        Aún no tienes sucursales
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-md mb-6 leading-relaxed">
        Agrega tu primera sucursal para comenzar a administrar este negocio.
      </p>

      <button
        onClick={() =>
          navigate(`/dashboard/business/${businessId}/branches/new`)
        }
        className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200 active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" />
        <span>Crear primera sucursal</span>
      </button>
    </div>
  );
}
