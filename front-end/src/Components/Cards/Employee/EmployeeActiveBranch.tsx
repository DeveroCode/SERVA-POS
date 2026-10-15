import { AlertTriangle } from "lucide-react";

type EmployeeActiveBranchProps = {
    isBranchActive: boolean;
}


export default function EmployeeActiveBranch({ isBranchActive }: EmployeeActiveBranchProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-slate-800">
              {isBranchActive
                ? "Desactivar esta sucursal"
                : "Reactivar esta sucursal"}
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 pl-6">
            Las terminales POS vinculadas no podrán registrar nuevas ventas
            mientras esté inactiva.
          </p>
        </div>

        <button
          type="button"
          onClick={() => ("")}
          className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/70 rounded-xl transition-colors shrink-0 self-start sm:self-auto"
        >
          {isBranchActive ? "Desactivar Sucursal" : "Activar Sucursal"}
        </button>
      </div>
    </div>
  );
}
