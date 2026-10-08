import { Search } from "lucide-react";

type EmployeeSearchFormProps = {
  totalBranches: number;
};

export default function EmployeeSearchForm({ totalBranches }: EmployeeSearchFormProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={""}
          onChange={(e) => (e.target.value)}
          placeholder="Buscar sucursal por nombre, zona o código..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-700/10 transition-all shadow-sm"
        />
        {/* {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded"
          >
            Limpiar
          </button>
        )} */}

        <button
          onClick={() => ""}
          className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded"
        >
          Limpiar
        </button>
      </div>

      <div className="text-xs text-slate-500 px-1 flex items-center justify-between sm:justify-end gap-2 shrink-0">
        <span>
          {totalBranches}{" "}
          {totalBranches === 1
            ? "sucursal disponible"
            : "sucursales disponibles"}
        </span>
      </div>
    </div>
  );
}
