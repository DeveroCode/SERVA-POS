import { useBusiness } from "@/hooks/useBusiness";
import useBusinessContext from "@/hooks/useBusinessContext";
import { pluralize } from "@/lib/index";
import type { Business } from "@/types/Index.types";
import { Store, Users, Shield, Globe } from "lucide-react";

export default function BusinessBarStatus() {
  const { currentBusinessId } = useBusinessContext();
  const { data: business } = useBusiness(currentBusinessId as Business["_id"]);

  if (!business) return null;

  const { stats, slug } = business;
  const metrics = [
    {
      id: "branches",
      icon: Store,
      count: stats.activeBranches,
      label: pluralize(stats.activeBranches, "Sucursal Activa", "Sucursales Activas"),
    },
    {
      id: "employees",
      icon: Users,
      count: stats.employees,
      label: pluralize(stats.employees, "Empleado", "Empleados"),
    },
    {
      id: "administrators",
      icon: Shield,
      count: stats.administrators,
      label: pluralize(stats.administrators, "Administrador", "Administradores"),
    },
  ];

  return (
    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-6 text-xs font-medium text-gray-500 overflow-x-auto">
      {metrics.map(({ id, icon: Icon, count, label }) => (
        <div key={id} className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gray-400" />
            <span>
              <strong className="text-gray-900 font-semibold">{count}</strong>{" "}
              {label}
            </span>
          </div>

          {/* Renderiza el separador excepto en el último elemento si no fuera por la URL */}
          <div className="w-1 h-1 rounded-full bg-gray-300" />
        </div>
      ))}

      {/* Enlace al sitio web */}
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-400" />
        <a
          href={`https://${slug}.com`}
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-orange-600 transition-colors"
        >
          {`https://${slug}.com`}
        </a>
      </div>
    </div>
  );
}