import useBusinessContext from "@/hooks/useBusinessContext";
import { useDeleteMember } from "@/mutations/useMutationBusinessMember";
import type { Member } from "@/types/Member.types";
import { ROLE_LABELS } from "@/utils/index";
import { SET_MEMBER_ID_KEY } from "@/utils/key";
import { Shield, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

type MemberTableRowProps = {
  member: Member;
  setOpenMenuActions: Dispatch<SetStateAction<string | null>>;
  openMenuActions: string | null;
};

export default function PersonnelTableRow({
  member,
  setOpenMenuActions,
  openMenuActions,
}: MemberTableRowProps) {
  const isOpenMenu = openMenuActions === member._id;
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const { currentBusinessId: businessId } = useBusinessContext();
  const { mutate } = useDeleteMember();

  const handleToggleMenu = () => {
    setOpenMenuActions((currentMenuId) =>
      currentMenuId === member._id ? null : member._id,
    );
  };

  const handleSendEdit = (id: Member["_id"]) => {
    navigate(
      `/dashboard/business/${businessId}/personnel/update/${member._id}`,
    );
    localStorage.setItem(SET_MEMBER_ID_KEY, id);
  };

  const role = ROLE_LABELS[member.role] ?? {
    label: member.role,
    className: "bg-slate-50 text-slate-600 border-slate-200",
  };

  const handleDeleteMember = (memberId: Member["_id"]) => {
    mutate(memberId);
  }

  useEffect(() => {
    if (!isOpenMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuActions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu, setOpenMenuActions]);

  return (
    <tr className="border-b border-slate-100 last:border-b-0 transition-colors hover:bg-slate-50/60">
      {/* User */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3.5 min-w-55">
          <div className="w-10 h-10 rounded-full bg-orange-100/70 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0 border border-orange-200/60 overflow-hidden">
            {member.image ? (
              <img
                src={member.image}
                alt={`${member.name} ${member.last_name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              member.name.charAt(0).toUpperCase()
            )}
          </div>

          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
              {member.name} {member.last_name}
            </h4>

            <p className="text-xs text-slate-400 truncate max-w-55">
              {member.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${role.className}`}
        >
          <Shield className="w-3 h-3" />

          {role.label}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
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
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div ref={menuRef} className="relative inline-block">
          <button
            type="button"
            onClick={handleToggleMenu}
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            aria-label="Abrir acciones"
            aria-expanded={isOpenMenu}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          <div
            className={`
              absolute right-0 top-full mt-1 z-50
              w-44 overflow-hidden rounded-xl
              border border-slate-200 bg-white py-1
              shadow-lg shadow-slate-900/10
              origin-top-right
              cursor-pointer
              transition-all duration-200 ease-out
              ${
                isOpenMenu
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible -translate-y-2 scale-95 opacity-0 pointer-events-none"
              }
            `}
          >
            <button
              onClick={() => handleSendEdit(member._id)}
              type="button"
              className="w-full px-4 cursor-pointer py-2.5 flex items-center gap-2.5 text-left text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-orange-700 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Editar
            </button>

            <div className="my-1 h-px bg-slate-100" />

            <button
              type="button"
              onClick={() => handleDeleteMember(member._id)}
              className="w-full cursor-all-pointer px-4 py-2.5 flex items-center gap-2.5 text-left text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Eliminar
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
