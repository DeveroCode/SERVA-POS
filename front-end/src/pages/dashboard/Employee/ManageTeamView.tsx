import EmployeeMetricsCard from "@/Components/Cards/Employee/EmployeeMetricsCard";
import EmployeeTable from "@/Components/EmployeeTable";
import SearchEmployee from "@/forms/SearchEmployee";
import useBusinessContext from "@/hooks/useBusinessContext";
import { useEmployeeBranch } from "@/hooks/useEmployeeBranch";
import usePagination from "@/hooks/usePagination";
import { useUser } from "@/hooks/useUser";
import { useGetEmployees } from "@/mutations/useMutationEmployee";
import Loader from "@/pages/Loader";
import { MEMBER_ROLES } from "@/types/BusinessMember.type";
import { UserPlus, Users } from "lucide-react";

export default function ManageTeamView() {
  const { page, setPage, resetPage } = usePagination();
  //  Load User Auth
  const { data: user, isLoading: isLoadingUser } = useUser();
  //   Load last branch visited
  const { currentBranchId } = useBusinessContext();
  //   Load Branch
  const { data: branch, isLoading } = useEmployeeBranch(currentBranchId);
  // Load Employees
  const { data: employess, isLoading: isLoadingEmployees } =
    useGetEmployees(page);

    const filteredEmployees = employess?.data ?? [];

  if (isLoading || isLoadingUser || isLoadingEmployees) return <Loader />;

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
          <button
            type="button"
            onClick={() => ""}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-700 hover:bg-orange-800 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Agregar empleado</span>
          </button>
        )}
      </div>

      <EmployeeMetricsCard stats={employess.stats} />

      {/* Filtered by roles and another filters */}
      <SearchEmployee />

      {/* Table Employees */}
      <EmployeeTable onPageChange={setPage} pagination={employess.pagination} role={user.role} filteredEmployees={filteredEmployees} />
    </>
  );
}
