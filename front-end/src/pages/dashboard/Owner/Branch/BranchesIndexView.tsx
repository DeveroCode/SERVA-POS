import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Plus, Search, Building2 } from "lucide-react";
import { useBranches } from "@/hooks/useBranches";
import { LAST_BUSINESS_KEY } from "@/utils/key";
import BranchCard from "@/Components/Cards/Branch/BranchCard";

export default function BranchesIndexView() {
  const businessId = localStorage.getItem(LAST_BUSINESS_KEY) || undefined;
  const navigate = useNavigate();
  const { data: branches = [], isLoading } = useBranches(businessId);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-orange-700/30 border-t-orange-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans text-slate-900 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Store className="w-7 h-7 text-orange-700" />
            Sucursales
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Administra las sucursales de tu negocio y consulta su información.
          </p>
        </div>

        <button
          onClick={() =>
            navigate(`/dashboard/business/${businessId}/branches/new`)
          }
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl shadow-md shadow-orange-500/15 transition-all duration-200 active:scale-[0.98] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva sucursal</span>
        </button>
      </div>

      {/* Empty State */}
      {branches.length === 0 ? (
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
      ) : (
        <>
          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Buscar por nombre, slug o ciudad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs bg-white border border-slate-200/90 rounded-xl font-medium placeholder:text-slate-400 focus:outline-none focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 transition-all duration-200"
              />
            </div>

            <span className="text-xs font-medium text-slate-500">
              {branches.length}{" "}
              {branches.length === 1 ? "sucursal" : "sucursales"}
            </span>
          </div>

          {/* Branches Grid */}
          {branches.length === 0 ? (
            <div className="bg-white rounded-[20px] border border-slate-200 p-10 text-center">
              <Search className="w-8 h-8 mx-auto text-slate-300 mb-3" />

              <h3 className="text-sm font-semibold text-slate-800">
                No encontramos sucursales
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Intenta con otro nombre, slug o ciudad.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <BranchCard
                  key={branch._id}
                  branch={branch}
                  businessId={businessId}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
