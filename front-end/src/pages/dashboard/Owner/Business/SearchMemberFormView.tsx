import ErrorAlert from "@/Components/Alerts/ErrorAlert";
import {
  type AddMemberToBranch,
  MEMBER_ROLES_EXPLAIN,
  type FoundMember,
} from "@/types/Member.types";
import { Users, Search } from "lucide-react";
import { useFormContext } from "react-hook-form";

type SearchMemberFormProps = {
  onOpenSearchModal: () => void;
  member: FoundMember["foundMember"] | null;
};
export default function SearchMemberForm({
  onOpenSearchModal,
  member,
}: SearchMemberFormProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddMemberToBranch>();
  return (
    <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
          <Users className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Información del miembro
          </h2>
          <p className="text-xs text-slate-400">
            Selecciona el usuario y define su función.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Usuario */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Usuario
            <span className="text-orange-700 ml-1">*</span>
          </label>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              onFocus={onOpenSearchModal}
              value={member ? `${member.name} ${member.last_name}` : ""}
              placeholder="Buscar usuario..."
              readOnly
              {...register("memberId", { required: true })}
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium placeholder:text-slate-400 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
            />

            {errors.memberId && (
              <ErrorAlert>{errors.memberId.message}</ErrorAlert>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            Selecciona el usuario que formará parte del negocio.
          </p>
        </div>

        {/* Rol */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Rol
            <span className="text-orange-700 ml-1">*</span>
          </label>

          <select
            defaultValue=""
            {...register("role", { required: true })}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200/90 rounded-xl font-medium text-slate-700 focus:bg-white focus:border-orange-700 focus:ring-4 focus:ring-orange-700/10 focus:outline-none transition-all"
          >
            <option value="" disabled>
              Seleccionar rol
            </option>

            {Object.entries(MEMBER_ROLES_EXPLAIN).map(([role, description]) => (
              <option
                key={role}
                value={
                  role.charAt(0).toLocaleLowerCase() +
                  role.slice(1).toLowerCase()
                }
              >
                {description}
              </option>
            ))}
          </select>

          {errors.role && <ErrorAlert>{errors.role.message}</ErrorAlert>}

          <p className="text-[11px] text-slate-400">
            Define el nivel de acceso del miembro.
          </p>
        </div>
      </div>
    </div>
  );
}
