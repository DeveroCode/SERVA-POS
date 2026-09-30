import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function AddNewUserCard() {
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-orange-700 bg-gray-50/40 hover:bg-orange-50/20 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-42.5"
      >
        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-orange-700 flex items-center justify-center shadow-sm mb-2">
          <UserPlus className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-gray-900">
          Invitar Nuevo Usuario
        </span>
        <span className="text-[11px] text-gray-400 mt-0.5">
          Asigna rol de Admin o Empleado
        </span>
      </motion.div>
    </>
  );
}
