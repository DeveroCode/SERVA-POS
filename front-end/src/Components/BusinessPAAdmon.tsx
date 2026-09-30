import useBusinessContext from "@/hooks/useBusinessContext";
import { useBusinessMembers } from "@/hooks/useBusinessMembers";
import Loader from "@/pages/Loader";
import { MEMBER_ROLES } from "@/types/BusinessMember.type";
import { motion } from "framer-motion";
import { ChevronRight, Users, Edit3, Trash2 } from "lucide-react";
import { formatActivityDate } from "../lib";
import AddNewUserCard from "./Cards/Business/AddNewUserCard";
import { Link } from "react-router-dom";

export default function BusinessPAAdmon() {
  // Members
  const { currentBusinessId } = useBusinessContext();
  const { data, isLoading } = useBusinessMembers(currentBusinessId, 1);
  const MOCK_USERS = data?.data.slice(0, 3) ? data.data : [];

  if (isLoading) return <Loader />;

  return (
    <>
      <motion.section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-700" />
              Personal & Administradores
            </h2>
            <p className="text-xs text-gray-500 font-normal">
              Gestión de roles globales e invitaciones a la plataforma
            </p>
          </div>
          <Link to={`/dashboard/business/${currentBusinessId}/personnel`} className="text-xs font-semibold text-orange-700 hover:text-orange-800 flex items-center gap-1 cursor-pointer">
            Ver todos los usuarios ({MOCK_USERS.length})
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_USERS.map((user) => {
            const userActivityDate = formatActivityDate(user.lastLogin);
            const activityColor =
              userActivityDate === "Inactivo"
                ? "bg-red-500"
                : userActivityDate === "Ayer" ||
                    userActivityDate.includes("Hace")
                  ? "bg-amber-400"
                  : "bg-emerald-500";

            return (
              <motion.div
                key={user._id}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Indicador de Actividad: Barra Gris + Punto Dinámico */}
                    <div className="flex flex-col items-center self-stretch py-0.5 min-h-9">
                      <div className="w-0.75 h-full bg-slate-200/80 rounded-full" />
                      <div
                        className={`w-2.5 h-2.5 rounded-full shrink-0 -mt-1 ring-2 ring-white ${activityColor}`}
                      />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                        {user.name + " " + user.last_name}
                      </h4>
                      <p className="text-[11px] text-gray-400 truncate max-w-32.5">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      user.role === MEMBER_ROLES.ADMIN
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Sucursal:</span>
                    <span className="font-semibold text-gray-800 truncate max-w-30">
                      {user.business.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Último acceso:</span>
                    <span className="text-gray-600">{userActivityDate}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-end gap-1 border-t border-gray-50">
                  <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}

          {/* Special Invite User Card */}
          {MOCK_USERS.length < 3 && <AddNewUserCard />}
        </div>
      </motion.section>
    </>
  );
}
