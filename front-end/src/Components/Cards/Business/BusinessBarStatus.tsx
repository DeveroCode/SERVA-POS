import { INITIAL_BUSINESS, MOCK_BRANCHES, MOCK_USERS } from "@/data/BusinessDataExample";
import { Store, Users, Shield, Globe } from "lucide-react";
import { useState } from "react";

export default function BusinessBarStatus() {
     const [businessData] = useState(INITIAL_BUSINESS);
  return (
    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-6 text-xs font-medium text-gray-500 overflow-x-auto">
      <div className="flex items-center gap-2">
        <Store className="w-4 h-4 text-gray-400" />
        <span>
          <strong className="text-gray-900 font-semibold">
            {MOCK_BRANCHES.length}
          </strong>{" "}
          Sucursales Activas
        </span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300" />
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" />
        <span>
          <strong className="text-gray-900 font-semibold">54</strong> Empleados
          Totales
        </span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300" />
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-gray-400" />
        <span>
          <strong className="text-gray-900 font-semibold">
            {MOCK_USERS.filter((u) => u.role === "Admin").length}
          </strong>{" "}
          Administradores
        </span>
      </div>
      <div className="w-1 h-1 rounded-full bg-gray-300" />
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-gray-400" />
        <a
          href={businessData.website}
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-orange-600 transition-colors"
        >
          {businessData.website.replace("https://", "")}
        </a>
      </div>
    </div>
  );
}
