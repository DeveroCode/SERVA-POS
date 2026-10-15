import { User } from "lucide-react";

interface BranchMember {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarText: string;
}
const MOCK_BRANCH_MEMBERS: BranchMember[] = [
  {
    id: "1",
    name: "Carlos Mendoza",
    role: "Owner / Propietario",
    avatarBg: "bg-orange-50 border-orange-200 text-orange-700",
    avatarText: "CM",
  },
  {
    id: "2",
    name: "Mariana Ríos",
    role: "Gerente de Sucursal",
    avatarBg: "bg-slate-100 border-slate-200 text-slate-700",
    avatarText: "MR",
  },
  {
    id: "3",
    name: "Jorge Gutierrez",
    role: "Encargado de Caja",
    avatarBg: "bg-slate-100 border-slate-200 text-slate-700",
    avatarText: "JG",
  },
];

export default function TeamBranchCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-orange-700" />
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Personal con Acceso
          </h2>
        </div>
        <span className="text-[11px] font-bold text-slate-400">3 Usuarios</span>
      </div>

      <div className="space-y-2.5">
        {MOCK_BRANCH_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${member.avatarBg}`}
              >
                {member.avatarText}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-800 truncate">
                  {member.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full py-2 text-xs font-bold text-orange-700 bg-orange-50/60 hover:bg-orange-50 border border-orange-200/60 rounded-xl transition-colors"
      >
        Gestionar Personal y Permisos
      </button>
    </div>
  );
}
