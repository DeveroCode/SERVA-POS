import useBusinessContext from "@/hooks/useBusinessContext";
import { useUser } from "@/hooks/useUser";
import { SET_EMPLOYEE_ID_KEY } from "@/utils/key";
import { MEMBER_ROLES, type MemberRole } from "@/types/BusinessMember.type";
import type { Employee, employeeActive } from "@/types/Employee.type";
import type { paginationType } from "@/types/Pagination.type";
import type { User } from "@/types/User.types";
import { formatActivityDate, getUserInitials } from "../lib";
import { Edit3, Mail, Power, Users } from "lucide-react";
import Pagination from "./Pagination";
import { useEmployeeActive } from "@/mutations/useMutationEmployee";
import Loader from "@/pages/Loader";

type EmployeeTableProps = {
  filteredEmployees: Employee[];
  role: MemberRole;
  pagination?: paginationType;
  onPageChange: (page: number) => void;
};

export default function EmployeeTable({
  filteredEmployees,
  role,
  pagination,
  onPageChange,
}: EmployeeTableProps) {
  const { data: user } = useUser();
  const { navigate, currentBranchId } = useBusinessContext();
  const { mutate, isPending, isError } = useEmployeeActive();
  const handleSendEditCredentialsa = (id: Employee["_id"]) => {
    localStorage.setItem(SET_EMPLOYEE_ID_KEY, id);
    navigate(`/branch/credentials`);
  };

  const handleSetActiveEmployee = ({
    employeeId,
    isActive,
  }: Pick<employeeActive, "employeeId" | "isActive">) => {
    mutate({ branchId: currentBranchId, employeeId, isActive });
  };

  if (isError) return <p>No se pudo cargar el equipo.</p>;
  if (isPending) return <Loader />;

  const isAuthenticated = (_id: string, authId?: User["_id"]) =>
    Boolean(authId) && _id === authId;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Empleado</th>
              <th className="py-3 px-4">Rol en Sucursal</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Último Acceso</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => {
                return (
                  <tr
                    key={emp._id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 text-orange-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {getUserInitials(emp.name, emp.last_name) || "?"}
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate group-hover:text-orange-700 transition-colors">
                            {emp.name} {emp.last_name}{" "}
                            {isAuthenticated(emp._id, user?._id) && (
                              <span className="text-orange-700"> (Yo)</span>
                            )}
                          </p>

                          <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                            <Mail className="w-3 h-3 shrink-0" />
                            {emp.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center capitalize px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          emp.role === MEMBER_ROLES.ADMIN
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : emp.role === MEMBER_ROLES.STAFF
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : emp.role === MEMBER_ROLES.MANAGER
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {emp.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {emp.isActive === true ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Activo
                        </span>
                      ) : emp.isActive === false ? (
                        <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Usuario Inactivo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Inactivo
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {formatActivityDate(emp.lastLogin) || "Sin registro"}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {role === MEMBER_ROLES.ADMIN && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleSendEditCredentialsa(emp._id)
                              }
                              disabled={isAuthenticated(emp._id, user?._id)}
                              className="p-1.5 cursor-pointer text-slate-400 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              title={
                                isAuthenticated(emp._id, user?._id)
                                  ? "No puedes editar tus propias credenciales"
                                  : "Editar rol / datos"
                              }
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleSetActiveEmployee({
                                  employeeId: emp._id,
                                  isActive: !emp.isActive,
                                })
                              }
                              disabled={isAuthenticated(emp._id, user?._id)}
                              className={`p-1.5 cursor-pointer rounded-lg transition-colors ${
                                emp.isActive === true
                                  ? "text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                  : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                              }`}
                              title={
                                emp.isActive === true
                                  ? "Desactivar acceso"
                                  : "Reactivar acceso"
                              }
                            >
                              <Power className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-12 px-4">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      No hay empleados para mostrar
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Intenta cambiar los filtros o agrega un colaborador.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
}
