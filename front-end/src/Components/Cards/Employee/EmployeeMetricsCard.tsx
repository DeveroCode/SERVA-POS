import type { Employees } from "@/types/Index.types";
import { Clock, User, UserCheck } from "lucide-react";

type EmployeeMetricsCardProps = {
    stats: Employees["stats"];
};

export default function EmployeeMetricsCard({ stats }: EmployeeMetricsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center shrink-0">
          <User className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Integrantes
          </span>
          <p className="text-lg font-black text-slate-900">{stats?.totalEmployees}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center shrink-0">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Usuarios Activos
          </span>
          <p className="text-lg font-black text-slate-900">{stats?.activeEmployees}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Administradores
          </span>
          <p className="text-lg font-black text-slate-900">{stats?.totalAdministrators}</p>
        </div>
      </div>
    </div>
  );
}
