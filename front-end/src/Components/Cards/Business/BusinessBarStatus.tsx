import { useBusiness } from "@/hooks/useBusiness";
import useBusinessContext from "@/hooks/useBusinessContext";
import type { Business } from "@/types/Index.types";
import { Store, Users, Shield, Globe } from "lucide-react";

export default function BusinessBarStatus() {
     const {currentBusinessId} = useBusinessContext();
     const {data: business} = useBusiness(currentBusinessId as Business["_id"]);
  return (
    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-6 text-xs font-medium text-gray-500 overflow-x-auto">
      <div className="flex items-center gap-2">
        <Store className="w-4 h-4 text-gray-400" />
        <span>
          <strong className="text-gray-900 font-semibold">
            {business.stats.activeBranches}
          </strong>{" "}
         {business.stats.activeBranches === 1 ? "Sucursal Activa" : "Sucursales Activas"}
        </span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300" />
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span>
          <strong className="text-gray-900 font-semibold">{business.stats.employees}</strong> {business.stats.employees === 1 ? "Empleado" : "Empleados"}
        </span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300" />
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-gray-400" />
        <span>
          <strong className="text-gray-900 font-semibold">
            {business.stats.administrators}
          </strong>{" "}
          {business.stats.administrators === 1 ? "Administrador" : "Administradores"}
        </span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300" />
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-400" />
        <a
          href={business.slug}
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-orange-600 transition-colors"
        >
          {"https://" + business.slug + ".com"}
        </a>
      </div>
    </div>
  );
}
