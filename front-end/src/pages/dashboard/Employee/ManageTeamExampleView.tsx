import { z } from "zod";

export const EMPLOYEE_ROLES = {
  OWNER: "Owner / Propietario",
  ADMIN: "Administrador de Sucursal",
  MANAGER: "Gerente de Operaciones",
  STAFF: "Cajero / Personal de Atención",
} as const;

export type EmployeeRole = keyof typeof EMPLOYEE_ROLES;

export const employeeStatusSchema = z.enum(["ACTIVE", "INACTIVE", "PENDING_INVITE"]);
export type EmployeeStatus = z.infer<typeof employeeStatusSchema>;

export const employeeSchema = z.object({
  _id: z.string(),
  branchId: z.string(),
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  role: z.enum(["OWNER", "ADMIN", "MANAGER", "STAFF"]),
  status: employeeStatusSchema,
  phone: z.string().optional(),
  createdAt: z.string(),
  lastAccess: z.string().optional(),
});

export type Employee = z.infer<typeof employeeSchema>;

export const createEmployeeSchema = employeeSchema.pick({
  name: true,
  email: true,
  role: true,
  phone: true,
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = Partial<CreateEmployeeInput> & { status?: EmployeeStatus };


import { useState, useMemo } from "react";
import {
    Users,
    UserPlus,
    Search, UserCheck,
    Clock, Edit3,
    Power, Mail, X,
    AlertTriangle
} from "lucide-react";

// MOCK INICIAL (Simulación de integración con backend real /branch/:branchId/employees)
const MOCK_EMPLOYEES: Employee[] = [
  {
    _id: "emp-1",
    branchId: "branch-centro",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@fastorder.com",
    role: "OWNER",
    status: "ACTIVE",
    phone: "+52 636 123 4567",
    createdAt: "2024-01-12T10:00:00Z",
    lastAccess: "Hace 10 minutos",
  },
  {
    _id: "emp-2",
    branchId: "branch-centro",
    name: "Mariana Ríos",
    email: "m.rios@fastorder.com",
    role: "MANAGER",
    status: "ACTIVE",
    phone: "+52 636 987 6543",
    createdAt: "2024-02-01T15:30:00Z",
    lastAccess: "Hace 2 horas",
  },
  {
    _id: "emp-3",
    branchId: "branch-centro",
    name: "Jorge Gutiérrez",
    email: "jorge.g@fastorder.com",
    role: "STAFF",
    status: "ACTIVE",
    createdAt: "2024-03-15T09:15:00Z",
    lastAccess: "Ayer",
  },
  {
    _id: "emp-4",
    branchId: "branch-centro",
    name: "Sofia Castro",
    email: "s.castro@fastorder.com",
    role: "STAFF",
    status: "PENDING_INVITE",
    createdAt: "2026-10-14T11:00:00Z",
  },
];

type ManageTeamViewProps = {
  branchName?: string;
  currentUserId?: string;
  userRole?: EmployeeRole;
};

export default function ManageTeamExampleView({
  branchName = "Sucursal Centro",
  currentUserId = "emp-1",
  userRole = "OWNER",
}: ManageTeamViewProps) {
  // Estados de datos
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Estados de modales y drawers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deactivatingEmployee, setDeactivatingEmployee] = useState<Employee | null>(null);

  // Filtrado optimizado
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "ALL" || emp.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || emp.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, searchQuery, roleFilter, statusFilter]);

  // Indicadores métricos calculados
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === "ACTIVE").length;
    const pending = employees.filter((e) => e.status === "PENDING_INVITE").length;
    return { total, active, pending };
  }, [employees]);

  // Manejadores
  const handleCreateOrUpdate = (data: Partial<Employee>) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) => (e._id === editingEmployee._id ? { ...e, ...data } : e))
      );
    } else {
      const newEmp: Employee = {
        _id: `emp-${Date.now()}`,
        branchId: "branch-centro",
        name: data.name || "",
        email: data.email || "",
        role: data.role || "STAFF",
        status: "PENDING_INVITE",
        phone: data.phone,
        createdAt: new Date().toISOString(),
      };
      setEmployees((prev) => [newEmp, ...prev]);
    }
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleToggleStatus = (employee: Employee) => {
    const newStatus: EmployeeStatus = employee.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setEmployees((prev) =>
      prev.map((e) => (e._id === employee._id ? { ...e, status: newStatus } : e))
    );
    setDeactivatingEmployee(null);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setRoleFilter("ALL");
    setStatusFilter("ALL");
  };

  const isOwnerOrAdmin = userRole === "OWNER" || userRole === "ADMIN";

  return (
    <div className="w-full min-h-screen bg-slate-50/60 font-sans text-slate-900 pb-16 antialiased">
      {/* Breadcrumb Contextual */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="text-slate-400">Sucursal</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">{branchName}</span>
            <span className="text-slate-300">/</span>
            <span className="text-orange-700 font-bold">Administrar equipo</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* Header Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Users className="w-6 h-6 text-orange-700" />
              Administrar Equipo
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Gestiona los integrantes, roles y permisos de acceso para <strong className="text-slate-800">{branchName}</strong>.
            </p>
          </div>

          {isOwnerOrAdmin && (
            <button
              type="button"
              onClick={() => {
                setEditingEmployee(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-700 hover:bg-orange-800 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95 shrink-0"
            >
              <UserPlus className="w-4 h-4" />
              <span>Agregar empleado</span>
            </button>
          )}
        </div>

        {/* Indicadores Resumidos (Metrics Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Integrantes</span>
              <p className="text-lg font-black text-slate-900">{stats.total}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Usuarios Activos</span>
              <p className="text-lg font-black text-slate-900">{stats.active}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Invitaciones Pendientes</span>
              <p className="text-lg font-black text-slate-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        {/* Herramientas de Filtro y Búsqueda */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o correo electrónico..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="sm:col-span-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700"
              >
                <option value="ALL">Todos los roles</option>
                <option value="OWNER">Propietario (Owner)</option>
                <option value="ADMIN">Administrador</option>
                <option value="MANAGER">Gerente</option>
                <option value="STAFF">Personal / Caja</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700"
              >
                <option value="ALL">Todos los estados</option>
                <option value="ACTIVE">Activos</option>
                <option value="INACTIVE">Inactivos</option>
                <option value="PENDING_INVITE">Pendientes</option>
              </select>
            </div>
          </div>

          {(searchQuery || roleFilter !== "ALL" || statusFilter !== "ALL") && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Filtros aplicados</span>
              <button
                onClick={resetFilters}
                className="text-orange-700 hover:underline font-bold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Tabla de Empleados */}
        {filteredEmployees.length > 0 ? (
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
                  {filteredEmployees.map((emp) => {
                    const initials = emp.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase();

                    return (
                      <tr key={emp._id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 text-orange-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate group-hover:text-orange-700 transition-colors">
                                {emp.name}
                              </p>
                              <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                                <Mail className="w-3 h-3 shrink-0" />
                                {emp.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            emp.role === "OWNER"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : emp.role === "ADMIN"
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : emp.role === "MANAGER"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}>
                            {EMPLOYEE_ROLES[emp.role]}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {emp.status === "ACTIVE" ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Activo
                            </span>
                          ) : emp.status === "PENDING_INVITE" ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Invitación enviada
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              Inactivo
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                          {emp.lastAccess || "Sin registro"}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {isOwnerOrAdmin && emp.role !== "OWNER" && (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingEmployee(emp);
                                    setIsModalOpen(true);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                                  title="Editar rol / datos"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setDeactivatingEmployee(emp)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    emp.status === "ACTIVE"
                                      ? "text-slate-400 hover:text-red-600 hover:bg-red-50"
                                      : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                                  }`}
                                  title={emp.status === "ACTIVE" ? "Desactivar acceso" : "Reactivar acceso"}
                                >
                                  <Power className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50/50 border-t border-slate-100 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
              <span>
                Mostrando <strong>{filteredEmployees.length}</strong> de <strong>{employees.length}</strong> colaboradores
              </span>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center mx-auto border border-orange-200">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No se encontraron colaboradores</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Prueba con otro término de búsqueda o limpia los filtros activos.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </main>

      {/* Modal Formulario Agregar / Editar */}
      {isModalOpen && (
        <EmployeeModalForm
          initialData={editingEmployee}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEmployee(null);
          }}
          onSubmit={handleCreateOrUpdate}
        />
      )}

      {/* Modal Confirmación Acción Sensible (Desactivación) */}
      {deactivatingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {deactivatingEmployee.status === "ACTIVE"
                    ? "¿Desactivar acceso de usuario?"
                    : "¿Reactivar acceso de usuario?"}
                </h3>
                <p className="text-xs text-slate-500">{deactivatingEmployee.name}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {deactivatingEmployee.status === "ACTIVE"
                ? "El usuario perderá inmediatamente el acceso a la terminal POS y panel administrativo de esta sucursal."
                : "Se restablecerá el acceso para que el empleado pueda iniciar sesión nuevamente en esta sucursal."}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeactivatingEmployee(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleToggleStatus(deactivatingEmployee)}
                className="px-4 py-2 text-xs font-bold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}