import { User } from "lucide-react";
import EnableModalBTN from "../Buttons/EnableModalBTN";
import InfoUpdate from "../Text/InfoUpdate";

export default function CPersonalInformation() {
  return (
    <div className="second-card space-y-6">
       <section className="flex justify-between items-center">
        <div className="bg-orange-100/30 p-2 rounded-md">
          <User size={20} className="text-orange-600" />
        </div>
        <EnableModalBTN />
      </section>


      <InfoUpdate
        title="Información personal"
        description="Gestiona tus datos personales y asegúrate de que los datos de tu cuenta sean siempre correctos."
      />

      <p className="text-sm text-gray-400">Última actualización: <span className="font-bold text-gray-800 capitalize">hace 3 meses</span></p>
    </div>
  )
}
