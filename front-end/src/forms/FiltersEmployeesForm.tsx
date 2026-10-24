export default function FiltersEmployeesForm() {
  return (
    <>
      <div className="sm:col-span-3">
        <select
          value={""}
          onChange={(e) => ""}
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
          value={""}
          onChange={(e) => ""}
          className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700"
        >
          <option value="ALL">Todos los estados</option>
          <option value="ACTIVE">Activos</option>
          <option value="INACTIVE">Inactivos</option>
          <option value="PENDING_INVITE">Pendientes</option>
        </select>
      </div>
    </>
  );
}
