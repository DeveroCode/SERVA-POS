import { Bell } from "lucide-react";

export default function AHeader() {
  return (
    <header
      className="
border-b
border-gray-200
px-6
lg:px-10
h-16
flex
items-center
justify-between
bg-white
"
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl font-bold tracking-tight text-orange-600 uppercase">
          serva
        </span>
        <span className="text-[#E5E7EB]">/</span>
        <span className="text-sm font-medium text-[#4B5563]">
          Configuración
        </span>
        <span className="text-[#E5E7EB]">/</span>
        <span className="text-sm font-semibold text-[#111827]">Mi perfil</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-xs font-mono bg-[#F3F4F6] px-2.5 py-1 rounded-md text-[#4B5563] cursor-pointer">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
