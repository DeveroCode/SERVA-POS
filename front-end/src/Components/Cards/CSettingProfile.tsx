import { Earth, Settings2Icon, Sun } from "lucide-react";

export default function CSettingProfile() {
  return (
    <div className="card-profile">
      <section className="flex items-center gap-2">
        <Settings2Icon size={24} className="text-orange-600" />
        <span className="title-card-profile">ajustes de la applicación</span>
      </section>

      <section className="py-5 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Earth size={18} className="span-card-profile" />
          <span className="span-card-profile">language</span>
        </div>

        <div className="bg-white py-1.5 px-7 rounded-lg border border-gray-300 shadow">
          <p className="capitalize text-sm font-bold text-gray-600">
            español (MX
          </p>
        </div>
      </section>
      <section className="py-5 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Sun size={18} className="span-card-profile" />
          <span className="span-card-profile">tema de la interfaz</span>
        </div>

        <div className="flex items-center rounded-xl bg-gray-200 p-1">
          <button className="bg-white py-1 px-4 rounded-lg border border-gray-300 shadow text-sm font-bold text-gray-700 transition-all duration-200">
            Calido
          </button>

          <button className="py-1 px-4 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-700 transition-all duration-200">
            Oscuro
          </button>
        </div>
      </section>
    </div>
  );
}
