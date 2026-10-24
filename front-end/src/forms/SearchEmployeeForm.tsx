import type { searchEmplooyeForm } from "@/types/Employee.type";
import { Search } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function SearchEmployeeForm() {
  const {
    register
  } = useFormContext<searchEmplooyeForm>();
  return (
    <div className="sm:col-span-6 relative">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Buscar por nombre o correo electrónico..."
        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all"
        {...register("search")}
      />
    </div>
  );
}
