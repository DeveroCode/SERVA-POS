import type { Branch } from "@/types/Branch.types";
import { Building2, MapPin } from "lucide-react";

type EmployeeBranchHeaderProps = {
    Branch: Branch
}

export default function EmployeeBranchHeader({ Branch }: EmployeeBranchHeaderProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-orange-700" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center shrink-0 shadow-sm">
            <Building2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {Branch.name}
              </h1>

              {Branch.isActive ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Activa
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Inactiva
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
               {Branch.address.street}, {Branch.address.city}, {Branch.address.state}, {Branch.address.country}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
