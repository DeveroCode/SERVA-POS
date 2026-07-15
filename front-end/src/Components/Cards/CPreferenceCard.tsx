import { Ban, Shield } from "lucide-react";
import InfoUpdate from "../Texts/InfoUpdate";
import { toast } from "react-toastify";

export default function CPreferenceCard() {
  const handleClick = () => {
    toast.error("Funcionalidad en desarrollo");
  };
  return (
    <div className="second-card space-y-6">
      <section className="flex justify-between items-center">
        <div className="bg-orange-100/30 p-2 rounded-md">
          <Shield size={20} className="text-orange-600" />
        </div>

        <button onClick={handleClick} type="button">
          <Ban size={20} className="text-gray-500 cursor-pointer" />
        </button>
      </section>

      <InfoUpdate
        title="Ajustes de la aplicación"
        description="Personaliza tus preferencias de seguridad, los cierres de sesión de los dispositivos activos y las protecciones de acceso para Serva POS."
      />
    </div>
  );
}
