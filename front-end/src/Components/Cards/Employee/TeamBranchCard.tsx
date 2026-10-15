import { EmptyState } from "@/Components/NoData/EmptyState";
import usePagination from "@/hooks/usePagination";
import { useUser } from "@/hooks/useUser";
import { getAvatarColor, getInitials } from "@/lib/index";
import { useGetEmployees } from "@/mutations/useMutationEmployee";
import { User } from "lucide-react";

export default function TeamBranchCard() {
  const { page } = usePagination();
  const { data, isLoading } = useGetEmployees(page);
  const { data: userAuth } = useUser();

  const formatMembers = data?.data ?? [];
  const sortedMembers = [...formatMembers].sort((a, b) => {
  if (a._id === userAuth?._id) return -1;
  if (b._id === userAuth?._id) return 1;
  return 0;
});
  const setFourMembers = sortedMembers.slice(0, 4);

  if (isLoading)
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm animate-pulse">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="mt-5 space-y-4">
          <div className="h-10 rounded-lg bg-slate-100" />
          <div className="h-10 rounded-lg bg-slate-100" />
        </div>
      </div>
    );

  if (!data || formatMembers.length === 0)
    return (
      <EmptyState
        title="Aún no hay personal con acceso"
        description="Por favor, comuníquese con el administrador."
      />
    );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-orange-700" />
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Personal con Acceso
          </h2>
        </div>

        <span className="text-[11px] font-bold text-slate-400">
          {data.pagination?.total ?? formatMembers.length} Usuarios
        </span>
      </div>

      <div className="space-y-2.5 w-full">
        {setFourMembers.map((member) => {
          const isAdmin = member.role === "admin";
          const avatarColor = isAdmin
            ? "bg-orange-700"
            : getAvatarColor(member._id);

          return (
            <div
              key={member._id}
              className="flex items-center gap-2.5 w-full text-xs"
            >
              <div
                className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold text-xs text-white shrink-0 overflow-hidden ${avatarColor}`}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={`${member.name} ${member.last_name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(member.name, member.last_name)
                )}
              </div>

              <div className="flex flex-1 min-w-0 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 truncate">
                    {member.name} {member.last_name}
                  </p>

                  <p className="text-[10px] text-slate-400 truncate capitalize">
                    {member.role}
                  </p>
                </div>

                {userAuth?._id === member._id && (
                  <span className="text-[10px] text-emerald-600 font-semibold whitespace-nowrap shrink-0">
                    Sesión Activa
                  </span>
                )}
              </div>
            </div>
          );
        })}
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