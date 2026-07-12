import { Mail, PhoneIcon, User } from "lucide-react";

export default function CPersonalInfo() {
  return (
    <div className="card-profile">
      <section className="flex items-center gap-2">
        <User size={24} className="text-orange-600" />
        <span className="title-card-profile">
          Información personal
        </span>
      </section>

      <section className="py-5 flex justify-between items-center border-b border-gray-200">
        <div>
          <span className="span-card-profile">Nombre</span>
          <p className="p-card-profile">carlos alberto</p>
        </div>
        <div>
          <span className="span-card-profile">apellidos</span>
          <p className="p-card-profile">martinez</p>
        </div>
      </section>

      <section className="py-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Mail size={18} className="span-card-profile" />
          <span className="span-card-profile">correo electrónico</span>
        </div>

        <p className="p-card-profile mt-2">s6TtF@example.com</p>
      </section>
      <section className="py-2">
        <div className="flex items-center gap-2">
          <PhoneIcon size={18} className="span-card-profile" />
          <span className="span-card-profile">telefono</span>
        </div>

        <p className="p-card-profile mt-2">+52 1 55 55 55 55</p>
      </section>
    </div>
  );
}
