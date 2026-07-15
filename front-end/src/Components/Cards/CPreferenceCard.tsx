import { Shield } from "lucide-react";
import EnableModalBTN from "../Buttons/EnableModalBTN";
import InfoUpdate from "../Texts/InfoUpdate";

export default function CPreferenceCard() {
  return (
    <div className="second-card space-y-6">
      <section className="flex justify-between items-center">
        <div className="bg-orange-100/30 p-2 rounded-md">
          <Shield size={20} className="text-orange-600" />
        </div>

        <EnableModalBTN />
      </section>

      <InfoUpdate
              title="Ajustes de la aplicación"
              description="Personaliza tus preferencias de seguridad, los cierres de sesión de los dispositivos activos y las protecciones de acceso para Serva POS."
            />
    </div>
  )
}
