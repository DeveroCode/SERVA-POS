import { ImagePlus } from "lucide-react";
import { useState } from "react";
import EnableModalBTN from "../Buttons/EnableModalBTN";
import InfoUpdate from "../Texts/InfoUpdate";
import ModalLayout from "../Modals/ModalLayout";
import UpdateImageProfileView from "@/pages/Auth/UpdateImageProfileView";

export default function CChangeImageProfile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="second-card space-y-6">
        <section className="flex justify-between items-center">
          <div className="bg-orange-100/30 p-2 rounded-md">
            <ImagePlus size={20} className="text-orange-600" />
          </div>

          <EnableModalBTN onClick={() => setOpen(true)} />
        </section>

        <InfoUpdate
          title="Cambiar foto de perfil"
          description="Sube una nueva foto de perfil para personalizar tu cuenta y ayudar a los demás a reconocerte."
        />
      </div>

      <ModalLayout open={open} setOpen={setOpen}>
        <UpdateImageProfileView />
      </ModalLayout>
    </>
  );
}
