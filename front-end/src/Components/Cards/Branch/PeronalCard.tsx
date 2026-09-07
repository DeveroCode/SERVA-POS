import type { Member } from "@/types/Member.types";
import { ROLE_LABELS } from "@/utils/index";
import { Shield } from "lucide-react";

type MemberCardProps = {
  member: Member;
};

export default function PeronalCard({ member }: MemberCardProps) {
  const role = ROLE_LABELS[member.role] ?? {
    label: member.role,
    className: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <div
      key={member._id}
      className="p-4 sm:px-6 sm:py-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
    >
      {/* User */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-full bg-orange-100/70 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0 border border-orange-200/60 overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name + " " + member.last_name}
              className="w-full h-full object-cover"
            />
          ) : (
            member.name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
            {member.name + " " + member.last_name}
          </h4>
          <p className="text-xs text-slate-400 truncate">{member.email}</p>
        </div>
      </div>
      {/* Role */}
      <div className="hidden sm:block shrink-0">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${role.className}`}
        >
          <Shield className="w-3 h-3" />
          {role.label}
        </span>
      </div>
      {/* Status */}
      <div className="hidden lg:flex items-center gap-2 shrink-0">
        <span
          className={`w-2 h-2 rounded-full ${
            member.isActive ? "bg-emerald-500" : "bg-slate-300"
          }`}
        />
        <span
          className={`text-xs font-semibold ${
            member.isActive ? "text-emerald-600" : "text-slate-400"
          }`}
        >
          {member.isActive ? "Activo" : "Inactivo"}
        </span>
      </div>
    </div>
  );
}
