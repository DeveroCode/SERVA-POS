import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function AddBusiness() {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#F75C03] bg-gray-50/50 hover:bg-orange-50/20 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-85 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 group-hover:border-orange-300 group-hover:bg-[#F75C03] text-gray-400 group-hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 mb-4">
        <Plus className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#F75C03] transition-colors">
        Crear Nueva Sucursal
      </h3>
      <p className="text-xs text-gray-500 max-w-xs mt-1.5 leading-relaxed font-normal">
        Despliega un nuevo punto de venta, asigna administradores y sincroniza
        menús en segundos.
      </p>
      <span className="mt-4 px-4 py-2 bg-white group-hover:bg-[#F75C03] text-gray-700 group-hover:text-white text-xs font-semibold rounded-xl border border-gray-200 group-hover:border-transparent shadow-sm transition-all duration-300">
        Comenzar Configuración
      </span>
    </motion.div>
  );
}
