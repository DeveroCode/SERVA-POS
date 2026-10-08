import EmployeeBranches from "@/Components/Cards/Employee/EmployeeBranches";
import QuickSelection from "@/Components/Cards/Employee/QuickSelection";
import EmployeeSearchForm from "@/forms/EmployeeSearchForm";
import { useEmployeeBranches } from "@/hooks/useEmployeeBranches";
import usePagination from "@/hooks/usePagination";
import Loader from "@/pages/Loader";
import type { Branch } from "@/types/Branch.types";
import { useState } from "react";

export default function EBranchIndex() {
  const [selectedBranchId, setSelectedBranchId] = useState<
    Branch["_id"] | null
  >(null);
  // Pagination
  const { page } = usePagination();

  //   Branches
  const { data: branches, isPending } = useEmployeeBranches(page);
  const totalBranches = branches?.data.length ?? 0;

  //   Selected branch
  const handleSelectBranch = (branch: Branch) => {
    if (branch.isActive === false) return;
    setSelectedBranchId(branch._id);
  };

  // setTimeout(() => {
  //   console.log(
  //     `[SERVA] Estableciendo contexto activo en Branch: ${branches.data[0].name} (${selectedBranchId})`,
  //   );
  // }, 400);

  if (isPending) return <Loader />;

  return (
    <>
      {/* Main */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          ¿Dónde quieres trabajar hoy?
        </h1>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Selecciona una sucursal para acceder a su punto de venta, inventarios
          y panel administrativo.
        </p>
      </div>
      {/* Last used branch */}
      <QuickSelection />
      {/* SearchComponent */}
      <EmployeeSearchForm totalBranches={totalBranches} />
      {/* Branches list */}
      <EmployeeBranches
        branches={branches}
        handleSelectBranch={handleSelectBranch}
        selectedBranchId={selectedBranchId}
      />
    </>
  );
}
