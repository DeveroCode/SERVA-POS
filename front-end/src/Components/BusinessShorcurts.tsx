import { itemVariants } from "@/data/BusinessDataExample";
import { motion } from "framer-motion";
import { ShorcurtsBusiness } from "@/data/Shorcurts";
import { Link } from "react-router-dom";

export default function BusinessShorcurts() {
  return (
    <>
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Accesos Rápidos de Configuración
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ShorcurtsBusiness.map((item, idx) => {
            return (
              <Link to={item.url}
                key={idx}
                className="bg-white cursor-pointer hover:bg-gray-900 text-gray-700 hover:text-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center gap-2 shadow-sm transition-all duration-200 group active:scale-[0.97]"
              >
                <div className="w-5 h-5 text-[#F75C03] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold capitalize">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </motion.section>
    </>
  );
}
