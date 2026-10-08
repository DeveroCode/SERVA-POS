
export default function NotEmployeeBranches() {
  return (
    <div className="rounded-2xl p-8 sm:p-12 text-center mx-auto my-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">
          No tienes sucursales asignadas
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
          Tu cuenta actualmente no tiene acceso a ninguna sucursal activa dentro
          de este negocio.
        </p>

        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200/60 text-xs text-slate-600">
          Pide al administrador del negocio que te asigne una sucursal.
        </div>
      </div>
    </div>
  );
}
