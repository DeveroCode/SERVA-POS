import { Lock } from "lucide-react";
import EnableModalBTN from "../Buttons/EnableModalBTN";
import InfoUpdate from "../Text/InfoUpdate";
export default function ChangePassword() {
  return (
    <div className="second-card space-y-6">
      <section className="flex justify-between items-center">
        <div className="bg-orange-100/30 p-2 rounded-md">
          <Lock size={20} className="text-orange-600" />
        </div>

        <EnableModalBTN />
      </section>

      <InfoUpdate
        title="Cambiar Contraseña"
        description="Actualiza tu contraseña para proteger tu cuenta frente a accesos no autorizados."
      />

      <p className="text-sm text-gray-400">Última modificación hace 7 meses</p>
    </div>
  );
}
