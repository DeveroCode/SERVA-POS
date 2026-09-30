import { Filter, Search, Store, ArrowUpDown, Plus } from "lucide-react";

export default function BusinessToolbar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Store className="w-5 h-5 text-orange-700" />
          Gestión de Sucursales
        </h2>
        <p className="text-xs text-gray-500 font-normal">
          Acceso directo y control operativo independiente por ubicación
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Search Input */}
        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar sucursal o dirección..."
            value={""}
            onChange={() => {}}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <button className="p-2 text-gray-600 cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-xs font-medium flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filtrar</span>
        </button>
        <button className="p-2 text-gray-600 cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-xs font-medium flex items-center gap-1.5">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ordenar</span>
        </button>

        <button className="px-3.5 py-2 text-xs cursor-pointer font-semibold text-white bg-orange-700 hover:bg-[#e05302] rounded-xl transition-all duration-200 shadow-sm flex items-center gap-1.5 active:scale-[0.98]">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Agregar Sucursal</span>
        </button>
      </div>
    </div>
  );
}
