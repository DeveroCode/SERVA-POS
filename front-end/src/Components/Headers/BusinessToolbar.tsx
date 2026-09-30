import type { FoundBranch } from "@/types/BusinessMember.type";
import { Search, Store } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type BusinessToolbarProps = {
  searchValue: string;
  setSearchValue: Dispatch<React.SetStateAction<string>>;
  setFoundBranch: Dispatch<SetStateAction<FoundBranch["foundBranch"] | null>>;
  handleSearch: () => void;
};

export default function BusinessToolbar({
  searchValue,
  setSearchValue,
  setFoundBranch,
  handleSearch,
}: BusinessToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Store className="w-5 h-5 text-orange-700" />
          Gestión de Sucursales
        </h2>
        <p className="text-xs text-gray-500 font-normal">
          Acceso directo y control operativo independiente
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Search Input */}
        <div className="relative flex-1 sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar sucursal o dirección..."
            value={searchValue}
            onChange={(e) => {
              const value = e.target.value;
              setSearchValue(value);

              if(!value) {
                setFoundBranch(null);
              }
            }}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                e.preventDefault()
                handleSearch();
              }
            }}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
