import { User } from "lucide-react";
import { useState } from "react";
import EnableModalBTN from "../Buttons/EnableModalBTN";
import InfoUpdate from "../Texts/InfoUpdate";
import ModalLayout from "../Modals/ModalLayout";
import UpdateInformationPersonalView from "@/pages/Auth/UpdateInformationPersonalView";

export default function CPersonalInformation() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="second-card space-y-6">
       <section className="flex justify-between items-center">
        <div className="bg-orange-100/30 p-2 rounded-md">
          <User size={20} className="text-orange-600" />
        </div>
        <EnableModalBTN onClick={() => setOpen(true)} />
      </section>


      <InfoUpdate
        title="Información personal"
        description="Gestiona tus datos personales y asegúrate de que los datos de tu cuenta sean siempre correctos."
      />

      <p className="text-sm text-gray-400">Última actualización: <span className="font-bold text-gray-800 capitalize">hace 3 meses</span></p>
    </div>

    <ModalLayout open={open} setOpen={setOpen}>
      <UpdateInformationPersonalView />
    </ModalLayout>
    </>
  )
}
