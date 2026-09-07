import { Link } from "react-router-dom";
import { Users, UserPlus} from "lucide-react";

type EmptyPersonnelStateProps = {
  newPersonnelUrl: string;
};

export function EmptyPersonnelState({
  newPersonnelUrl,
}: EmptyPersonnelStateProps) {
  return (
    <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center my-4">
      <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-700 mb-4 shadow-sm">
        <Users className="w-7 h-7" />
      </div>
      <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
        Aún no hay personal registrado
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        Agrega miembros a tu negocio para asignarles un rol y permitirles
        acceder a las funciones correspondientes.
      </p>


      <Link
        to={newPersonnelUrl}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-all duration-200 shadow-md shadow-orange-500/20 active:scale-[0.98]"
      >
        <UserPlus className="w-4 h-4" />

        <span>Agregar personal</span>
      </Link>

    </div>
  );
}