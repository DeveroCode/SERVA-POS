import EmployeeMetricsCard from "@/Components/Cards/Employee/EmployeeMetricsCard";
import EmployeeTable from "@/Components/EmployeeTable";
import SearchEmployee from "@/forms/SearchEmployee";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useEmployeeBranch } from "@/hooks/useEmployeeBranch";
import usePagination from "@/hooks/usePagination";
import { useUser } from "@/hooks/useUser";
import { useGetEmployees } from "@/mutations/useMutationEmployee";
import Loader from "@/pages/Loader";
import { MEMBER_ROLES } from "@/types/Index.types";
import type { GetEmployees } from "@/types/Index.types";
import { UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ManageTeamView() {
  // Load last branch visited
  const { currentBranchId } = useBusinessContext();

  // Found employees
  const { page, setPage, resetPage } = usePagination();
  const [foundEmployee, setFoundEmployee] = useState<GetEmployees | null>(null);

  // Load Employees
  const { data: employees, isLoading: isLoadingEmployees, isError: isErrorEmployees } =
    useGetEmployees(page);

  // Load User Auth
  const { data: user, isLoading: isLoadingUser } = useUser();

  // Load Branch
  const { data: branch, isLoading } = useEmployeeBranch(currentBranchId);

  // Employees to display
  const displayedEmployees = foundEmployee ?? employees;
  const filteredEmployees = displayedEmployees?.data ?? [];

  if (isLoading || isLoadingUser || isLoadingEmployees) return <Loader />;

  if (isErrorEmployees || !employees || !user || !branch) {
    return (
      <p className="text-sm text-slate-500">No se pudo cargar el equipo.</p>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-orange-700" />
            Administrar Equipo
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Gestiona los integrantes, roles y permisos de acceso para{" "}
            <strong className="text-slate-800">{branch.name}</strong>.
          </p>
        </div>

        {user.role === MEMBER_ROLES.ADMIN && (
          <Link
            type="button"
            to={'/branch/equipo/add'}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-700 hover:bg-orange-800 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Agregar empleado</span>
          </Link>
        )}
      </div>

      <EmployeeMetricsCard stats={employees.stats} />

      {/* Filtered by roles and other filters */}
      <SearchEmployee
        page={page}
        onSearch={setFoundEmployee}
        resetPage={resetPage}
      />

      {/* Table Employees */}
      <EmployeeTable
        onPageChange={setPage}
        role={user?.role}
        pagination={displayedEmployees?.pagination}
        filteredEmployees={filteredEmployees}
      />
    </>
  );
}
