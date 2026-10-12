import EmployeeBranches from "@/Components/Cards/Employee/EmployeeBranches";
import QuickSelection from "@/Components/Cards/Employee/QuickSelection";
import { EmptyState } from "@/Components/NoData/EmptyState";
import EmployeeSearchForm from "@/forms/EmployeeSearchForm";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useEmployeeBranch } from "@/hooks/useEmployeeBranch";
import { useEmployeeBranches } from "@/hooks/useEmployeeBranches";
import usePagination from "@/hooks/usePagination";
import Loader from "@/pages/Loader";
import { useState } from "react";
export default function EBranchIndex() {
  const [openModalCredential, setOpenModalCredential] = useState(false);
  // Pagination
  const { page } = usePagination();
  // Branch
  const { currentBranchId } = useBusinessContext();
  const {
    data: branch,
    isPending: isBranchPending,
    isError,
  } = useEmployeeBranch(currentBranchId);

  //   Branches
  const { data: branches, isPending } = useEmployeeBranches(page);
  const totalBranches = branches?.data.length ?? 0;

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
      {!currentBranchId ? (
        <EmptyState
          title="Aún no has seleccionado una sucursal"
          description="Selecciona una sucursal para tener un atajo al inicio"
        />
      ) : isBranchPending ? (
        <div className="mb-8 h-28 animate-pulse rounded-2xl bg-slate-100" />
      ) : isError || !branch ? (
        <EmptyState
          title="No se pudo cargar la sucursal"
          description="Selecciona una sucursal de la lista para continuar."
        />
      ) : (
        <QuickSelection branch={branch} setOpenModalCredential={setOpenModalCredential} />
      )}
      {/* SearchComponent */}
      <EmployeeSearchForm totalBranches={totalBranches} />
      {/* Branches list */}
      <EmployeeBranches branches={branches} openModalCredential={openModalCredential} setOpenModalCredential={setOpenModalCredential} />
    </>
  );
}
