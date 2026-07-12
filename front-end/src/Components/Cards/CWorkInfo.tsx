import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

export default function CWorkInfo() {
  return (
    <div className="card-profile">
      <section className="flex items-center gap-2">
        <Briefcase size={24} className="text-orange-600" />
        <span className="title-card-profile">información laboral</span>
      </section>

      <section className="py-5 flex justify-between items-center border-b border-gray-200">
        <div>
          <span className="span-card-profile">rol</span>
          <p className="p-card-profile">administrator</p>
        </div>
        <div>
          <span className="span-card-profile">sucursal</span>
          <p className="p-card-profile">zona centro</p>
        </div>
      </section>

      <section className="py-2 border-b border-gray-200 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="span-card-profile">ID de empleado</span>
          </div>

          <p className="p-card-profile mt-2">CM-0001</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="span-card-profile">estado de la cuenta</span>
          </div>

          <div className="flex items-center gap-2 border border-green-600 bg-green-100 rounded-full px-3 py-1 w-24">
            <CheckCircle2 size={17} className="text-green-700" />
            <p className="font-bold text-green-700 capitalize text-xs">activo</p>
          </div>
        </div>
      </section>
      <section className="py-2">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="span-card-profile" />
          <span className="span-card-profile">fecha de alta</span>
        </div>

        <p className="p-card-profile mt-2">mayo 24, 2026</p>
      </section>
    </div>
  );
}
